/* ============ DATA ============ */
const BOOKS = [
  {
    title: "Педагогика",
    author: "Мағжан Жұмабаев",
    cat: "kz",
    color: "#3B5A46",
    desc: "Қазақ халқының тұңғыш педагогикалық еңбектерінің бірі. Баланы тәрбиелеудің ұлттық ерекшелігі, мұғалімнің рөлі және адамгершілік құндылықтар туралы жазылған.",
    tags: ["тәрбие", "ұстаз", "педагогика", "оқыту", "мектеп", "бала"],
    img: "https://i.ytimg.com/vi/cBL1ihE1IoI/maxresdefault.jpg",
    link: "https://drive.google.com/file/d/1N2zBsa_Ogce8TARUeKBRVF9IZdTSwJ3c/view?usp=sharing"
  },
  {
    title: "Финляндия ақ лала гүлдер",
    author: "Григорий Петров",
    cat: "world",
    color: "#7C3131",
    desc: "Автор Финляндия халқының мәдениеті, тәртібі, білім беру жүйесі мен өмір сүру философиясы туралы баяндайды.",
    tags: ["білім", "қоғам", "мотивация", "философия", "шетел", "даму"],
    img: "https://i.ytimg.com/vi/BANmnhfLC_Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgQShEMA8=&amp;rs=AOn4CLAQ9z66qsU1Gev9msv7OKzFdQ_GAw",
    link: "https://drive.google.com/file/d/1RZyecQ4wJK-CWn3NLQrgEsECKtW7oHNV/view?usp=sharing"
  },
  {
    title: "Бақытсыз Жамал",
    author: "Міржақып Дулатұлы",
    cat: "kz",
    color: "#2E4A3B",
    desc: "Қазақ әдебиетіндегі алғашқы роман. Әйел теңдігі, махаббат және қоғамдағы әділетсіздік тақырыптарын көтереді.",
    tags: ["махаббат", "әйел теңдігі", "әділетсіздік", "роман", "классика"],
    img: "https://cdn.insales-shop.ru/images/products/1/3065/2811718649/Dulatov.png",
    link: "https://drive.google.com/file/d/1D5ywx0tYg1eIoUlbc9mVlvd61PjdtDPD/view?usp=sharing"
  },
  {
    title: "Икигай",
    author: "Кен Моги",
    cat: "world",
    color: "#B4863C",
    desc: "Жапон философиясына негізделген еңбек. «Икигай» — өмірдің мәнін табу, әр күннен қуаныш алу қағидасы.",
    tags: ["философия", "өмір мәні", "жапон", "мотивация", "тепе-теңдік", "бақыт"],
    img: "https://content.img-gorod.ru/pim/products/images/e4/5d/018f5cc7-d34b-7459-97d4-5e0e6e30e45d.jpg",
    link: "https://drive.google.com/file/d/12jJS9dYPJ__bhWUmafe_4iNAtI8-cFG_/view?usp=sharing"
  },
  {
    title: "Қаһар",
    author: "Ілияс Есенберлин",
    cat: "kz",
    color: "#5F4526",
    desc: "«Көшпенділер» трилогиясының соңғы бөлімі. Қасым хан дәуірі, ел бірлігі мен еркіндік жолындағы күрес туралы тарихи роман.",
    tags: ["тарих", "ел бірлігі", "ерлік", "роман", "хандық дәуір", "тарихи"],
    img: "https://i1.ytimg.com/vi/-mxUevFfhJ4/hqdefault.jpg",
    link: "https://drive.google.com/file/d/1ujj9uNiZpdbKFFRC9GKyyCIBNDWqqtO4/view?usp=sharing"
  },
  {
    title: "Атом әдеттер",
    author: "Джеймс Клир",
    cat: "world",
    color: "#3B5A46",
    desc: "Күнделікті ұсақ әрекеттердің өмірді түбегейлі өзгерте алатынын дәлелдейтін психологиялық-танымдық еңбек.",
    tags: ["мотивация", "даму", "әдет", "психология", "өзін-өзі дамыту", "тәртіп"],
    img: "https://basket-33.wbbasket.ru/vol6911/part691177/691177030/images/big/1.webp",
    link: "https://drive.google.com/file/d/142eL2sP-QRDtwgSrWKq-7-LDnvdZEUmM/view?usp=sharing"
  },
  {
    title: "Атау кере",
    author: "Оралхан Бөкей",
    cat: "kz",
    color: "#7C3131",
    desc: "Адам жанының күрделі иірімдерін, ар мен ұят, өмір мен өлім мәселесін терең бейнелеген философиялық туынды.",
    tags: ["философия", "ар-ождан", "психология", "драма", "рухани"],
    img: "https://online.pubhtml5.com/elti/vzlm/files/shot.jpg",
    link: "https://drive.google.com/file/d/1twTZgqcbY6-Y8MlTD5_UwWX0raQ8vwUt/view?usp=sharing"
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    cat: "world",
    color: "#221D16",
    desc: "Еркіндік пен бақылау, шындық пен өтірік арасындағы күресті бейнелейтін антиутопиялық роман.",
    tags: ["антиутопия", "саясат", "еркіндік", "классика", "шетел", "фантастика"],
    img: "https://imo02.my-shop.ru/products504/5030930/cover.jpg/500-0",
    link: "https://drive.google.com/file/d/1CgX2ch5Suw3cRoWcCJEuhS7ds6qQtQtO/view?usp=sharing"
  },
  {
    title: "Қаныш және Ғылыми майдан",
    author: "Санжар Керімбай, Әділбек Нәби",
    cat: "kz",
    color: "#2E4A3B",
    desc: "Ұлы ғалым Қаныш Сәтбаевтың өмірі мен ғылыми еңбектері туралы тың деректерге негізделген зерттеу.",
    tags: ["ғылым", "тарих", "тұлға", "қазақ ғалымдары", "биография"],
    img: "https://basket-18.wbbasket.ru/vol2891/part289161/289161464/images/big/1.webp",
    link: "https://kaspi.kz/shop/p/ker-mbai-s-n-bi-anysh-zh-ne-ylymi-maidan-123730850/"
  },
  {
    title: "Искусство объяснять",
    author: "Ли ЛеФевер",
    cat: "world",
    color: "#B4863C",
    desc: "Күрделі нәрсені қарапайым тілмен түсіндіру өнері туралы кітап. Түсіндірудің құрылымы мен storytelling тәсілдерін үйретеді.",
    tags: ["шеберлік", "ұстазға", "storytelling", "дағды", "коммуникация"],
    img: "https://cdn.litres.ru/pub/c/cover/6183660.jpg",
    link: "https://flibusta.su/book/16569-iskusstvo-obyasnyat/read/"
  },
  {
    title: "Математикалық сауаттылық (тест жинағы)",
    author: "Медеубек Х.",
    cat: "ent",
    color: "#3A5E8C",
    desc: "ҰБТ-ға арналған математикалық сауаттылық тест жинағы. Логика, пайыз, пропорция, геометрия және күнделікті өмірдегі есептер арқылы арифметикалық дағдыны жетілдіреді.",
    tags: ["ент", "убт", "математическая грамотность", "математикалық сауаттылық", "тест", "дайындық", "логика", "есеп"],
    img: "",
    link: "https://kaspi.kz/shop/p/sbornik-testov-medeubek-h-matematikaly-sauattyly-bt-2026-153564977/"
  },
  {
    title: "Математика ҰБТ: талапкерге арналған оқулық-тест",
    author: "Сейтжанова А., Қазмағамбет Б., Базаров Е.",
    cat: "ent",
    color: "#2B6B6B",
    desc: "Шың-кітап баспасының ҰБТ-ға арналған математика оқулық-тесті. Тақырыптар, есептерді шешу тәсілдері және тест тапсырмалары толық қамтылған.",
    tags: ["ент", "убт", "математика", "тест", "алгебра", "геометрия", "дайындық", "тапсырма"],
    img: "",
    link: "https://kaspi.kz/shop/p/seitzhanova-a-azma-ambet-b-bazarov-e-matematika-bt-talapkerge-arnal-an-o-uly--test-112624930/"
  },
  {
    title: "Математикалық сауаттылық — оқулық тест",
    author: "Елемесов Е., Базаров Е., Мирзахмедов А.",
    cat: "ent",
    color: "#C77A2E",
    desc: "Мәселені тану, математика тілінде тұжырымдау және шешу әдістерін қолдану дағдыларын дамытуға арналған Шың-кітап оқулық-тесті. ҰБТ пішіміндегі тапсырмалар.",
    tags: ["ент", "убт", "математикалық сауаттылық", "тест", "дайындық", "есеп"],
    img: "",
    link: "https://shynkitap.kz/index.php?product_id=61&route=product%2Fproduct"
  },
  {
    title: "Математическая грамотность — учебник-тест",
    author: "Базаров Е., Мирзахмедов А., Өтеген Н.",
    cat: "ent",
    color: "#2C3E6B",
    desc: "ЕНТ-ға арналған математикалық сауаттылық оқулық-тесті: тақырыптар, шешімдері бар мысалдар, 20 нұсқа тест және өзін-өзі тексеруге арналған жауаптар.",
    tags: ["ент", "убт", "математическая грамотность", "математикалық сауаттылық", "тест", "дайындық"],
    img: "",
    link: "https://shynkitap.kz/index.php?product_id=87&route=product%2Fproduct"
  },
  {
    title: "Оқу сауаттылығы (3-бөлім)",
    author: "QAZBILIM баспасы",
    cat: "ent",
    color: "#8B3A3A",
    desc: "Оқу сауаттылығынан ҰБТ-ға дайындалуға арналған оқу-әдістемелік құрал. Әр нұсқада 20 сұрақтан тұратын 15 нұсқа тест және олардың толық жауаптары берілген.",
    tags: ["ент", "убт", "оқу сауаттылығы", "грамотность чтения", "тест", "мәтін", "дайындық"],
    img: "",
    link: "https://kaspi.kz/shop/p/qazbilim-o-u-sauattyly-y-3-b-l-m-101099132/"
  },
  {
    title: "Қазақ әдебиеті ҰБТ. Талапкерге арналған оқулық-тест",
    author: "Шың-кітап баспасы",
    cat: "ent",
    color: "#4A5568",
    desc: "Қазақ әдебиеті пәнінен ҰБТ-ға дайындыққа арналған оқулық-тест: шығармалар, талдау және тест тапсырмалары мектеп бағдарламасына сәйкес берілген.",
    tags: ["ент", "убт", "қазақ әдебиеті", "тест", "шығарма", "дайындық"],
    img: "",
    link: "https://www.bookcity.kz/products/aza-debieti-bt-talapkerge-arnal-an-o-uly-test-9786010804869/"
  },
  {
    title: "Қазақстан тарихы: оқулық-тест",
    author: "Сатанов А.",
    cat: "ent",
    color: "#5F4526",
    desc: "Қазақстан тарихынан ҰБТ-ға дайындық оқулық-тесті. Мектеп бағдарламасындағы барлық кезеңдерді қамтитын теория мен тест тапсырмалары тарих пәнінен жоғары балл алуға көмектеседі.",
    tags: ["ент", "убт", "қазақстан тарихы", "история", "тест", "дайындық"],
    img: "",
    link: "http://elib.wku.edu.kz/lib/document/KNIGI/C78A0F29-3705-4256-8A09-CB4B945F49A0/"
  }
];

