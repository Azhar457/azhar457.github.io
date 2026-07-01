/* ══════════════════════════════════════════════════════════════
   PORTFOLIO JS — Azhar Muttaqien
   Enhanced: particles, 3D tilt, typewriter, modal, theme, counter
   ══════════════════════════════════════════════════════════════ */

/* ── Data ────────────────────────────────────────────────────── */
const SKILLS = [
  // Languages & Scripting
  { name: 'Python',      icon: 'devicon:python',      color: '#3776AB', group: 'languages' },
  { name: 'JavaScript',  icon: 'devicon:javascript',  color: '#F7DF1E', group: 'languages' },
  { name: 'TypeScript',  icon: 'devicon:typescript',  color: '#3178C6', group: 'languages' },
  { name: 'PHP',         icon: 'devicon:php',         color: '#777BB4', group: 'languages' },
  { name: 'Dart',        icon: 'devicon:dart',        color: '#0175C2', group: 'languages' },
  { name: 'Bash',        icon: 'devicon:bash',        color: '#4EAA25', group: 'languages' },
  { name: 'HTML5',       icon: 'devicon:html5',       color: '#E34F26', group: 'languages' },
  { name: 'CSS3',        icon: 'devicon:css3',        color: '#1572B6', group: 'languages' },

  // Frameworks & Runtimes
  { name: 'React',       icon: 'devicon:react',       color: '#61DAFB', group: 'frameworks' },
  { name: 'Svelte',      icon: 'devicon:svelte',      color: '#FF3E00', group: 'frameworks' },
  { name: 'Node.js',     icon: 'devicon:nodejs',      color: '#339933', group: 'frameworks' },
  { name: 'Flutter',     icon: 'devicon:flutter',     color: '#02569B', group: 'frameworks' },
  { name: 'Tailwind CSS',icon: 'devicon:tailwindcss', color: '#06B6D4', group: 'frameworks' },
  { name: 'Bootstrap',   icon: 'devicon:bootstrap',   color: '#7952B3', group: 'frameworks' },

  // Databases & Web
  { name: 'PostgreSQL',  icon: 'devicon:postgresql',  color: '#4169E1', group: 'databases' },
  { name: 'MySQL',       icon: 'devicon:mysql',       color: '#4479A1', group: 'databases' },
  { name: 'MariaDB',     icon: 'logos:mariadb-icon',  color: '#003545', group: 'databases' },
  { name: 'SQLite',      icon: 'devicon:sqlite',      color: '#07405E', group: 'databases' },
  { name: 'Nginx',       icon: 'devicon:nginx',       color: '#009639', group: 'databases' },

  // DevOps & Infrastructure
  { name: 'Docker',      icon: 'devicon:docker',      color: '#2496ED', group: 'devops' },
  { name: 'Git',         icon: 'devicon:git',         color: '#F05033', group: 'devops' },
  { name: 'Ansible',     icon: 'devicon:ansible',     color: '#EE0000', group: 'devops' },
  { name: 'Proxmox',     icon: 'logos:proxmox',       color: '#E5702B', group: 'devops' },
  { name: 'Cloudflare',  icon: 'devicon:cloudflare',  color: '#F38020', group: 'devops' },
  { name: 'Wireshark',   icon: 'logos:wireshark',     color: '#1679A7', group: 'devops' },

  // Platforms
  { name: 'Linux',       icon: 'devicon:linux',       color: '#FCC624', group: 'platforms' },
  { name: 'Windows',     icon: 'devicon:windows11',    color: '#0078D6', group: 'platforms' },
  { name: 'Ubuntu',      icon: 'devicon:ubuntu',      color: '#E95420', group: 'platforms' },
  { name: 'Kali Linux',  icon: 'simple-icons:kalilinux', color: '#557C94', group: 'platforms' },
  { name: 'Rocky Linux', icon: 'simple-icons:rockylinux', color: '#10B981', group: 'platforms' },
];

const SKILL_GROUP_META = {
  languages:   { label: 'Languages & Scripting',   icon: 'fas fa-code' },
  frameworks:  { label: 'Frameworks & Runtimes',   icon: 'fas fa-layer-group' },
  databases:   { label: 'Databases & Web Servers', icon: 'fas fa-database' },
  devops:      { label: 'DevOps & Infrastructure', icon: 'fas fa-cloud' },
  platforms:   { label: 'Platforms & OS',          icon: 'fas fa-desktop' },
};

