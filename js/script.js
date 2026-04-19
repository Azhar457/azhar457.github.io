// Data Definitions
const SKILLS = [
    { name: 'HTML/CSS', level: 95, color: '#e34f26', icon: 'fab fa-html5' },
    { name: 'JavaScript', level: 90, color: '#f7df1e', icon: 'fab fa-js' },
    { name: 'React/Next.js', level: 85, color: '#61dafb', icon: 'fab fa-react' },
    { name: 'TypeScript', level: 80, color: '#3178c6', icon: 'fas fa-code' },
    { name: 'Docker', level: 88, color: '#2496ed', icon: 'fab fa-docker' },
    { name: 'Linux', level: 82, color: '#fcc624', icon: 'fab fa-linux' },
    { name: 'Cloudflare', level: 78, color: '#f38020', icon: 'fas fa-network-wired' },
    { name: 'PostgreSQL', level: 75, color: '#336791', icon: 'fas fa-database' },
];

const PROJECTS = [
    {
        title: 'DKM Ulul Albaab UNPAS',
        description: 'Website organisasi DKM Ulul Albaab Universitas Pasundan dengan desain modern dan responsive.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
        url: 'https://ulul-albaab-website.vercel.app/',
        image: 'assets/DKM UAB.png',
        category: 'web',
        stats: 'Active Users: 500+'
    },
    {
        title: 'TesDia Bandung',
        description: 'Platform layanan tes kesehatan dengan interface yang user-friendly dan sistem booking online.',
        tech: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
        url: 'https://foregord.github.io/',
        image: 'assets/Tesdia.png',
        category: 'web',
        stats: 'Monthly Visits: 1K+'
    },
    {
        title: 'RT/RW Information System',
        description: 'Sistem informasi manajemen warga berbasis web untuk administrasi lingkungan yang efisien.',
        tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
        url: 'https://azhar457.github.io/',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
        category: 'web',
        stats: 'Data Processed: 10K+'
    },
    {
        title: 'Orbit Mandiri Computer',
        description: 'Company profile profesional dengan animasi modern dan optimasi SEO untuk bisnis IT.',
        tech: ['HTML', 'CSS', 'JavaScript', 'SEO'],
        url: 'https://orbitmandiricomputer.biz.id/',
        image: 'assets/orbit.png',
        category: 'web',
        stats: 'Client Satisfaction: 100%'
    },
    {
        title: 'Immich Photo Server',
        description: 'Self-hosted photo & video backup solution dengan AI-powered organization dan unlimited storage.',
        tech: ['Docker', 'Immich', 'PostgreSQL', 'Cloudflare Tunnel'],
        url: 'https://immich.azharmtq.my.id',
        category: 'homelab',
        gradient: 'from-indigo-500 via-purple-500 to-cyan-500',
        icon: 'fas fa-cloud',
        stats: 'Photos Backed Up: 50K+'
    },
    {
        title: 'Nextcloud Hub',
        description: 'Private cloud infrastructure dengan collaborative editing, file sync, dan end-to-end encryption.',
        tech: ['Docker', 'Nextcloud', 'MariaDB', 'Redis'],
        url: 'https://nextcloud.azharmtq.my.id',
        category: 'homelab',
        gradient: 'from-purple-600 via-pink-500 to-orange-400',
        icon: 'fas fa-server',
        stats: 'Storage Managed: 2TB+'
    },
];