const TEACHERS = [
  {
    name: "Кырбасова Тұрсынай Айдарқызы",
    subject: "Информатика",
    quote: "Момбек Әбдәкімұлының «Сүлеймен қарақшы» — жақсылық пен жамандықтың, ар мен нәпсінің күресі туралы әсерлі оқиға.",
    img: "img/teachers/01.jpg",
    link: "https://www.instagram.com/reel/DSIWh-rDIyq/"
  },
  {
    name: "Ерікұлы Нұрбек",
    subject: "География",
    quote: "Джеймс Клир — «Атом әдеттер». Күнделікті шағын қадамдар үлкен нәтижеге жеткізетінін дәлелдейтін керемет кітап.",
    img: "img/teachers/02.jpg",
    link: "https://www.instagram.com/reel/DRPRIA0DCM5/"
  },
  {
    name: "Шауенова Эльмира Сапаровна",
    subject: "Қазақ тілі мен әдебиеті",
    quote: "«Өзбекәлі мен Мәдени майдан» — ұлттық рухты көтеретін, мәдени сана қалыптастыратын маңызды еңбектер.",
    img: "img/teachers/03.jpg",
    link: "https://www.instagram.com/reel/DSKR3ZwDAAH/"
  },
  {
    name: "Кырбасова Тұрсынай Айдарқызы",
    subject: "Информатика",
    quote: "Жюль Верн «Әлемді сексен күнде шарлау» — шытырман оқиғамен қатар табандылық пен сенімнің шынайы құнын көрсетеді.",
    img: "img/teachers/04.jpg",
    link: "https://www.instagram.com/reel/DPjJ4OyDMWm/"
  },
  {
    name: "Айтбағамбетов Бекімжан Есенұлы",
    subject: "Информатика",
    quote: "Джон Кехоу «Түйсігіңмен ойла»: «Сіздің санаңызда ұстайтын әрбір ойыңыз — болашағыңыздың дәні».",
    img: "img/teachers/05.jpg",
    link: "https://www.instagram.com/reel/DC51kSKCXNV/"
  },
  {
    name: "Кошбаев Жүсіп Алтынбекұлы",
    subject: "Тарих",
    quote: "Бұл кітап арқылы жастар тарихты біліп қана қоймай, жігер мен табандылықтың рөлін түсініп, рухани дамуға жол табады.",
    img: "img/teachers/06.jpg",
    link: "https://www.instagram.com/reel/DCoG-ttAx6E/"
  },
  {
    name: "Болатов Ерзат Жәнібекұлы",
    subject: "Математика",
    quote: "Дулат Исабеков «Қарғын» — адамның қоғам, отбасы, ата-ана алдындағы міндеттері туралы. Қазіргі жастарға өте керек кітап.",
    img: "img/teachers/07.jpg",
    link: "https://www.instagram.com/reel/DCT6YQDASXr/"
  },
  {
    name: "Боранбайқызы Назерке",
    subject: "Биология",
    quote: "Дэниел Гоулман «Эмоционалды интеллект» — өзіңізді зерттеп, ең үздік нұсқаңызды қалыптастыруға көмектеседі.",
    img: "img/teachers/08.jpg",
    link: "https://www.instagram.com/reel/DGQiLXVonR-/"
  },
  {
    name: "Ерікұлы Нұрбек",
    subject: "География",
    quote: "Шерхан Мұртаза «Ай мен Айша» — «Дүниенің жаратылысында жазық жоқ. Дүниені бүлдіретін — өзіміз».",
    img: "img/teachers/09.jpg",
    link: "https://www.instagram.com/reel/DDOmWdPgE4d/"
  }
];

