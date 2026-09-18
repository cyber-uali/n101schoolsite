/* ============================================================
   AI Book Assistant — orchestrator
   Pipeline: user message
             -> quick greeting/thanks shortcut
             -> local catalog search (books sent by the client)
             -> parallel external search (Google Books + Open Library)
             -> dedupe (ISBN, then normalized title+author)
             -> compose a short reply with the LLM (optional; falls
                back to a templated reply if the LLM is unavailable)
   Response shape:
     { message: string, localResults: Book[], webResults: Book[], sources: string[] }
   Book shape:
     { title, authors: string[], description, cover, isbn, publishedYear, source, url }
   Nothing here invents a book, author, or link — every field in
   webResults comes straight from the Google Books / Open Library
   response, or is left null/empty.
   ============================================================ */

const EXTERNAL_TIMEOUT_MS = 6000;
const MAX_MESSAGE_LENGTH = 400;
const MAX_HISTORY_TURNS = 6;

const GREETINGS = ["сәлем", "салем", "сәлеметсіз", "привет", "здравствуй", "ассалаумағалейкум", "hi", "hello"];
const THANKS = ["рахмет", "рақмет", "спасибо", "thanks", "thank you"];

/* ---------- small utils ---------- */

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders() });
}

function normalizeKk(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/ә/g, "а").replace(/қ/g, "к").replace(/ғ/g, "г")
    .replace(/ң/g, "н").replace(/ө/g, "о").replace(/ұ/g, "у")
    .replace(/ү/g, "у").replace(/һ/g, "х").replace(/і/g, "и");
}