const PROJECTS = [
  { title:'DKM Ulul Albaab UNPAS', description:'Website organisasi DKM Ulul Albaab Universitas Pasundan dengan desain modern dan responsive.', tech:['HTML','CSS','JavaScript','Responsive'], url:'https://ulul-albaab-website.vercel.app/', image:'assets/DKM UAB.png', category:'web', stats:'Active Users: 500+' },
  { title:'TesDia Bandung', description:'Platform layanan tes kesehatan dengan interface user-friendly dan sistem booking online.', tech:['HTML','CSS','JavaScript','UI/UX'], url:'https://foregord.github.io/', image:'assets/Tesdia.png', category:'web', stats:'Monthly Visits: 1K+' },
  { title:'RT/RW Information System', description:'Sistem informasi manajemen warga berbasis web untuk administrasi lingkungan yang efisien.', tech:['HTML','CSS','JavaScript','LocalStorage'], url:'https://azhar457.github.io/', image:'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80', category:'web', stats:'Data Processed: 10K+' },
  { title:'Orbit Mandiri Computer', description:'Company profile profesional dengan animasi modern dan optimasi SEO untuk bisnis IT.', tech:['HTML','CSS','JavaScript','SEO'], url:'https://orbitmandiricomputer.biz.id/', image:'assets/orbit.png', category:'web', stats:'Client Satisfaction: 100%' },
  { title:'Immich Photo Server', description:'Self-hosted photo & video backup solution dengan AI-powered organization.', tech:['Docker','Immich','PostgreSQL','Cloudflare Tunnel'], url:'https://immich.azharmtq.my.id', category:'homelab', gradient:'from-indigo-500 via-purple-500 to-cyan-500', icon:'fas fa-cloud', stats:'Photos Backed Up: 50K+' },
  { title:'Nextcloud Hub', description:'Private cloud infrastructure dengan collaborative editing dan file sync.', tech:['Docker','Nextcloud','MariaDB','Redis'], url:'https://nextcloud.azharmtq.my.id', category:'homelab', gradient:'from-purple-600 via-pink-500 to-orange-400', icon:'fas fa-server', stats:'Storage Managed: 2TB+' },
];

const SOCIAL_LINKS = [
  { icon:'fab fa-github',      href:'https://github.com/azhar457',                                   label:'GitHub',    color:'#333' },
  { icon:'fab fa-linkedin',    href:'https://www.linkedin.com/in/azhar-muttaqien-a74a69237/',         label:'LinkedIn',  color:'#0a66c2' },
  { icon:'fab fa-facebook-f',  href:'https://www.facebook.com/azhar.sys.10',                          label:'Facebook',  color:'#1877f2' },
  { icon:'fab fa-instagram',   href:'https://www.instagram.com/azharmtq/',                            label:'Instagram', color:'#e4405f' },
  { icon:'fab fa-youtube',     href:'https://www.youtube.com/@Just-Save-It-bro',                      label:'YouTube',   color:'#ff0000' },
  { icon:'fab fa-tiktok',      href:'https://www.tiktok.com/@azhar.fauzi234',                         label:'TikTok',    color:'#000000' },
];

const TITLES = ['Web Developer', 'Infrastructure Engineer', 'Security Researcher', 'CS Student'];

/* ── DOM Ready ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initScrollProgress();
  initParticles();
  initTypewriter();
  renderSkillsGrid();
  renderProjects('all');
  renderSocials();
  initCounter();
  initNavbar();
  initNavActive();
  initMobileMenu();
  initFilters();
  initAboutProgress();
  initProjectModal();
  initTiltCards();
  document.getElementById('year').textContent = new Date().getFullYear();
  // Fade out loader
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.add('hidden');
  }, 300);
});

/* ── AOS ─────────────────────────────────────────────────────── */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, mirror: false });
  }
}