const CHAIN = [
  {
    name: 'Орал Рамазан',
    cls: '10 "Ә" сынып оқушысы',
    desc: '«Ұстаз ұсынған кітап челленджі» — оқушылар ұстаз ұсынған кітаптардың бірін таңдап оқып, алған әсерін өзгелермен бөлісті. «Оқы. Ойлан. Бөліс.»',
    img: "https://lh3.googleusercontent.com/sitesv/AG8ngQUO8aFV_u5gQZddnz9FdR-WA8th8LB0AEvOAwQc7dZRIeIdOCO-VhpCUuvRh5A5f4KxXg4Bb9itgoPdML-zeXIHss6EGaHXFHnkotvRmmjmyTUXLBme-hx3qWhbZY_ryrhLBO41AHz8nUq3w5D5lpx0KCoq3m067WPQ97dbu0BytbyKp0rHgvQJnFOlsfRnroZEIvFMmB5F7Gq9EYjQFppcHwVF5WHZl6dz7wJh=w300",
    link: "https://www.instagram.com/reel/DSZBfrGCGcM/"
  },
  {
    name: 'Төлеген Жансұлтан',
    cls: '9 "А" сынып оқушысы',
    desc: '10 "А" сыныптан челленджді қабылдап, 8 "А" сыныпқа жолдады. Ұсынған кітабы — Оралхан Бөкейдің «Қар қызы». «Бір кітап — бір ой — бір қадам».',
    img: "https://lh3.googleusercontent.com/sitesv/AG8ngQUtWtuDHtt3vXL3o73H0TPu5BpeectZBOA0ixXiecZkyIMSOQgQ7TsNgbiiI4BTJtAarJYYdKRvt1cyHHNvJ6IvEelZ_JCMGvXFNc8yYLU3B9PxemnAS6aTD6uayP2g-44vMbgLxdFM0LzvVBV33ythakHMt0bkHn_ydM1Ng2k23bKVwGLOFRubExK1hMc4J0dgfqKV_0FzUtfg767qZv0r1KWqNowUvtKW0_VG=w300",
    link: null
  },
  {
    name: 'Сәрсенбай Еркебұлан',
    cls: '10 "А" сынып оқушысы',
    desc: '10 "Ә" сыныптан челленджді қабылдап, 9 "А" сыныпқа жолдады. Ұсынған кітабы — Санжар Керімбайдың «Өзбекәлі және мәдени майдан».',
    img: "",
    link: null
  }
];

