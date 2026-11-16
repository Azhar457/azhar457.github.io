# Design: Orbital Navbar + Solar Showcase Page

Date: 2026-11-16
Site: azhar457.github.io (static HTML portfolio, GitHub Pages)

## Summary

Two changes, approved by user:

1. Replace the top navbar on `index.html` with a draggable orbital navigation
   widget (based on `/mnt/data_d/Downloads/orbitral-navbar-fix.html`), with a
   nested second orbit ring for the theme switcher.
2. Add a new `showcase.html` — solar-system project showcase (fork of
   `/mnt/data_d/Downloads/orbitral-theme.html`) where planets are the site's
   real projects and clicking a planet opens its live URL.

No new dependencies. No external deploy (GitHub Pages only).

## Part 1 — Navbar replacement (index.html)

### Removed
- Desktop nav links (Home/About/Projects/Contact), theme dots row, mobile
  hamburger button, mobile drawer (~100 lines HTML in index.html).
- Navbar-related JS in `js/script.js`: scrollspy targeting `.nav-link`,
  drawer open/close logic, navbar scroll shrink/hide behavior.

### Added (Approach A: inlined into existing files)
- Orbit widget CSS → `css/style.css`; orbit widget JS → `js/script.js`.
  Markup inline in index.html (single widget instance).
- Widget: 80px draggable bubble, default position bottom-right
  (`translate3d(calc(100vw - 120px), calc(100vh - 120px), 0)`), z-index above
  page content. Behavior copied from orbitral-navbar-fix.html: pointerdown
  drag via center trigger, click (no drag) toggles open, orbit ring rotation
  via drag-ring, clamp on resize, bounce easing.
- Main orbit items (4): Home, About, Projects, Contact — anchor scroll
  (`#home`, `#about`, `#projects`, `#contact`) with smooth scroll; closes
  orbit on click.
- Theme item (1): palette icon in the main orbit. Clicking it opens a
  **second orbit ring** (larger radius, concentric with the widget) containing
  4 color dots: light, dark, orange, sea — matching the removed theme dots.
  Click a dot → call existing global `setTheme(name)` → close sub-orbit.
  Click theme icon again or anywhere outside → close sub-orbit.
- Widget works on mobile via pointer events (touch); hamburger/drawer is gone.

### Reused existing code
- `setTheme()` global in js/script.js — unchanged.
- Google Fonts + Font Awesome already loaded by index.html.

## Part 2 — Solar showcase page (showcase.html)

- Fork of orbitral-theme.html. Keeps: starfield, sun pulse, parallax,
  pause/speed controls, reduced-motion support.
- Data: verified projects, hardcoded as PLANETS config (title, emoji icon,
  color, URL). Sun = link back to `index.html`.
- Two rings (inner/outer, like a real solar system):
  - **Inner ring — deployed web apps (10):** JarsLab, PAI Profesi, Akhlak
    Terpuji, Kopalan, TesDia, Orbit Mandiri, DKM UAB, WWM
    (lastvillain.vercel.app), RW16 Ciwaruga (rw16-ciwaruga-one.vercel.app),
    Araya Business Attendance Module
    (fe-araya-bussiness-attendace-module.vercel.app)
  - **Outer ring — homelab & open source (5):** Immich, Nextcloud, jarsWAF
    (github.com/Azhar457/jarswaf, Rust), 9router
    (github.com/Azhar457/9router, fork), Netools
    (github.com/Azhar457/Netools, Python)
- Planet click → open project URL in new tab + existing ripple effect.
  Planet labels show project titles on hover (already in the fork source).
- Self-contained single file (no Tailwind, no AOS); emoji icons, no icon CDN.
- Project list verified against `/mnt/data_d/Projects` (wwm, rw16-ciwaruga,
  jarswaf, Netools exist locally with matching stack) and user-provided
  Vercel/GitHub listings.

## Protected content (do not touch)

- The blackhole particle effect ("Tersedot ke blackhole") in index.html stays
  exactly as-is. No edits to its markup, CSS, or JS.

### Linking
- Small "Solar Showcase" button/link in the Projects section header on
  index.html, plus a footer link.

## Testing

- Open index.html locally: orbit drag, open/close, anchor scroll, theme
  sub-orbit open/select/close, all 4 themes apply, resize clamp works.
- Narrow viewport (~390px): widget usable with touch, no overlap issues.
- showcase.html: all 10 planet URLs resolve (manually verified list), speed
  controls work, reduced-motion pauses orbit.
- Verify removed navbar code leaves no console errors (scroll-progress bar
  and other sections still function).

## Out of scope (YAGNI)

- Active-section highlighting (nav is hidden when closed; not needed).
- Deploying to Netlify/Vercel; credentials offered by user are not needed.
- Using UI-Playground-beta assets (the two downloaded HTML files suffice).
