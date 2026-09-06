/* ============================================================
   Himherbal Healthcare — Journey / Team / Portfolio / Gallery data
   Vanilla JS, no dependencies. Every render is guarded so this
   file is safe to include on any page, whether or not that page
   has the matching section.
   (Shared header/nav/reveal/counters/footer-year live in main.js
   — not duplicated here, so the two files never double-bind.)
   ============================================================ */
(function () {
  "use strict";

  const svg = (p) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const TROPHY = '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>';


  /* ==========================================================
     PRODUCT CATALOGUE — Perfumes / Attar / Body Care / Hair Care
     ----------------------------------------------------------
     Each entry: { name, brand, desc, img }
     "img" paths follow the sequential numbering system below —
     when the real product photos are renamed to match these
     numbers (01.png, 02.png, ...) they will drop straight in.

     GLOBAL SEQUENCE: 01–14 Perfumes · 15–21 Attar ·
                       22–29 Body Care · 30–34 Hair Care
     ========================================================== */
  const PRODUCTS = {
    Perfumes: [
      // IMAGE 01 — PERFUMES — "Blue Sportz" (John Phillips) — REPLACE WITH images/Perfumes/01.png
      { name: "Blue Sportz", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/15.png" },
      // IMAGE 02 — PERFUMES — "Passport" (John Phillips) — REPLACE WITH images/Perfumes/02.png
      { name: "Passport", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/16.png" },
      // IMAGE 03 — PERFUMES — "Woody" (John Phillips) — REPLACE WITH images/Perfumes/03.png
      { name: "Woody", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/17.png" },
      // IMAGE 04 — PERFUMES — "London Dreams" (John Phillips) — REPLACE WITH images/Perfumes/04.png
      { name: "London Dreams", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/18.png" },
      // IMAGE 05 — PERFUMES — "Sparkle" (John Phillips) — REPLACE WITH images/Perfumes/05.png
      { name: "Sparkle", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/19.png" },
      // IMAGE 06 — PERFUMES — "Mr. Blue" (John Phillips) — REPLACE WITH images/Perfumes/06.png
      { name: "Mr. Blue", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/20.png" },
      // IMAGE 07 — PERFUMES — "Water Drops" (John Phillips) — REPLACE WITH images/Perfumes/07.png
      { name: "Water Drops", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/21.png" },
      // IMAGE 08 — PERFUMES — "Party Girl" (Marconi) — REPLACE WITH images/Perfumes/08.png
      { name: "Party Girl", brand: "Marconi", desc: "Marconi", img: "images/Perfumes/22.png" },
      // IMAGE 09 — PERFUMES — "Senorita" (Marconi) — REPLACE WITH images/Perfumes/09.png
      { name: "Senorita", brand: "Marconi", desc: "Marconi", img: "images/Perfumes/23.png" },
      // IMAGE 10 — PERFUMES — Marconi fragrance, name unclear on artwork — CONFIRM NAME, then REPLACE WITH images/Perfumes/10.png
      { name: "Marconi Fragrance (name to confirm)", brand: "Marconi", desc: "Marconi", img: "images/Perfumes/24.png" },
      // IMAGE 11 — PERFUMES — "Manget M" (John Phillips) — REPLACE WITH images/Perfumes/11.png
      { name: "Manget M", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/25.png" },
      // IMAGE 12 — PERFUMES — "Dark Code" (John Phillips) — REPLACE WITH images/Perfumes/12.png
      { name: "Dark Code", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/26.png" },
      
      { name: "Legend NOIR", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/30.jpg" },
      { name: "Secret Code", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/31.jpg" },
      { name: "Roar", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/32.jpg" },
      { name: "Black Stone", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/33.jpg" },
      { name: "Intense", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/34.jpg" },
      { name: "Gun Point", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/35.jpg" },
      { name: "The Boss", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/36.jpg" },
      { name: "Luxury OUD", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/37.jpg" },
      { name: "Goldmine", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/38.jpg" },
      { name: "Bold Black", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/39.jpg" },
      { name: "Ameer All Oud", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/40.jpg" },
      { name: "Desire Intimiate", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/41.jpg" },
      { name: "Rock Star", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/42.jpg" },
      { name: "Bakkarat Rouge", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/43.jpg" },
      { name: "Oud Moment", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/44.jpg" },
      { name: "Most Wanted", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/45.jpg" },
      { name: "Attitude", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/46.jpg" },
      { name: "Urban Cigar", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/47.jpg" },
      { name: "Cruize Passionate", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/48.jpg" },
      { name: "Sportz Winner", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/49.jpg" },
      { name: "Sportz Victory", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/50.jpg" },
      { name: "Sportz Racer", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/51.jpg" },
      { name: "Sportz Rider", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/52.jpg" },
      { name: "Sportz Challenger", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/53.jpg" },
      { name: "Sportz Power Play", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/54.jpg" },
      { name: "Striker", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/55.jpg" },
      { name: "Sign Up", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/56.jpg" },
      { name: "Evoke", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/57.jpg" },
      { name: "Urbana", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/59.jpg" },
      { name: "Blue Ocean", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/60.jpg" },
      { name: "Indigo Blue", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/61.jpg" },
      { name: "Velevel", brand: "John Phillips", desc: "John Phillips", img: "images/Perfumes/63.jpg" },
          ],
    Attar: [
      { name: "24 Carat", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/43.png"},
      
      { name: "Intense", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/44.png" },
      
      { name: "Blue London", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/45.png" },
      
      { name: "Iceberg", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/46.png" },
      
      { name: "Jeans", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/47.png" },
      
      { name: "Kesar Chandan Sukhad", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/48.png" },
      
      { name: "Royal Miracle", brand: "Pioneer Scent", desc: "Pioneer Scent", img: "images/Attar/49.png" }
    ],
    "Body Care": [
      // IMAGE 22 — BODY CARE — "Turmeric Skin Cream" (Him Herbal) — REPLACE WITH images/Body care/22.png
      { name: "Turmeric Skin Cream", brand: "Him Herbal", desc: "For Fair & Brighten, Soften Skin", img: "images/Body care/30.png" },
      // IMAGE 23 — BODY CARE — "Balm" (Him Herbal) — REPLACE WITH images/Body care/23.png
      { name: "Extra Power Balm", brand: "Him Herbal", desc: "Headache · Body Ache · Cold", img: "images/Body care/31.png" },
      // IMAGE 24 — BODY CARE — "Body Lotion" (Him Herbal) — two variants (Advanced Whitening / Natural Moisturizing) shown on one label — REPLACE WITH images/Body care/24.png
      { name: "Body Lotion", brand: "Him Herbal", desc: "Advanced Whitening & Natural Moisturizing", img: "images/Body care/32.png" },
      // IMAGE 25 — BODY CARE — "Ice Talc Herbal Cool Powder" (Him Herbal) — REPLACE WITH images/Body care/25.png
      { name: "Ice Talc Herbal Cool Powder", brand: "Him Herbal", desc: "Cooling Freshness", img: "images/Body care/33.png" },
      // IMAGE 26 — BODY CARE — "Face Wash" (Him Herbal) — two variants (Neem & Aloevera / Fruit) shown on one label — REPLACE WITH images/Body care/26.png
      { name: "Face Wash", brand: "Him Herbal", desc: "Neem & Aloevera / Fruit", img: "images/Body care/34.png" },
      // IMAGE 27 — BODY CARE — "Fairness Cream for Men" (Him Herbal) — REPLACE WITH images/Body care/27.png
      { name: "Fairness Cream for Men", brand: "Him Herbal", desc: "Complete Fairness Solution for Male Skin", img: "images/Body care/35.png" },
      // IMAGE 28 — BODY CARE — "Pain Relief Ointment" (Him Herbal) — REPLACE WITH images/Body care/28.png
      { name: "Pain Relief Ointment", brand: "Him Herbal", desc: "Back, Spinal, Neck, Shoulder, Joint & Knee Pain", img: "images/Body care/36.png" },
      // IMAGE 29 — BODY CARE — "Spot Nil Cream" (Him Herbal) — REPLACE WITH images/Body care/29.png
      { name: "Spot Nil Cream", brand: "Him Herbal", desc: "Acne & Pimple Cream", img: "images/Body care/37.png" }
    ],
    "Hair Care": [
      // IMAGE 30 — HAIR CARE — "Almond Gold" (Him Herbal) — REPLACE WITH images/Hair Care/30.png
      { name: "Almond Gold", brand: "Him Herbal", desc: "Non-Sticky Hair Oil", img: "images/Hair Care/38.png" },
      // IMAGE 31 — HAIR CARE — "Him Herbal Tel" (Him Herbal) — REPLACE WITH images/Hair Care/31.png
      { name: "Him Herbal Tel", brand: "Him Herbal", desc: "Ayurvedic Herbal Hair Oil", img: "images/Hair Care/39.png" },
      // IMAGE 32 — HAIR CARE — "Kesh Gange" (Kesh Gange) — REPLACE WITH images/Hair Care/32.png
      { name: "Kesh Gange", brand: "Kesh Gange", desc: "Ayurvedic Tail Vidhi Hair Oil — Controls Hair Fall", img: "images/Hair Care/40.png" },
      // IMAGE 33 — HAIR CARE — "Onion Black Seed" (Him Herbal) — REPLACE WITH images/Hair Care/33.png
      { name: "Onion Black Seed", brand: "Him Herbal", desc: "Ayurvedic Hair Oil", img: "images/Hair Care/41.png" },
      // // IMAGE 34 — HAIR CARE — "Perfect Hair" (Pioneer) — REPLACE WITH images/Hair Care/34.png
      // { name: "Perfect Hair", brand: "Pioneer", desc: "Non-Sticky Hair Oil", img: "images/Hair Care/42.png" }
    ]
  };

  /* Maps each catalogue key to the grid element it renders into on
     products.html (id="grid-perfumes" etc). Safe on any page — every
     lookup is guarded, so pages without these grids are unaffected. */
  const CATEGORY_GRID_ID = {
    Perfumes: "grid-perfumes",
    Attar: "grid-attar",
    "Body Care": "grid-bodycare",
    "Hair Care": "grid-haircare"
  };

  const events = [
    ["exhibition-1.jpg", "International Expo", "Global Beauty Expo", "Showcased our fragrance and personal-care capabilities to international buyers."],
    ["exhibition-2.jpg", "Trade Fair", "Cosmetics & Fragrance Fair", "Presented our private-label and contract-manufacturing offerings to the trade."],
    ["exhibition-3.jpg", "B2B Summit", "Private Label Summit", "Connected with brand owners and startups launching their own product lines."],
    ["exhibition-4.jpg", "Ingredients Show", "Formulation & Ingredients", "Explored new herbal actives and formulation innovation with global suppliers."],
    ["exhibition-5.jpg", "Export Meet", "Global Export Trade Show", "Expanded our export partnerships across new international territories."],
    ["exhibition-6.jpg", "Industry Event", "Beauty & Wellness Congress", "Networked with the international beauty-manufacturing community."]
  ];

  const photos = [
    ["gallery-1.jpg", "At the Expo"], ["gallery-2.jpg", "Team & Partners"], ["exhibition-2.jpg", "Exhibition Booth"],
    ["gallery-3.jpg", "CSR Initiative"], ["gallery-5.jpg", "Global Meetings"], ["gallery-6.jpg", "Facility Tour"],
    ["machinery-lg.jpg", "Production Floor"], ["product-show.jpg", "Product Showcase"]
  ];
  const videos = [
    ["machinery-1.jpg", "Factory Tour"], ["machinery-lg.jpg", "Manufacturing Process"],
    ["product-1.jpg", "Product Showcase"], ["feature-privatelabel.jpg", "Private Label Story"]
  ];

  const press = [
    ["media-mag-1.jpg", "Featured in a leading cosmetics trade magazine for our private-label and contract-manufacturing capabilities.", "Cosmetic Magazine"],
    ["media-mag-2.jpg", "Recognised for excellence in herbal, fragrance and personal-care product manufacturing.", "Cosmetic Magazine"],
    ["media-1.jpg", "Covered for our international expo presence and growing global export footprint.", "Industry Press"],
    ["media-3.jpg", "Highlighted among India's fast-growing contract manufacturers for beauty & wellness.", "Trade Press"]
  ];

  const stories = [
    ["+400%", "revenue in 18 months", "From single SKU to full range", "A boutique fragrance brand scaled its catalogue with our private-label support and hit new markets.", "Aura Naturals"],
    ["3 months", "faster to market", "Launched ahead of schedule", "Our R&D and packaging teams compressed an entire skincare launch timeline for a new entrant.", "GlowLeaf Cosmetics"],
    ["12 → 45", "countries served", "Export-ready from day one", "Full compliance documentation let this brand expand internationally without regulatory friction.", "Pure&Co"]
  ];

  const $ = (s) => document.querySelector(s);

  /* ---------- Scroll reveal (local instance so this file has no
     hard dependency on main.js load order) ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  function markReveal() { document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealObs.observe(el)); }

  /* ---------- RENDER (every block guarded) ---------- */
  const timelineEl = $("#timeline");
  if (timelineEl) {
    timelineEl.innerHTML = timeline.map(([yr, title, desc]) =>
      `<li class="tl-item reveal"><span class="tl-dot"></span><span class="tl-year">${yr}</span><div class="tl-card"><h3>${title}</h3><p>${desc}</p></div></li>`
    ).join("");
  }

  const teamGrid = $("#teamGrid");
  if (teamGrid) {
    teamGrid.innerHTML = team.map(([img, role, name, bio]) =>
      `<article class="team-card reveal"><div class="team-avatar has-img"><img src="${img}" alt="${name}" class="ph mono" loading="lazy"></div><h3>${name}</h3><span class="team-role">${role}</span><p class="team-bio">${bio}</p></article>`
    ).join("");
  }

  const awardsGrid = $("#awardsGrid");
  if (awardsGrid) {
    awardsGrid.innerHTML = awards.map(([yr, title, org]) =>
      `<article class="award-card reveal"><div class="award-ico">${svg(TROPHY)}</div><div><span class="award-year">${yr}</span><h3>${title}</h3><p>${org}</p></div></article>`
    ).join("");
  }

  const eventsGrid = $("#eventsGrid");
  if (eventsGrid) {
    eventsGrid.innerHTML = events.map(([img, tag, name, desc]) =>
      `<article class="event-card reveal mono-card"><div class="event-img has-img"><img src="${img}" alt="${name}" class="ph mono" loading="lazy"></div><div class="event-body"><span class="event-tag">${tag}</span><h3>${name}</h3><p>${desc}</p></div></article>`
    ).join("");
  }

  const pressGrid = $("#pressGrid");
  if (pressGrid) {
    pressGrid.innerHTML = press.map(([img, quote, src]) =>
      `<article class="press-card reveal mono-card"><div class="press-logo has-img"><img src="${img}" alt="${src}" class="ph mono" loading="lazy"></div><div><p>${quote}</p><span class="press-src">${src}</span></div></article>`
    ).join("");
  }

  const storiesGrid = $("#storiesGrid");
  if (storiesGrid) {
    storiesGrid.innerHTML = stories.map(([metric, unit, title, desc, brand]) =>
      `<article class="story-card reveal"><div class="story-metric">${metric}<span>${unit}</span></div><h3>${title}</h3><p>${desc}</p><div class="story-brand">— ${brand}</div></article>`
    ).join("");
  }

  /* ---- Product catalogue grids (Perfumes / Attar / Body Care / Hair Care) ----
     Renders each category into its own grid on products.html. Guarded per
     grid, so this is a no-op on any page that doesn't have these sections. */
  Object.keys(PRODUCTS).forEach((cat) => {
    const gridEl = $("#" + CATEGORY_GRID_ID[cat]);
    if (!gridEl) return;
    gridEl.innerHTML = PRODUCTS[cat].map(({ name, brand, desc, img }) => {
      const label = brand ? `${brand} — ${name}` : name;
      return `<article class="pf-item reveal mono-card" data-cap="${label}" data-img="${img}" tabindex="0" role="button" aria-label="View ${label}">
             <div class="pf-thumb has-img"><img src="${img}" alt="${label}" class="ph mono" loading="lazy"></div>
             <div class="pf-cap">
               <strong>${name}</strong>
               <span>${desc}</span>
               <a class="pf-enquire" href="contact.html">Enquire for Manufacturing <span aria-hidden="true">→</span></a>
             </div>
           </article>`;
    }).join("");
    markReveal();
  });

  /* ---- Gallery tabs ---- */
  const photoGrid = $("#photoGrid");
  const videoGrid = $("#videoGrid");
  const galleryTabs = $("#galleryTabs");
  if (photoGrid && videoGrid && galleryTabs) {
    photoGrid.innerHTML = photos.map(([img, label], i) =>
      `<figure class="g-item has-img" data-type="photo" data-idx="${i}" tabindex="0" role="button" aria-label="View ${label}"><img src="${img}" alt="${label}" class="ph mono" loading="lazy"><span class="g-label">${label}</span></figure>`
    ).join("");
    videoGrid.innerHTML = videos.map(([img, label], i) =>
      `<figure class="g-item video has-img" data-type="video" data-idx="${i}" tabindex="0" role="button" aria-label="Play ${label}"><img src="${img}" alt="${label}" class="ph mono" loading="lazy"><span class="play"><span></span></span><span class="g-label">${label}</span></figure>`
    ).join("");
    galleryTabs.addEventListener("click", (e) => {
      const b = e.target.closest(".gtab");
      if (!b) return;
      galleryTabs.querySelectorAll(".gtab").forEach((t) => {
        const on = t === b;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on);
      });
      const showVideos = b.dataset.tab === "videos";
      photoGrid.hidden = showVideos;
      videoGrid.hidden = !showVideos;
    });
  }

  /* ---- Lightbox (photos, videos, portfolio items) ---- */
  const lb = $("#lightbox");
  if (lb) {
    const lbMedia = $("#lbMedia");
    const lbCap = $("#lbCaption");
    let lbSet = [], lbPos = 0;

    const openLb = (set, pos) => {
      lbSet = set; lbPos = pos;
      renderLb();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lbClose")?.focus();
    };
    const renderLb = () => {
      const item = lbSet[lbPos];
      lbMedia.innerHTML = `<img src="${item.img}" alt="${item.label}">` + (item.video ? '<span class="lb-play" aria-hidden="true"></span>' : '');
      lbCap.textContent = item.label + (item.sub ? " — " + item.sub : "");
    };
    const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; };
    const move = (d) => { lbPos = (lbPos + d + lbSet.length) % lbSet.length; renderLb(); };

    $("#lbClose")?.addEventListener("click", closeLb);
    $("#lbPrev")?.addEventListener("click", () => move(-1));
    $("#lbNext")?.addEventListener("click", () => move(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });

    const activateItem = (el) => {
      if (el.dataset.type === "photo") {
        openLb(photos.map(([img, label]) => ({ img, label })), +el.dataset.idx);
      } else if (el.dataset.type === "video") {
        openLb(videos.map(([img, label]) => ({ img, label, video: true, sub: "Video" })), +el.dataset.idx);
      } else if (el.classList.contains("pf-item")) {
        const parentGrid = el.closest(".portfolio-grid");
        if (!parentGrid) return;
        const items = Array.from(parentGrid.querySelectorAll(".pf-item"));
        openLb(items.map((n) => ({ img: n.dataset.img, label: n.dataset.cap })), items.indexOf(el));
      }
    };
    document.addEventListener("click", (e) => {
      if (e.target.closest(".pf-enquire")) return; // let the CTA link navigate normally
      const el = e.target.closest(".g-item, .pf-item");
      if (el) activateItem(el);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = e.target.closest(".g-item, .pf-item");
      if (el) { e.preventDefault(); activateItem(el); }
    });
  }

  /* ---- reveal for static copy blocks used across pages ---- */
  document.querySelectorAll(".section-head, .about-copy, .about-media, .founder-copy, .founder-photo").forEach((el) => el.classList.add("reveal"));
  markReveal();
})();