/* ============ RENDER: hero shelf ============ */
function renderShelf(){
  const el = document.getElementById('shelfBooks');
  const widths = [34, 30, 46, 32, 38, 30, 42, 34, 30, 36];
  const heights = [220, 260, 190, 240, 200, 255, 210, 235, 245, 200];
  let html = '';
  BOOKS.forEach((b, i) => {
    const w = widths[i % widths.length];
    const h = heights[i % heights.length];
    html += `<div class="spine" style="width:${w}px;height:${h}px;background:${b.color};animation-delay:${i * 0.06}s"><span>${b.title}</span></div>`;
  });
  el.innerHTML = html;
}

/* Branded placeholder shown when a remote cover image fails to load */
function bookCoverFallback(title, color){
  const initial = String(title || "?").trim().charAt(0).toUpperCase() || "?";
  return `<div class="book-cover-fallback" style="background:${color || "var(--forest-deep)"}"><span>${initial}</span></div>`;
}

/* ============ RENDER: books grid ============ */
function renderBooks(){
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = BOOKS.map((b, i) => `
    <article class="book-card" data-cat="${b.cat}" data-index="${i}">
      <div class="book-cover">
        ${b.img ? `<img src="${b.img}" alt="${b.title}" loading="lazy" onerror="this.replaceWith(bookCoverFallback('${escapeHtml(b.title)}','${b.color}'))">` : bookCoverFallback(b.title, b.color)}
        <span class="book-tag ${b.cat === 'world' ? 'tag-world' : b.cat === 'ent' ? 'tag-ent' : ''}">${b.cat === 'kz' ? 'Қазақ' : b.cat === 'ent' ? 'ҰБТ' : 'Әлем'}</span>
      </div>
      <div class="book-body">
        <h3>${b.title}</h3>
        <p class="book-author">${b.author}</p>
        <p class="book-desc">${b.desc}</p>
        <a class="book-link" href="${b.link}" target="_blank" rel="noopener">Кітапты табу →</a>
      </div>
    </article>
  `).join('');
}

