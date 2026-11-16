# Orbital Navbar + Solar Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the top navbar with a draggable orbital nav widget (with theme sub-orbit) and add a solar-system project showcase page.

**Architecture:** Static HTML site. Orbit widget CSS/JS inlined into `css/style.css` + `js/script.js`, markup in `index.html`. Showcase = standalone fork of `/mnt/data_d/Downloads/orbitral-theme.html` with two planet rings.

**Tech Stack:** Vanilla HTML/CSS/JS, Font Awesome 6.5.1 (already loaded), Google Fonts (already loaded). No build step, no test framework — verification is manual browser checks + curl.

**Spec:** `docs/superpowers/specs/2026-11-16-orbital-navbar-showcase-design.md`

## Global Constraints

- DO NOT touch the blackhole particle effect ("Tersedot ke blackhole") — `js/script.js` lines ~147-340 (Global Particles block) and its index.html container. No edits.
- No new dependencies, no CDN additions beyond what index.html already loads.
- Reuse existing `window.setTheme(themeName)` (js/script.js:7) — theme names: `light`, `dark`, `orange`, `sea`.
- Orbit widget code style matches orbitral-navbar-fix.html (CSS custom props `--open-rot`, `--manual-rot`, `--i`, `--x`, `--y`).
- Keep `window.smoothScroll` / existing scroll behavior working (html has `scroll-smooth` class via setTheme).

## Review Focus

1. Mobile (~390px viewport): orbit widget must not overflow screen on open — clamp position on open if needed; verify drag + open work with touch.
2. Click vs drag disambiguation: a click (no move) toggles orbit; a drag moves widget. Verify both after integration.
3. Sub-orbit z-order: theme dots must render above main orbit items (outer ring radius > main radius).
4. Orbit widget over footer/contact form: pointer-events of closed widget must not block the contact form or links beneath (80px bubble only).
5. Removed-code residue: `#navbar.scrolled` CSS, `.nav-link`, `.drawer-link`, `#drawer-socials`, `#footer-socials` JS references must not throw console errors after removal.

---

### Task 1: Remove old navbar + drawer

**Files:**
- Modify: `index.html` (lines 133-241: `<nav id="navbar">` block + mobile drawer block)
- Modify: `js/script.js` (lines 683-748: `initNavbar`, `initNavActive`, `initMobileMenu`; lines 114-116 calls)
- Modify: `css/style.css` (lines ~198-223: `#navbar.scrolled`, `.nav-link` rules)

**Interfaces:**
- Consumes: nothing
- Produces: none. `#navbar` element and all `.nav-link` / `.drawer-link` elements gone; JS init calls gone.

- [ ] **Step 1:** Delete index.html lines 133-241 (navbar + drawer). Keep `<!-- Scroll Progress -->` div (line 131) and hero section (line 243+).
- [ ] **Step 2:** In js/script.js: delete `initNavbar()`, `initNavActive()`, `initMobileMenu()` functions and their 3 calls at lines 114-116. Leave blackhole/Global Particles block untouched.
- [ ] **Step 3:** In css/style.css: delete `#navbar.scrolled` and `.nav-link` rules (~lines 198-223).
- [ ] **Step 4:** Verify: open index.html in browser → no console errors, page renders, scroll-progress bar works, theme still applied from localStorage.
- [ ] **Step 5:** Commit `refactor: remove top navbar and mobile drawer (replaced by orbital nav)`.

### Task 2: Add orbital nav widget (main ring)

**Files:**
- Modify: `index.html` (insert widget markup before `</body>`)
- Modify: `css/style.css` (append orbit widget styles)
- Modify: `js/script.js` (append widget JS in an `initOrbitalNav()` called from the DOMContentLoaded block)

**Interfaces:**
- Consumes: `window.setTheme(name)` (Task 3), anchor sections `#home`, `#about`, `#projects`, `#contact`.
- Produces: DOM structure `#orbitalNav` (class `orbital-nav`) with `#dragRing`, `.orbit-track` containing 4 `.orbit-item`s + 1 `#themeItem.orbit-item.orbit-item--theme`, and `#triggerBtn`. `initOrbitalNav()`.

- [ ] **Step 1:** Copy styles from orbitral-navbar-fix.html `<style>` (`.orbital-nav` through `.orbit-item:hover` rules) into css/style.css, adapted: remove `body` background rule and `.ambient-glow` (site has its own bg/blackhole); keep `position: fixed` widget defaults: `transform: translate3d(calc(100vw - 120px), calc(100vh - 120px), 0)`.
- [ ] **Step 2:** Insert markup before `</body>`: widget with 4 nav items (Home `fa-house`, About `fa-user`, Projects `fa-project-diagram`, Contact `fa-paper-plane`, `data-target="#home"` etc.) + theme item (`fa-palette`, id `themeItem`). Labels via `<span>`.
- [ ] **Step 3:** Port JS from orbitral-navbar-fix.html sections 1, 2, 4, 5 (orbit positions RADIUS=115, drag via trigger, click item = navigate, resize clamp). Item click: `document.querySelector(target).scrollIntoView({behavior:'smooth'})` + close orbit. Wrap in `initOrbitalNav()`; call it in the DOMContentLoaded init block (js/script.js ~line 114 area).
- [ ] **Step 4:** Verify in browser: widget sits bottom-right; drag moves + clamps; click opens/closes; click nav item scrolls to section; works on narrow viewport (~390px, DevTools device mode) with touch.
- [ ] **Step 5:** Commit `feat: add draggable orbital navigation widget`.

