/* ============================================================
   GalleryZoom (vanilla JS) — adapted from Explore-UI/gallery-zoom-transition.html
   Phase 1: vertical scroll -> horizontal card rail
   Phase 2: last card expands to fullscreen (clip-path)
   Phase 3: finale text + CTA in, then hold
   Usage: GalleryZoom(el, { heading, items, finale }); returns { destroy() }
   ============================================================ */
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smoothstep = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1); return t * t * (3 - 2 * t); };
const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const pad2 = n => String(n).padStart(2, '0');

function GalleryZoom(root, options = {}) {
  const c = {
    heading: '', items: [], finale: {},
    smoothing: 0.11, parallax: 0.15, scaleDrop: 0.08, radius: 22,
    clearDistance: 0.35, expandDistance: 1.0, holdDistance: 0.6, scrimStrength: 0.55,
    ...options
  };
  const last = c.items[c.items.length - 1];
  const fin = { eyebrow: '', title: '', text: '', ctaHref: '', ctaLabel: '', ...c.finale };

  /* ---- build DOM ---- */
  root.classList.add('gz');
  const imgTag = (it, cls, i) => `<img class="${cls}" src="${it.src}" alt="${it.alt || ''}" draggable="false" decoding="async" ${i > 1 && i < c.items.length - 1 ? 'loading="lazy"' : ''}>`;
  const capHTML = (it, i) => `<small>${pad2(i + 1)}</small><h3>${it.title}</h3><p>${it.text || ''}</p>`;

  root.innerHTML = `
    <div class="gz-track"><div class="gz-stage">
      <div class="gz-head"><span>${c.heading}</span><span class="gz-count"></span></div>
      <div class="gz-rail">${c.items.map((it, i) => `
        <figure class="gz-card" style="--g:${it.gradient || '#1d2740'}">${imgTag(it, 'gz-img', i)}
          <div class="gz-shade"></div><figcaption class="gz-cap">${capHTML(it, i)}</figcaption>
        </figure>`).join('')}
      </div>
      <div class="gz-bar"><i></i></div>
      <div class="gz-hx" style="--g:${last.gradient || '#1d2740'}">
        ${imgTag(last, 'gz-hx-media', c.items.length - 1)}
        <div class="gz-hx-card"><div class="gz-shade"></div><div class="gz-cap">${capHTML(last, c.items.length - 1)}</div></div>
        <div class="gz-hx-scrim"></div>
        <div class="gz-hx-over"><small>${fin.eyebrow}</small><h2>${fin.title}</h2><p>${fin.text}</p>${fin.ctaHref ? `<a class="gz-cta" href="${fin.ctaHref}">${fin.ctaLabel} <i class="fas fa-arrow-right"></i></a>` : ''}</div>
      </div>
    </div></div>`;

  const $ = s => root.querySelector(s);
  const track = $('.gz-track'), stage = $('.gz-stage'), rail = $('.gz-rail'), head = $('.gz-head'), count = $('.gz-count'),
        barWrap = $('.gz-bar'), bar = $('.gz-bar i'),
        hx = $('.gz-hx'), hxMedia = $('.gz-hx-media'), hxCard = $('.gz-hx-card'), hxScrim = $('.gz-hx-scrim'),
        hxEyebrow = $('.gz-hx-over small'), hxTitle = $('.gz-hx-over h2'), hxText = $('.gz-hx-over p'),
        hxCta = $('.gz-hx-over .gz-cta');
  const cards = [...root.querySelectorAll('.gz-card')].map(el => ({ el, img: el.querySelector('.gz-img'), left: 0, w: 0 }));
  // failed image -> hide, gradient fallback shows
  root.querySelectorAll('img').forEach(im => im.addEventListener('error', () => { im.style.display = 'none'; }));

  /* ---- render: write DOM only when value changed ---- */
  const prev = {};
  const write = (k, el, prop, val) => { if (prev[k] !== val) { prev[k] = val; el.style[prop] = val; } };
  const f = (n, d = 3) => n.toFixed(d);

  let vw = 1, stageH = 1, maxShift = 1, clearSpan = 1, expandSpan = 1, L = 1, trackTop = 0, hxL = 0, hxT = 0, sc0 = 0.6, lastP2 = 0;

  function render(s) {
    const y = s * L;
    const p1 = clamp(y / maxShift, 0, 1);
    const pc = clamp((y - maxShift) / clearSpan, 0, 1);
    const p2 = clamp((y - maxShift - clearSpan) / expandSpan, 0, 1);

    /* phase 1: horizontal rail + parallax + scale + counter */
    const x = -p1 * maxShift;
    write('rail', rail, 'transform', `translate3d(${f(x, 1)}px,0,0)`);
    write('bar', bar, 'transform', `scaleX(${f(p1, 4)})`);
    let best = 0, bestD = Infinity;
    cards.forEach((k, i) => {
      const d = (k.left + k.w / 2 + x - vw / 2) / vw;
      const ad = Math.abs(d);
      if (ad < bestD) { bestD = ad; best = i; }
      if (ad > 1.3) return;
      write('i' + i, k.img, 'transform', `translate3d(${f(-clamp(d, -1, 1) * c.parallax * k.w, 1)}px,0,0)`);
      const isLast = i === cards.length - 1;
      const push = isLast ? 0 : -easeInOutCubic(pc) * vw * 0.6;
      write('s' + i, k.el, 'transform', `translate3d(${f(push, 1)}px,0,0) scale(${f(1 - c.scaleDrop * Math.min(1, ad))})`);
      if (!isLast) write('o' + i, k.el, 'opacity', f(1 - smoothstep(0, 0.85, pc)));
    });
    const fo = 1 - smoothstep(0, 0.7, pc);
    write('headOp', head, 'opacity', f(fo));
    write('barOp', barWrap, 'opacity', f(fo));
    const label = `${pad2(best + 1)} / ${pad2(cards.length)}`;
    if (prev.count !== label) { prev.count = label; count.textContent = label; }

    /* phase 2 & 3: only computed when active */
    if (p2 <= 0 && lastP2 <= 0) return;
    lastP2 = p2;

    write('hxv', hx, 'visibility', p2 > 0 ? 'visible' : 'hidden');

    const ef = easeInOutCubic(p2);
    write('hxclip', hx, 'clipPath',
      `inset(${f(hxT * (1 - ef), 1)}px ${f(hxL * (1 - ef), 1)}px ${f(hxT * (1 - ef), 1)}px ${f(hxL * (1 - ef), 1)}px round ${f(c.radius * (1 - ef), 1)}px)`);
    write('hxzoom', hxMedia, 'transform', `scale(${f(sc0 + (1 - sc0) * easeOutCubic(p2), 4)})`);
    write('hxcard', hxCard, 'opacity', f(1 - smoothstep(0, 0.2, p2)));
    write('scrim', hxScrim, 'opacity', f(c.scrimStrength * smoothstep(0.45, 1, p2)));

    const e1 = smoothstep(0.62, 0.86, p2), e2 = smoothstep(0.7, 0.94, p2), e3 = smoothstep(0.8, 1, p2);
    write('eyO', hxEyebrow, 'opacity', f(e1));
    write('eyT', hxEyebrow, 'transform', `translate3d(0,${f(16 * (1 - e1), 1)}px,0)`);
    write('tiO', hxTitle, 'opacity', f(e2));
    write('tiT', hxTitle, 'transform', `translate3d(0,${f(28 * (1 - e2), 1)}px,0)`);
    write('txO', hxText, 'opacity', f(e3));
    write('txT', hxText, 'transform', `translate3d(0,${f(20 * (1 - e3), 1)}px,0)`);
    if (hxCta) {
      write('ctO', hxCta, 'opacity', f(e3));
      write('ctT', hxCta, 'transform', `translate3d(0,${f(20 * (1 - e3), 1)}px,0)`);
    }
  }

  /* ---- sizes & positions cached ---- */
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cover = (bw, bh, iw, ih) => Math.max(bw / iw, bh / ih);

  function measure() {
    vw = stage.clientWidth; stageH = stage.offsetHeight;
    maxShift = Math.max(1, rail.scrollWidth - vw);
    clearSpan = stageH * Math.max(0.05, c.clearDistance);
    expandSpan = stageH * Math.max(0.1, c.expandDistance);
    L = maxShift + clearSpan + expandSpan + stageH * Math.max(0, c.holdDistance);
    const th = `${stageH + L}px`;
    if (track.style.height !== th) track.style.height = th;
    trackTop = track.getBoundingClientRect().top + window.scrollY;
    cards.forEach(k => { k.left = k.el.offsetLeft; k.w = k.el.offsetWidth; });

    // zoom layer starts EXACTLY at the last card's rect
    const lc = cards[cards.length - 1], cw = lc.w, ch = lc.el.offsetHeight;
    hxL = (vw - cw) / 2; hxT = (stageH - ch) / 2;
    Object.assign(hxCard.style, { left: hxL + 'px', top: hxT + 'px', width: cw + 'px', height: ch + 'px' });
    const iw = lc.img.naturalWidth, ih = lc.img.naturalHeight;
    sc0 = iw && ih ? cover(cw * 1.3, ch, iw, ih) / cover(vw, stageH, iw, ih) : Math.max((cw * 1.3) / vw, ch / stageH);
  }
  const readProgress = () => clamp((window.scrollY - trackTop) / L, 0, 1);

  /* ---- animation loop: frame-rate independent, self-stopping ---- */
  let raf = 0, lastT = 0, cur = 0, target = 0, visible = true;
  function tick(t) {
    const dt = lastT ? Math.min((t - lastT) / 1000, 0.05) : 1 / 60;
    lastT = t;
    cur += (target - cur) * (1 - Math.exp(-dt / c.smoothing));
    if (Math.abs(target - cur) * L < 0.3) { cur = target; raf = 0; lastT = 0; render(cur); return; }
    render(cur);
    raf = requestAnimationFrame(tick);
  }
  function onScroll() {
    if (!visible) return;
    target = readProgress();
    if (c.smoothing <= 0 || reduceMotion) { cur = target; render(cur); return; }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function sync() { measure(); target = cur = readProgress(); render(cur); }

  /* ---- observers ---- */
  sync();
  window.addEventListener('scroll', onScroll, { passive: true });
  let syncQ = 0;
  const ro = new ResizeObserver(() => { if (!syncQ) syncQ = requestAnimationFrame(() => { syncQ = 0; sync(); }); });
  ro.observe(stage); ro.observe(rail); ro.observe(document.body);
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) sync(); }, { rootMargin: '200px' });
  io.observe(root);
  cards[cards.length - 1].img.addEventListener('load', sync);

  return { destroy() { if (raf) cancelAnimationFrame(raf); if (syncQ) cancelAnimationFrame(syncQ); window.removeEventListener('scroll', onScroll); ro.disconnect(); io.disconnect(); } };
}