/* ============ RENDER: teachers ============ */
function renderTeachers(){
  const wrap = document.getElementById('teacherShelf');
  wrap.innerHTML = TEACHERS.map(t => {
    const initials = t.name.split(' ').slice(0,2).map(w => w[0]).join('');
    return `
    <article class="teacher-card">
      <div class="teacher-top">
        <div class="teacher-photo">${t.img ? `<img src="${t.img}" alt="${escapeHtml(t.name)}" loading="lazy" onerror="this.parentElement.textContent='${escapeHtml(initials)}'">` : initials}</div>
        <div>
          <p class="teacher-name">${t.name}</p>
          <p class="teacher-subject">${t.subject}</p>
        </div>
      </div>
      <p class="teacher-quote">${t.quote}</p>
      <a class="teacher-link" href="${t.link}" target="_blank" rel="noopener">Reel-ді көру →</a>
    </article>`;
  }).join('');
}

/* ============ RENDER: challenge chain ============ */
function renderChain(){
  const wrap = document.getElementById('chainList');
  wrap.innerHTML = CHAIN.map((c, i) => `
    <div class="chain-item">
      <div class="chain-num">${i + 1}</div>
      <div class="chain-card">
        ${c.img ? `<div class="chain-photo"><img src="${c.img}" alt="${c.name}" loading="lazy"></div>` : ''}
        <div class="chain-text">
          <p class="chain-name">${c.name}</p>
          <p class="chain-class">${c.cls}</p>
          <p class="chain-desc">${c.desc}</p>
        </div>
        ${c.link ? `<a class="chain-link" href="${c.link}" target="_blank" rel="noopener">Видео →</a>` : ''}
      </div>
    </div>
  `).join('');
}