/* ── Scroll Progress Bar ─────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrollTop / docHeight) * 100}%`;
  });
}

/* ── Particles (fallback starfield via canvas) ───────────────── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const COUNT = 120;

  function resize() {
    const hero = document.getElementById('home');
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.x += s.dx; s.y += s.dy;
      if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o})`;
      ctx.fill();
    });
    // connections
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
}

/* ── Typewriter ──────────────────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;
  let titleIdx = 0, charIdx = 0, deleting = false;
  let cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.after(cursor);

  function tick() {
    const current = TITLES[titleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % TITLES.length;
        charIdx = 0;
      }
      setTimeout(tick, 40);
    }
  }
  tick();
}

/* ── Skills Grid (icon cards, grouped) ───────────────────────── */
function renderSkillsGrid() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const groups = {};
  SKILLS.forEach(s => {
    if (!groups[s.group]) groups[s.group] = [];
    groups[s.group].push(s);
  });

  // Render skill icon using Iconify
  function skillIcon(s) {
    return `<iconify-icon icon="${s.icon}" style="color:${s.color}" width="28" height="28"></iconify-icon>`;
  }

  let html = '';
  for (const [key, skills] of Object.entries(groups)) {
    const meta = SKILL_GROUP_META[key];
    html += `<div class="mb-6 p-2">
      <div class="flex items-center gap-2 mb-3">
        <i class="${meta.icon} text-sm text-indigo-400"></i>
        <span class="text-xs font-semibold tracking-wider uppercase text-slate-500">${meta.label}</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">`;
    skills.forEach(s => {
      html += `<div class="skill-icon-card group">
        <div class="iconify-wrap" style="background:${s.color}22; color:${s.color}">
          ${skillIcon(s)}
        </div>
        <span class="skill-label">${s.name}</span>
      </div>`;
    });
    html += `</div></div>`;
  }
  container.innerHTML = html;
}

