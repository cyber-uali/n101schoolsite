# Ұстаздан кеңес: бір кітап — AI Book Assistant

Static site (Netlify) + one serverless function that powers the "Кітап
көмекшісі" chat widget. The assistant now searches **both** the site's own
book list **and** the open web (Google Books + Open Library), then replies
with real, verifiable results — it never invents a title, author, or link.

## What's implemented

- Local catalog search (unchanged: the `BOOKS` array in `script.js`).
- External search via Google Books API + Open Library API, run in
  parallel with a 6s timeout each — if one is slow/down, the other still
  returns results.
- Dedup by ISBN, falling back to normalized `title + author`, so a book
  that's already on the site isn't repeated from the web.
- A short LLM-written intro line (DeepSeek) that only talks about the
  books actually found; if DeepSeek is unavailable, a templated Kazakh
  sentence is used instead — the search itself doesn't depend on the LLM.
- Structured response so the UI can show **"📚 Сайттан табылды"** and
  **"🌐 Интернеттен табылды"** as separate sections with real cover, source
  badge, and a link to the actual book page.
- Basic short-term memory (last ~4 turns) sent back to the backend so
  follow-ups like "тек жаңадан бастаушыларға" or "орысша бар ма?" keep
  context.
- Input validation (empty/over-length messages rejected), external HTML
  from Google Books descriptions stripped, and every rendered field is
  HTML-escaped client-side before it touches the DOM — untrusted API data
  never gets inserted raw.
- Graceful degradation: if the whole function is unreachable, the widget
  falls back to a pure client-side search of the local catalog instead of
  just failing silently.

## What's NOT implemented (known limits)

- **No rate limiting.** Netlify Functions are stateless, so limiting
  requests per user needs an external store (e.g. Upstash Redis) — not
  added here to keep the stack dependency-free. Worth adding before
  public traffic.
- **No caching** of external API responses (e.g. via Netlify Blobs), so
  repeated identical queries re-hit Google Books/Open Library each time.
- Language/intent detection is heuristic (keyword stripping), not
  LLM-based — good enough for the common phrasings but not exhaustive.
- Search query is built from the current message + light history, not a
  full multi-turn LLM query-rewriter.

## Setup

1. Rename `_env.example` to `.env` and fill it in:
   ```
   DEEPSEEK_API_KEY=your_deepseek_key
   GOOGLE_BOOKS_API_KEY=   # optional, raises the free quota
   ```
   (Open Library needs no key.)
2. Locally: `npm run dev` (runs `netlify dev`, serves the static site +
   function together at the same origin, so `/.netlify/functions/chat`
   resolves).
3. On Netlify: **Site settings → Environment variables**, add
   `DEEPSEEK_API_KEY` (and optionally `GOOGLE_BOOKS_API_KEY`), then
   redeploy.

## How to test

- **Book that's already on the site:** ask for `1984` or `Икигай` — expect
  a "📚 Сайттан табылды" card only (deduped against the web).
- **Book NOT on the site:** ask "Найди книгу The Pragmatic Programmer" —
  expect a "🌐 Интернеттен табылды" card with a real Google Books/Open
  Library link.
- **Nonsense query:** ask for something that doesn't exist — expect an
  honest "таппадым" message, no fabricated card.
- **Follow-up:** ask "Python бойынша кітап" then "тек бастаушыларға" —
  the second reply should stay on-topic.
- **Offline fallback:** temporarily rename the function file or break the
  endpoint URL, reload, and confirm the widget still returns local-catalog
  matches instead of erroring out.

## Files

- `index.html` / `style.css` / `script.js` — static frontend, unchanged
  in structure; `script.js`'s assistant section was extended to render
  structured local/web result cards.
- `netlify/functions/chat.mjs` — the whole search + reply pipeline.
- `netlify.toml` — Netlify build/function config (unchanged).