/* ============ Feature: scroll progress ============ */
function initProgress(){
  const fill = document.getElementById('progressFill');
  function update(){
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    fill.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
  }
  document.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============ Feature: mobile nav ============ */
function initNavToggle(){
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));
}

/* ============ Feature: scrollspy ============ */
function initScrollspy(){
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));
  function update(){
    let current = sections[0];
    sections.forEach(s => {
      if (s && window.scrollY >= s.offsetTop - 120) current = s;
    });
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + current.id));
  }
  document.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============ Feature: book filters ============ */
function initFilters(){
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = () => document.querySelectorAll('.book-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      cards().forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
}

/* ============ Feature: random book ============ */
function initRandomBook(){
  const btn = document.getElementById('randomBookBtn');
  btn.addEventListener('click', () => {
    // reset filters to "all" so the pick is always visible
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('is-active');
    document.querySelectorAll('.book-card').forEach(c => c.classList.remove('is-hidden'));

    const cards = document.querySelectorAll('.book-card');
    const pick = cards[Math.floor(Math.random() * cards.length)];
    pick.scrollIntoView({ behavior: 'smooth', block: 'center' });
    pick.classList.remove('flash');
    void pick.offsetWidth;
    pick.classList.add('flash');
  });
}

/* ============ Feature: teacher shelf arrows ============ */
function initTeacherArrows(){
  const shelf = document.getElementById('teacherShelf');
  const prev = document.getElementById('teacherPrev');
  const next = document.getElementById('teacherNext');
  const step = 290;
  prev.addEventListener('click', () => shelf.scrollBy({ left: -step, behavior: 'smooth' }));
  next.addEventListener('click', () => shelf.scrollBy({ left: step, behavior: 'smooth' }));
}

/* ============ Feature: reveal on scroll ============ */
function initReveal(){
  const targets = document.querySelectorAll('.section-head, .book-card, .chain-item, .about-card, .review-card, .review-collage');
  targets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));
}