### Task 3: Theme sub-orbit (second ring)

**Files:**
- Modify: `css/style.css` (sub-orbit styles)
- Modify: `js/script.js` (sub-orbit logic in `initOrbitalNav`)

**Interfaces:**
- Consumes: `#themeItem`, `window.setTheme(name)` from Task 2's structure.
- Produces: `.theme-sub-orbit` container with 4 `.theme-dot` buttons (light `#f5f5f4`, dark `#0f172a`, orange `#f97316`, sea `#14b8a6`).

- [ ] **Step 1:** Add markup: `.theme-sub-orbit` (absolute, centered on widget, radius ~190px via `--sub-x/--sub-y` per dot) containing 4 `.theme-dot` buttons, each `data-theme` set. Rendered inside `#orbitalNav` so it moves with the widget.
- [ ] **Step 2:** CSS: dots hidden (scale 0) by default; `.orbital-nav.themes-open .theme-dot` → scale 1 at their `--sub-x/--sub-y` positions (4 points at 90° spacing), transition with bounce easing.
- [ ] **Step 3:** JS in `initOrbitalNav`: click `#themeItem` → toggle class `themes-open`; click dot → `setTheme(dot.dataset.theme)` + remove `themes-open`; click on document outside widget → remove `themes-open`.
- [ ] **Step 4:** Verify: theme icon opens second ring of 4 colored dots; each applies its theme (site colors change); closes after selection and on outside click; z-order correct (dots above main items).
- [ ] **Step 5:** Commit `feat: theme sub-orbit switcher in orbital nav`.

### Task 4: Solar showcase page + site links

**Files:**
- Create: `showcase.html` (fork of `/mnt/data_d/Downloads/orbitral-theme.html`)
- Modify: `index.html` (Projects section header: add showcase link button; footer: add link)
- Modify: `robots.txt` / `sitemap.xml` only if trivial (skip if messy — YAGNI)

**Interfaces:**
- Consumes: project data verified in spec (15 projects: 10 inner-ring apps, 5 outer-ring repos/homelab).
- Produces: `showcase.html`, linked from index.html.

- [ ] **Step 1:** Copy orbitral-theme.html → showcase.html. Change `<title>` to "Solar Showcase — Azhar Muttaqien" and `lang="en"`.
- [ ] **Step 2:** Replace PLANETS config with two-ring structure: inner ring (radius factor ~0.30) = 10 web apps: JarsLab 🧪 `#4ecdc4` https://jarslab.dpdns.org; PAI Profesi 📖 `#ffd93d` https://paiprofesi.netlify.app; Akhlak Terpuji 🕌 `#ff6b6b` https://pai-akhlakterpuji.netlify.app; Kopalan 🎨 `#a855f7` https://kopalanusantaratest.netlify.app; DKM UAB 🏫 `#60a5fa` https://ulul-albaab-website.vercel.app/; TesDia 🩺 `#34d399` https://foregord.github.io/; Orbit Mandiri 💻 `#fb923c` https://orbitmandiricomputer.biz.id/; WWM ⚔️ `#f472b6` https://lastvillain.vercel.app; RW16 Ciwaruga 🏘️ `#22d3ee` https://rw16-ciwaruga-one.vercel.app; Araya Attendance 📋 `#c084fc` https://fe-araya-bussiness-attendace-module.vercel.app. Outer ring (radius factor ~0.47) = 5: Immich 📸 `#818cf8` https://immich.azharmtq.my.id; Nextcloud ☁️ `#0ea5e9` https://nextcloud.azharmtq.my.id; jarsWAF 🛡️ `#f87171` https://github.com/Azhar457/jarswaf; 9router 🔀 `#a78bfa` https://github.com/Azhar457/9router; Netools 🛰️ `#4ade80` https://github.com/Azhar457/Netools. Each planet: click → `window.open(url, '_blank', 'noopener')` + ripple. Second orbiters array for outer ring, same render loop, slight speed offset (outer ring slower, 0.6×).
- [ ] **Step 3:** Sun click → `location.href = 'index.html'` (was pause/play). Add hint text bottom: "Click a planet to visit — Sun returns home". Keep speed controls for both rings.
- [ ] **Step 4:** index.html: in Projects section header (after the gradient divider, ~line 494), add centered link button: `🪐 Explore the Solar Showcase →` → `showcase.html`. Add same link in footer.
- [ ] **Step 5:** Verify: `curl -sI` each of 14 URLs returns 200/3xx; open showcase.html — planets orbit, labels on hover, click opens correct URL in new tab, reduced-motion pauses; links from index.html work.
- [ ] **Step 6:** Commit `feat: add solar showcase page with 15 projects + site links`.

### Task 5: Final integration check + push

**Files:** none changed (verification only)

- [ ] **Step 1:** Full browser pass on index.html: orbit drag/open/navigate, theme sub-orbit all 4 themes, contact form focusable/clickable around widget, blackhole effect intact (click anywhere → particle suck effect works).
- [ ] **Step 2:** Mobile device-mode pass (~390×844): orbit usable, no overlap blocking content.
- [ ] **Step 3:** `git push origin main` (GitHub Pages deploys automatically).
- [ ] **Step 4:** Confirm live at https://azhar457.github.io/ after deploy.