/* ── Projects ────────────────────────────────────────────────── */
function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="project-card tilt-card group relative" data-aos="fade-up" data-aos-delay="${i * 100}">
      <div class="tilt-card-inner relative h-full rounded-2xl overflow-hidden bg-slate-900/50 border border-white/10 backdrop-blur-sm transition-all duration-500">
        <div class="relative h-48 overflow-hidden project-image-container">
          ${p.image && p.image.startsWith('http')
            ? `<img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">`
            : p.image
            ? `<img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">`
            : `<div class="w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center"><i class="${p.icon} text-4xl text-white/80"></i></div>`}
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div class="absolute top-4 right-4">
            <span class="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${p.category === 'web' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}">${p.category === 'web' ? '🌐 Web App' : '🏠 Homelab'}</span>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-bold text-white mb-1.5 group-hover:text-indigo-400 transition-colors">${p.title}</h3>
          <p class="text-slate-400 text-sm mb-3 line-clamp-2">${p.description}</p>
          ${p.stats ? `<div class="flex items-center gap-1.5 mb-3 text-xs text-slate-500"><i class="fas fa-chart-line"></i><span>${p.stats}</span></div>` : ''}
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${p.tech.map(t => `<span class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-slate-400 border border-white/10">${t}</span>`).join('')}
          </div>
          <button onclick="openProjectModal(${i})" class="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
            View Project <i class="fas fa-external-link-alt text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
        <div class="tilt-card-glow"></div>
      </div>
    </div>
  `).join('');
  // Reinit tilt for new cards
  initTiltCards();
}

/* ── Project Modal ───────────────────────────────────────────── */
function initProjectModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;
  overlay.querySelector('.modal-close')?.addEventListener('click', closeProjectModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeProjectModal(); });
}
function openProjectModal(idx) {
  const p = PROJECTS[idx];
  if (!p) return;
  const overlay = document.getElementById('project-modal');
  const body = overlay.querySelector('.modal-body');
  body.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-white">${p.title}</h3>
      <span class="px-3 py-1 rounded-full text-xs font-medium ${p.category === 'web' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-purple-500/20 text-purple-300'}">${p.category === 'web' ? '🌐 Web App' : '🏠 Homelab'}</span>
    </div>
    <p class="text-slate-400 text-sm mb-4">${p.description}</p>
    ${p.stats ? `<div class="flex items-center gap-1.5 mb-4 text-xs text-slate-500"><i class="fas fa-chart-line"></i> ${p.stats}</div>` : ''}
    ${p.image ? `<img src="${p.image}" alt="${p.title}" class="w-full rounded-xl mb-4 border border-white/10" style="max-height:300px;object-fit:cover">` : ''}
    <div class="flex flex-wrap gap-2 mb-4">
      ${p.tech.map(t => `<span class="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-400 border border-white/10">${t}</span>`).join('')}
    </div>
    <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
      Open Live <i class="fas fa-external-link-alt text-xs"></i>
    </a>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeProjectModal() {
  const overlay = document.getElementById('project-modal');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProjectModal();
});

/* ── Socials ─────────────────────────────────────────────────── */
function renderSocials() {
  const cards = document.getElementById('social-cards');
  const icons = document.getElementById('social-icons');
  const footerI = document.getElementById('footer-socials');
  if (cards) {
    const cardData = [
      { icon:'fas fa-envelope', label:'Email', value:'azharsss457@gmail.com', href:'mailto:azharsss457@gmail.com', color:'from-pink-500 to-rose-500' },
      { icon:'fab fa-github', label:'GitHub', value:'github.com/azhar457', href:'https://github.com/azhar457', color:'from-slate-500 to-slate-700' },
      { icon:'fab fa-linkedin', label:'LinkedIn', value:'Azhar Muttaqien', href:'https://www.linkedin.com/in/azhar-muttaqien-a74a69237/', color:'from-blue-500 to-blue-700' },
    ];
    cards.innerHTML = cardData.map(l => `
      <a href="${l.href}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
        <div class="p-3 rounded-lg bg-gradient-to-br ${l.color} text-white shadow-lg"><i class="${l.icon}"></i></div>
        <div><p class="text-xs text-slate-500 uppercase tracking-wider">${l.label}</p><p class="text-white font-medium group-hover:text-indigo-400 transition-colors">${l.value}</p></div>
      </a>
    `).join('');
  }
  if (icons) {
    icons.innerHTML = SOCIAL_LINKS.map(s => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer"
         class="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all text-slate-400 hover:text-white"
         aria-label="${s.label}"
         onmouseover="this.style.color='${s.color}'; this.style.borderColor='${s.color}'"
         onmouseout="this.style.color=''; this.style.borderColor=''">
        <i class="${s.icon} text-lg"></i>
      </a>
    `).join('');
  }
  if (footerI) {
    footerI.innerHTML = SOCIAL_LINKS.map(s => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all" aria-label="${s.label}"><i class="${s.icon}"></i></a>
    `).join('');
  }
}

/* ── Counter Animation ───────────────────────────────────────── */
function initCounter() {
  const nums = document.querySelectorAll('.stat-number');
  if (!nums.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateNumber(el, target);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}
function animateNumber(el, target) {
  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current + (el.getAttribute('data-suffix') || '');
  }, 30);
}

/* ── Navbar ──────────────────────────────────────────────────── */
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ── Active Nav Link (IntersectionObserver) ──────────────────── */
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const matching = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (matching) matching.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
  sections.forEach(s => obs.observe(s));
}

/* ── Mobile Drawer (slide from right) ────────────────────────── */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const panel = document.getElementById('drawer-panel');
  const backdrop = document.getElementById('drawer-backdrop');
  const links = drawer.querySelectorAll('.drawer-link');
  if (!btn || !drawer) return;

  function open() {
    drawer.classList.remove('pointer-events-none');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    panel.classList.remove('translate-x-full');
    btn.classList.add('open');
    document.body.classList.add('overflow-hidden');
    // Stagger links
    links.forEach((l, i) => {
      setTimeout(() => {
        l.classList.remove('translate-x-4', 'opacity-0');
      }, 50 + i * 50);
    });
  }
  function close() {
    drawer.classList.add('pointer-events-none');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.add('translate-x-full');
    btn.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
    links.forEach(l => {
      l.classList.add('translate-x-4', 'opacity-0');
    });
  }

  btn.addEventListener('click', () => {
    if (panel.classList.contains('translate-x-full')) open();
    else close();
  });
  backdrop.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));
}

/* ── About Section Scroll Progress ──────────────────────────── */
function initAboutProgress() {
  const col = document.querySelector('.about-skills-scroll-wrapper');
  const bar = document.getElementById('about-progress-bar');
  const pct = document.getElementById('about-progress-pct');
  if (!col || !bar || !pct) return;

  const updateProgress = () => {
    const scrollTop = col.scrollTop;
    const scrollHeight = col.scrollHeight;
    const clientHeight = col.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    let p = 0;
    if (maxScroll > 0) {
      p = Math.min(100, Math.round((scrollTop / maxScroll) * 100));
    }
    bar.style.width = `${p}%`;
    pct.textContent = `${p}%`;
  };

  col.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  // Initial calculation on page load
  updateProgress();
}

/* ── Filters ──────────────────────────────────────────────────── */
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
}

/* ── 3D Tilt Cards ────────────────────────────────────────────── */
function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotY = ((x - centerX) / centerX) * 8;
      const rotX = -((y - centerY) / centerY) * 8;
      card.style.setProperty('--rot-x', `${rotX}deg`);
      card.style.setProperty('--rot-y', `${rotY}deg`);
      card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rot-x', '0deg');
      card.style.setProperty('--rot-y', '0deg');
    });
  });
}