/* ============ Feature: AI book assistant via Cloudflare Worker ============ */
const ASSISTANT_CATS = {
  kz: ["қазақ", "казак", "отандық", "ұлттық"],
  world: ["әлем", "шетел", "world", "заманауи", "переводной"],
  ent: ["ент", "ұбт", "уыбт", "тест", "дайындық", "сауаттылық", "тапсырма", "экзамен", "бағалау", "сынақ"]
};

// Rolling short-term memory so follow-ups like "тек жаңадан бастаушыларға"
// or "орысша бар ма?" are understood in context of the previous search.
const conversationHistory = [];

function normalizeKk(str){
  return String(str || "")
    .toLowerCase()
    .replace(/ә/g, "а").replace(/қ/g, "к").replace(/ғ/g, "г")
    .replace(/ң/g, "н").replace(/ө/g, "о").replace(/ұ/g, "у")
    .replace(/ү/g, "у").replace(/һ/g, "х").replace(/і/g, "и");
}

function scoreBook(book, queryNorm, words){
  const haystack = normalizeKk([book.title, book.author, book.desc, ...(book.tags || [])].join(" "));
  let score = 0;
  words.forEach(w => {
    if (w.length < 3) return;
    if (haystack.includes(w)) score += 1;
    (book.tags || []).forEach(tag => { if (normalizeKk(tag).includes(w)) score += 1; });
  });
  return score;
}