const SOCIAL_LINKS = [
    { icon: 'fab fa-github', href: 'https://github.com/azhar457', label: 'GitHub', color: '#333' },
    { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/azhar-muttaqien-a74a69237/', label: 'LinkedIn', color: '#0a66c2' },
    { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/azhar.sys.10', label: 'Facebook', color: '#1877f2' },
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/azharmtq/', label: 'Instagram', color: '#e4405f' },
    { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@Just-Save-It-bro', label: 'YouTube', color: '#ff0000' },
    { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@azhar.fauzi234', label: 'TikTok', color: '#000000' },
];

// Initialize Components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Update Year
    document.getElementById('year').textContent = new Date().getFullYear();

    renderSkills();
    renderProjects('all');
    renderSocials();
    initNavbar();
    initMobileMenu();
    initFilters();
});

// Render Functions
function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = SKILLS.map(skill => `
        <div class="relative">
            <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2 text-slate-300">
                    <i class="${skill.icon}" style="color: ${skill.color}"></i>
                    <span class="text-sm font-medium">${skill.name}</span>
                </div>
                <span class="text-xs text-slate-500">${skill.level}%</span>
            </div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div class="skill-progress h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style="width: 0%; background-color: ${skill.color}"></div>
            </div>
        </div>
    `).join('');

    // Animate bars on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = SKILLS[index].level + '%';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(container);
}

function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((project, idx) => `
        <div class="project-card group relative" data-aos="fade-up" data-aos-delay="${idx * 100}">
            <div class="relative h-full rounded-2xl overflow-hidden bg-slate-900/50 border border-white/10 backdrop-blur-sm transition-all duration-500">
                <!-- Image/Gradient Header -->
                <div class="relative h-48 overflow-hidden project-image-container">
                    ${project.image && !project.image.startsWith('http') ? `
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    ` : project.image ? `
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    ` : `
                        <div class="w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center">
                            <i class="${project.icon} text-4xl text-white/80"></i>
                        </div>
                    `}
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 right-4">
                        <span class="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${project.category === 'web' 
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                            : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}">
                            ${project.category === 'web' ? '🌐 Web App' : '🏠 Homelab'}
                        </span>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">${project.title}</h3>
                    <p class="text-slate-400 text-sm mb-4 line-clamp-2">${project.description}</p>
                    
                    ${project.stats ? `
                        <div class="flex items-center gap-2 mb-4 text-xs text-slate-500">
                            <i class="fas fa-terminal"></i>
                            <span>${project.stats}</span>
                        </div>
                    ` : ''}

                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.tech.map(t => `<span class="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-400 border border-white/10">${t}</span>`).join('')}
                    </div>

                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group/link">
                        View Project
                        <i class="fas fa-external-link-alt text-[10px] group-hover/link:translate-x-1 transition-transform"></i>
                    </a>
                </div>
                
                <!-- Hover Glow -->
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
        </div>
    `).join('');
}

function renderSocials() {
    const cardsContainer = document.getElementById('social-cards');
    const iconsContainer = document.getElementById('social-icons');
    const footerContainer = document.getElementById('footer-socials');

    // Key social links for cards
    const cardLinks = [
        { icon: 'fas fa-envelope', label: 'Email', value: 'azharsss457@gmail.com', href: 'mailto:azharsss457@gmail.com', color: 'from-pink-500 to-rose-500' },
        { icon: 'fab fa-github', label: 'GitHub', value: 'github.com/azhar457', href: 'https://github.com/azhar457', color: 'from-slate-500 to-slate-700' },
        { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'Azhar Muttaqien', href: 'https://www.linkedin.com/in/azhar-muttaqien-a74a69237/', color: 'from-blue-500 to-blue-700' }
    ];

    cardsContainer.innerHTML = cardLinks.map(link => `
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
            <div class="p-3 rounded-lg bg-gradient-to-br ${link.color} text-white shadow-lg">
                <i class="${link.icon}"></i>
            </div>
            <div>
                <p class="text-xs text-slate-500 uppercase tracking-wider">${link.label}</p>
                <p class="text-white font-medium group-hover:text-indigo-400 transition-colors">${link.value}</p>
            </div>
        </a>
    `).join('');

    iconsContainer.innerHTML = SOCIAL_LINKS.map(social => `
        <a href="${social.href}" target="_blank" rel="noopener noreferrer" 
           class="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all text-slate-400 hover:text-white"
           aria-label="${social.label}"
           onmouseover="this.style.color='${social.color}'; this.style.borderColor='${social.color}'"
           onmouseout="this.style.color=''; this.style.borderColor=''">
            <i class="${social.icon} text-lg"></i>
        </a>
    `).join('');

    footerContainer.innerHTML = SOCIAL_LINKS.map(link => `
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all" aria-label="${link.label}">
            <i class="${link.icon}"></i>
        </a>
    `).join('');
}

// Interaction logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
        });
    });
}

function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            btns.forEach(b => {
                b.classList.remove('active', 'bg-gradient-to-r', 'from-indigo-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/25');
                b.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
            });
            btn.classList.add('active', 'bg-gradient-to-r', 'from-indigo-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-indigo-500/25');
            btn.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');

            // Render
            const filter = btn.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
}