/* ================= Init on portfolio site ================= */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('gz');
  if (!el) return;
  GalleryZoom(el, {
    heading: 'Selected work, one direction',
    items: [
      { src: 'assets/jarslab.png',   alt: 'JarsLab',       title: 'JarsLab',        text: 'Homelab & self-hosted solutions, dark cyberpunk landing.', gradient: 'linear-gradient(135deg,#0f2f3f,#1d5a6b)' },
      { src: 'assets/paiprofesi.png', alt: 'PAI Profesi',  title: 'PAI Profesi',    text: 'Interactive PAI learning media with self-assessment.',    gradient: 'linear-gradient(135deg,#3f2f10,#6b5a1d)' },
      { src: 'assets/pai-akhlak.png', alt: 'Akhlak Terpuji', title: 'Akhlak Terpuji', text: 'Islamic character learning platform for SD/MI.',       gradient: 'linear-gradient(135deg,#3f1420,#6b2a3a)' },
      { src: 'assets/kopalan.png',   alt: 'Kopalan',       title: 'Kopalan Studio', text: 'Creative studio company profile: UI/UX, web, branding.', gradient: 'linear-gradient(135deg,#2a1440,#4a2a6b)' },
      { src: 'assets/DKM UAB.png',   alt: 'DKM Ulul Albaab', title: 'DKM Ulul Albaab', text: 'Campus org website, modern & responsive, 500+ users.', gradient: 'linear-gradient(135deg,#12303b,#2b5a6b)' },
      { src: 'assets/Tesdia.png',    alt: 'TesDia',        title: 'TesDia Bandung', text: 'Health testing service with online booking, 1K+ visits.', gradient: 'linear-gradient(135deg,#103f28,#2a6b47)' },
      { src: 'assets/orbit.png',     alt: 'Orbit Mandiri', title: 'Orbit Mandiri',  text: 'IT company profile with modern animation and SEO.',      gradient: 'linear-gradient(135deg,#3f2410,#6b451d)' },
    ],
    finale: {
      eyebrow: 'Keep exploring',
      title: 'The Solar Showcase',
      text: 'All of these projects — plus the homelab and open-source work — live in one solar system. Scroll into orbit.',
      ctaHref: 'showcase.html',
      ctaLabel: 'Enter the Solar Showcase'
    }
  });
});