function normalizeKey(title, author) {
  return `${title} ${author || ""}`
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-zа-яё0-9 ]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isSafeUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function fetchWithTimeout(url, options = {}, ms = EXTERNAL_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

// Strip common "find me a book / recommend" phrasing (RU/KK) so the
// external APIs get a cleaner subject to search on. Falls back to the
// raw message if stripping empties it out.
function extractQuery(raw) {
  const stopPhrases = [
    /найди( мне)?/gi, /найти/gi, /поищи/gi, /ищи/gi, /подбери/gi,
    /посоветуй/gi, /порекомендуй/gi, /хочу (найти|почитать)/gi,
    /нужна|нужны|нужен/gi, /покажи|дай/gi, /книг[уи]?/gi, /книга/gi,
    /тап(ып бер)?/gi, /ұсын/gi, /кеңес бер/gi, /кітап(тар)?/gi, /маған/gi,
  ];
  let q = String(raw || "");
  stopPhrases.forEach((re) => { q = q.replace(re, " "); });
  q = q.replace(/\s+/g, " ").trim();
  return q.length >= 2 ? q : String(raw || "").trim();
}

function escapeForPrompt(text, max = 200) {
  return String(text || "").replace(/\s+/g, " ").trim().slice(0, max);
}

/* ---------- local catalog search (books array comes from the client) ---------- */

function scoreLocalBook(book, words) {
  const haystack = normalizeKk([book.title, book.author, book.desc, ...(book.tags || [])].join(" "));
  let score = 0;
  words.forEach((w) => {
    if (w.length < 3) return;
    if (haystack.includes(w)) score += 1;
  });
  return score;
}

function searchLocal(books, query) {
  const norm = normalizeKk(query);
  const words = norm.split(/[^a-zа-я0-9]+/).filter(Boolean);
  if (!words.length) return [];
  return books
    .map((b) => ({ book: b, score: scoreLocalBook(b, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => ({
      title: r.book.title,
      authors: r.book.author ? [r.book.author] : [],
      description: r.book.desc || "",
      cover: r.book.img || null,
      isbn: null,
      publishedYear: null,
      source: "Сайт",
      url: r.book.link || null,
    }));
}

/* ---------- external search ---------- */

async function searchGoogleBooks(query) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const params = new URLSearchParams({ q: query, maxResults: "5" });
  if (apiKey) params.set("key", apiKey);
  const res = await fetchWithTimeout(`https://www.googleapis.com/books/v1/volumes?${params}`);
  if (!res.ok) throw new Error(`Google Books HTTP ${res.status}`);
  const data = await res.json();
  return (data.items || [])
    .map((item) => {
      const v = item.volumeInfo || {};
      const isbnEntry = (v.industryIdentifiers || []).find(
        (id) => id.type === "ISBN_13" || id.type === "ISBN_10"
      );
      const url = v.infoLink || v.previewLink || v.canonicalVolumeLink || null;
      return {
        title: v.title || "",
        authors: v.authors || [],
        description: v.description ? v.description.replace(/<[^>]+>/g, "").slice(0, 400) : "",
        cover: v.imageLinks?.thumbnail ? v.imageLinks.thumbnail.replace(/^http:/, "https:") : null,
        isbn: isbnEntry ? isbnEntry.identifier : null,
        publishedYear: v.publishedDate ? v.publishedDate.slice(0, 4) : null,
        source: "Google Books",
        url,
      };
    })
    .filter((b) => b.title && b.url && isSafeUrl(b.url));
}

async function searchOpenLibrary(query) {
  const res = await fetchWithTimeout(
    `https://openlibrary.org/search.json?${new URLSearchParams({ q: query, limit: "5" })}`
  );
  if (!res.ok) throw new Error(`Open Library HTTP ${res.status}`);
  const data = await res.json();
  return (data.docs || [])
    .map((doc) => {
      const url = doc.key ? `https://openlibrary.org${doc.key}` : null;
      return {
        title: doc.title || "",
        authors: doc.author_name || [],
        description: "",
        cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
        isbn: (doc.isbn && doc.isbn[0]) || null,
        publishedYear: doc.first_publish_year ? String(doc.first_publish_year) : null,
        source: "Open Library",
        url,
      };
    })
    .filter((b) => b.title && b.url && isSafeUrl(b.url));
}

// Runs both external sources in parallel. Either one can fail/timeout
// independently without breaking the other (graceful degradation).
async function searchExternal(query) {
  const [gb, ol] = await Promise.allSettled([searchGoogleBooks(query), searchOpenLibrary(query)]);
  const results = [];
  const sources = [];
  if (gb.status === "fulfilled") { results.push(...gb.value); sources.push("Google Books"); }
  else console.error("Google Books search failed:", gb.reason?.message || gb.reason);
  if (ol.status === "fulfilled") { results.push(...ol.value); sources.push("Open Library"); }
  else console.error("Open Library search failed:", ol.reason?.message || ol.reason);
  return { results, sources };
}

/* ---------- dedupe ---------- */

function dedupe(localResults, webResults) {
  const localKeys = new Set(localResults.map((b) => normalizeKey(b.title, b.authors[0])));
  const localIsbns = new Set(localResults.map((b) => b.isbn).filter(Boolean));
  const seenIsbn = new Set();
  const seenKey = new Set();
  const out = [];
  for (const b of webResults) {
    const key = normalizeKey(b.title, b.authors[0]);
    if (b.isbn && (localIsbns.has(b.isbn) || seenIsbn.has(b.isbn))) continue;
    if (localKeys.has(key) || seenKey.has(key)) continue;
    seenKey.add(key);
    if (b.isbn) seenIsbn.add(b.isbn);
    out.push(b);
  }
  return out.slice(0, 6);
}

/* ---------- reply composition ---------- */

function templatedMessage(query, hasLocal, hasWeb) {
  if (!hasLocal && !hasWeb) {
    return `«${query}» бойынша нақты сәйкестік таппадым. Сұрауды өзгертіп немесе автордың атын нақтылап көріңізші.`;
  }
  if (hasLocal && hasWeb) return "Міне не таптым:";
  if (hasLocal) return "Сайттан мынау табылды:";
  return "Сайтта дәл сәйкестік жоқ, бірақ интернеттен мыналарды таптым:";
}

async function composeWithLLM({ message, history, localResults, webResults }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;

  const describe = (b) =>
    `- «${escapeForPrompt(b.title)}» — ${escapeForPrompt(b.authors.join(", ") || "автор көрсетілмеген")}` +
    `${b.publishedYear ? ` (${b.publishedYear})` : ""} [${b.source}]`;

  const foundList = [...localResults.map(describe), ...webResults.map(describe)].join("\n") || "(ештеңе табылмады)";

  const instructions = `Сен — «Кітап көмекшісі», «Ұстаздан кеңес: бір кітап» сайтындағы AI ассистент.
Төменде нақты іздеу нәтижесінде табылған кітаптардың тізімі берілген. ТЕК осы тізімдегі кітаптар туралы айт.
Тізімде жоқ кітапты, авторды, сілтемені немесе жылды ЕШҚАШАН ойдан шығарма.
Егер тізім бос болса — таппағаныңды адал айт және сұрауды өзгертуді ұсын.
Пайдаланушының тілінде жауап бер (қазақша сұраса — қазақша, орысша сұраса — орысша).
Жауап 2-3 сөйлемнен аспасын, кітап карточкалары бөлек көрсетіледі, сен тек қысқа кіріспе жаз.

Табылған кітаптар:
${foundList}`;

  const messages = [
    { role: "system", content: instructions },
    ...history.map((h) => ({ role: h.role === "assistant" ? "assistant" : "user", content: escapeForPrompt(h.content, 300) })),
    { role: "user", content: message },
  ];

  try {
    const res = await fetchWithTimeout(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "deepseek-chat", messages, temperature: 0.5, max_tokens: 220 }),
      },
      8000
    );
    if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}`);
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    return reply || null;
  } catch (err) {
    console.error("DeepSeek compose failed:", err.message || err);
    return null;
  }
}

/* ---------- handler ---------- */

export default async (request) => {
  const headers = corsHeaders();

  if (request.method === "OPTIONS") return new Response("", { status: 204, headers });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const rawMessage = String(body?.message || "").trim();
  if (!rawMessage) return json({ error: "Message is required." }, 400);
  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    return json({ error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` }, 400);
  }

  const localBooks = Array.isArray(body?.books) ? body.books.slice(0, 200) : [];
  const history = Array.isArray(body?.history)
    ? body.history.slice(-MAX_HISTORY_TURNS).map((h) => ({
        role: h?.role === "assistant" ? "assistant" : "user",
        content: String(h?.content || "").slice(0, 300),
      }))
    : [];

  const normMsg = normalizeKk(rawMessage);
  const wordCount = rawMessage.split(/\s+/).filter(Boolean).length;

  // Fast path: greetings / thanks don't need any search.
  if (wordCount <= 4 && GREETINGS.some((g) => normMsg.includes(normalizeKk(g)))) {
    return json({
      message: "Сәлем! 👋 Қандай тақырыпта кітап іздеп жатырсың — тарих, мотивация, философия, әлде нақты атау бар ма?",
      localResults: [], webResults: [], sources: [],
    });
  }
  if (wordCount <= 4 && THANKS.some((t) => normMsg.includes(normalizeKk(t)))) {
    return json({
      message: "Оқа етпейді! Тағы кітап іздеу керек болса, жаза бер 📖",
      localResults: [], webResults: [], sources: [],
    });
  }

  try {
    const query = extractQuery(rawMessage).slice(0, 120);

    const localResults = searchLocal(localBooks, rawMessage);
    const { results: rawWeb, sources } = await searchExternal(query);
    const webResults = dedupe(localResults, rawWeb);

    const llmReply = await composeWithLLM({ message: rawMessage, history, localResults, webResults });
    const message = llmReply || templatedMessage(query, localResults.length > 0, webResults.length > 0);

    return json({ message, localResults, webResults, sources });
  } catch (error) {
    console.error("Book assistant pipeline error:", error);
    return json({ error: "Іздеу кезінде қате шықты. Сәлден соң қайталап көріңізші." }, 500);
  }
};