function findBooks(query){
  const norm = normalizeKk(query);
  const words = norm.split(/[^a-zа-я0-9]+/).filter(Boolean);
  let pool = BOOKS;

  const wantsKz = ASSISTANT_CATS.kz.some(k => norm.includes(normalizeKk(k)));
  const wantsWorld = ASSISTANT_CATS.world.some(k => norm.includes(normalizeKk(k)));
  if (wantsKz && !wantsWorld) pool = BOOKS.filter(b => b.cat === "kz");
  if (wantsWorld && !wantsKz) pool = BOOKS.filter(b => b.cat === "world");

  const scored = pool
    .map(b => ({ book: b, score: scoreBook(b, norm, words) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(r => r.book);
}

// Kept for the "site is fully offline" fallback path only — the normal
// flow renders results via renderResultCard() below.
function bookMiniCard(b){
  return `
    <div class="chat-book">
      ${b.img ? `<img src="${escapeHtml(b.img)}" alt="${escapeHtml(b.title)}">` : `<div class="chat-book-fallback" style="background:${b.color || "var(--paper-deep)"}"></div>`}
      <div>
        <p class="chat-book-title">${escapeHtml(b.title)}</p>
        <p class="chat-book-author">${escapeHtml(b.author)}</p>
        <a href="${b.link}" target="_blank" rel="noopener">Кітапты табу →</a>
      </div>
    </div>`;
}

function addChatMessage(role, html){
  const list = document.getElementById("assistantMessages");
  const wrap = document.createElement("div");
  wrap.className = `msg msg-${role}`;
  wrap.innerHTML = html;
  list.appendChild(wrap);
  list.scrollTop = list.scrollHeight;
  return wrap;
}

function escapeHtml(value){
  return String(value || "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[ch]));
}

function simpleFormat(text){
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

// Every field here can come from an external API (Google Books / Open
// Library), so nothing is trusted: text is escaped and links are
// protocol-checked before they ever touch innerHTML.
function isSafeUrl(url){
  if (!url) return false;
  try {
    const u = new URL(url, window.location.href);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch { return false; }
}

function renderResultCard(b){
  const authors = Array.isArray(b.authors) ? b.authors.filter(Boolean).join(", ") : "";
  const meta = [authors, b.publishedYear].filter(Boolean).join(" · ");
  const safeUrl = isSafeUrl(b.url) ? b.url : null;
  const desc = b.description ? (b.description.length > 140 ? b.description.slice(0, 140) + "…" : b.description) : "";
  return `
    <div class="chat-book chat-book-result">
      ${b.cover ? `<img src="${escapeHtml(b.cover)}" alt="${escapeHtml(b.title)}" loading="lazy">` : `<div class="chat-book-fallback"></div>`}
      <div class="chat-book-info">
        <p class="chat-book-title">${escapeHtml(b.title)}</p>
        ${meta ? `<p class="chat-book-author">${escapeHtml(meta)}</p>` : ""}
        ${desc ? `<p class="chat-book-desc">${escapeHtml(desc)}</p>` : ""}
        <div class="chat-book-foot">
          ${b.source ? `<span class="chat-book-source">${escapeHtml(b.source)}</span>` : ""}
          ${safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener">Кітапты ашу →</a>` : ""}
        </div>
      </div>
    </div>`;
}

function renderAssistantReply(data){
  let html = simpleFormat(data.message || "");
  if (Array.isArray(data.localResults) && data.localResults.length){
    html += `<p class="chat-section-label">📚 Сайттан табылды</p>` + data.localResults.map(renderResultCard).join("");
  }
  if (Array.isArray(data.webResults) && data.webResults.length){
    html += `<p class="chat-section-label">🌐 Интернеттен табылды</p>` + data.webResults.map(renderResultCard).join("");
  }
  return html;
}

async function askAI(message){
  const response = await fetch("https://ustazdan-kenes.ustazdan-kenes-netlify.workers.dev", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      message,
      history: conversationHistory,
      books: BOOKS.map(b => ({
        title: b.title,
        author: b.author,
        desc: b.desc,
        tags: b.tags,
        cat: b.cat,
        link: b.link,
        img: b.img
      }))
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "AI request failed");
  if (!data.message) throw new Error("Empty AI response");
  return data;
}

function initAssistant(){
  const fab = document.getElementById("assistantFab");
  const panel = document.getElementById("assistantPanel");
  const close = document.getElementById("assistantClose");
  const form = document.getElementById("assistantForm");
  const input = document.getElementById("assistantInput");

  if (!fab || !panel || !close || !form || !input) return;

  const open = () => {
    panel.classList.add("is-open");
    fab.classList.add("is-hidden");
    input.focus();
  };
  const shut = () => {
    panel.classList.remove("is-open");
    fab.classList.remove("is-hidden");
  };

  fab.addEventListener("click", open);
  close.addEventListener("click", shut);

  document.querySelectorAll(".chat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.query || "";
      form.requestSubmit();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addChatMessage("user", escapeHtml(message));
    input.value = "";
    input.disabled = true;
    form.querySelector("button").disabled = true;

    const typing = addChatMessage("bot", `<span class="assistant-typing">Ойланып жатырмын…</span>`);

    try {
      const data = await askAI(message);
      typing.innerHTML = renderAssistantReply(data);

      conversationHistory.push({ role: "user", content: message });
      conversationHistory.push({ role: "assistant", content: data.message || "" });
      if (conversationHistory.length > 8) conversationHistory.splice(0, conversationHistory.length - 8);
    } catch (error) {
      // Backend/network is down entirely — fall back to a pure client-side
      // search of the local catalog so the widget still does *something*.
      const matches = findBooks(message);
      const fallback = "Қазір AI-көмекшіге қосыла алмадым. Бірақ сайттағы кітаптардың ішінен мынадай нұсқаларды қарап көре аласың:";
      if (matches.length) {
        typing.innerHTML = `${fallback}${matches.map(bookMiniCard).join("")}`;
      } else {
        typing.innerHTML = "Қазір AI-көмекшіге қосыла алмадым. Төмендегі санаттарды таңдап көр немесе біраздан кейін қайта жаз.";
      }
      console.error("Book assistant error:", error);
    } finally {
      input.disabled = false;
      form.querySelector("button").disabled = false;
      input.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", initAssistant);

document.addEventListener("DOMContentLoaded", () => {
  renderShelf();
  renderBooks();
  renderTeachers();
  renderChain();
  initProgress();
  initNavToggle();
  initScrollspy();
  initFilters();
  initRandomBook();
  initTeacherArrows();
  initReveal();
});

