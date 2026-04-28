/**
 * Shared logic for Arsenal tool pages
 */

function diffDots(d) {
  const colors = ['', '#888780', '#378ADD', '#7F77DD', '#E24B4A', '#A32D2D'];
  let s = '';
  for (let i = 1; i <= 5; i++) {
    const color = i <= d ? colors[Math.min(d, 5)] : 'var(--color-border-secondary)';
    s += `<span style="color:${color};">●</span>`;
  }
  return s;
}

function renderCards() {
  const q = document.getElementById('search').value.toLowerCase();
  const list = tools.filter(t => {
    const catMatch = activeCat === 'all' || t.cat === activeCat;
    const qMatch = !q || t.n.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || (t.tags && t.tags.some(x => x.includes(q)));
    return catMatch && qMatch;
  });

  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const stats = document.getElementById('stats');

  if (!list.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    stats.innerHTML = '';
    return;
  }

  empty.style.display = 'none';
  const catCounts = {};
  list.forEach(t => catCounts[t.cat] = (catCounts[t.cat] || 0) + 1);

  stats.innerHTML = `<span class="stats-count">// ${list.length} tools</span>` +
    Object.entries(catCounts).map(([c, n]) => {
      const cat = CATS[c] || { label: c, border: "#888", icon: "⬡" };
      return `<span class="stats-tag" style="border-color:${cat.border}; color:${cat.border}; background: ${cat.border}15">${cat.label} ×${n}</span>`;
    }).join('');

  grid.innerHTML = list.map(t => {
    const c = CATS[t.cat] || { label: t.cat, border: "#888", icon: "⬡" };
    const isWarn = t.cat === 'warning' || t.cat === 'danger';
    const clickAttr = t.url ? `onclick="window.open('${t.url}', '_blank')"` : '';
    const linkIcon = t.url ? `<svg class="tool-link-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>` : '';

    return `
      <div class="tool-card" ${clickAttr} style="border-left-color: ${c.border}; ${t.url ? 'cursor:pointer' : ''}">
        <div class="card-header">
          <div class="card-title-wrapper">
            <span style="color:${c.border}; font-size:14px;">${c.icon}</span>
            <span class="card-title ${isWarn ? 'text-danger' : ''}">${t.n}</span>
            ${linkIcon}
          </div>
          <span style="font-size:12px;letter-spacing:1px;white-space:nowrap;">${diffDots(t.d)}</span>
        </div>
        <p class="card-desc">${t.desc}</p>
        <div class="tag-container">
          ${(t.tags || []).map(tag => `<span class="tag-pill ${TAG_MAP[tag] || 'tag-default'}">${tag}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function filter(cat) {
  activeCat = cat;
  document.querySelectorAll('.fBtn').forEach(b => {
    const bCat = b.dataset.cat;
    if (bCat === cat) {
      b.classList.add('active');
      if (bCat !== 'all' && CATS[bCat]) b.style.borderColor = CATS[bCat].border;
    } else {
      b.classList.remove('active');
      if (bCat !== 'all') b.style.borderColor = 'var(--color-border-secondary)';
    }
  });
  renderCards();
}

function initArsenal() {
  document.querySelectorAll('.fBtn').forEach(b => {
    const bCat = b.dataset.cat;
    if (bCat !== 'all' && CATS[bCat]) {
      b.style.color = CATS[bCat].border;
      b.addEventListener('mouseenter', () => { 
        if(!b.classList.contains('active')) b.style.background = CATS[bCat].border + '20'; 
      });
      b.addEventListener('mouseleave', () => { 
        if(!b.classList.contains('active')) b.style.background = 'var(--color-background-secondary)'; 
      });
    }
  });
  renderCards();
}
