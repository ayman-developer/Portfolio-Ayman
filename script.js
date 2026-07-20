/* ==========================================
   DEFAULT RESUME FALLBACK DATA (AYMAN A)
   ========================================== */
const DEFAULT_BIO = {
    name: "Ayman A",
    subtitle: ["Generative AI Specialist", "Cloud & DevOps Engineer", "Computer Science student", "Problem Solver"],
    text: "Computer Science Engineering student passionate about developing intelligent AI-powered solutions. Hands-on experience in cloud architectures, LLMs, and modern full-stack development."
};

const DEFAULT_SKILLS = {
    technical: [
        // Frontend Development
        { name: "HTML", progress: 95 },
        { name: "CSS", progress: 90 },
        { name: "JavaScript", progress: 85 },
        // Backend Development
        { name: "Java", progress: 80 },
        // Database
        { name: "PostgreSQL", progress: 75 },
        // Cloud & DevOps
        { name: "AWS (EC2, S3, IAM, Lambda, API Gateway)", progress: 80 },
        { name: "Docker", progress: 75 },
        { name: "Kubernetes", progress: 70 },
        { name: "Git", progress: 85 },
        { name: "GitHub", progress: 85 },
        // Generative AI
        { name: "Large Language Model (LLM)", progress: 90 },
        { name: "RAG Frameworks", progress: 85 },
        { name: "Prompt Engineering", progress: 90 },
        // Other Tools and Platforms
        { name: "Adobe Premiere Pro", progress: 80 },
        { name: "Adobe Photoshop", progress: 85 },
        { name: "Adobe After Effects", progress: 80 },
        // Machine Learning
        { name: "Supervised Machine Learning", progress: 80 }
    ],
    soft: ["Adaptability", "Good Teamwork", "Time Management", "Communication"],
    languages: ["Tamil", "English"]
};

const DEFAULT_EDUCATION = [
    { id: 1, degree: "🎓 B.E – Computer Science & Engineering", school: "Rathinam Technical Campus, Coimbatore", score: "CGPA: 7.6", date: "2023 – Present" },
    { id: 2, degree: "📜 Higher Secondary (Class XII)", school: "SMBM Matric Higher Secondary School, Dindigul", score: "83.5%", date: "2021 – 2023" },
    { id: 3, degree: "📜 Secondary School (Class X)", school: "SMBM Matric Higher Secondary School, Dindigul", score: "100%", date: "2020 – 2021" }
];


const DEFAULT_PROJECTS = [
    {
        id: 1,
        title: "Smart Tourist Assistant",
        subtitle: "AI-Powered Location-based Travel Guidance",
        date: "Dec 2025 – Mar 2026",
        description: "AI-powered travel guidance system integrating real-time location tracking to dynamically suggest hotels, restaurants, petrol bunks, and tourist spots.",
        tags: ["HTML", "CSS", "JavaScript", "Python", "AI", "Machine Learning"],
        live: "https://github.com/ayman-developer",
        image: "placeholder-tourist",
        details: [
            "Developed location-based travel guidance and nearby service recommendations.",
            "Integrated real-time location tracking dynamically suggesting services.",
            "Built using Full Stack and AI concepts to provide an interactive interface."
        ]
    },
    {
        id: 2,
        title: "AI Code Review GitHub Action",
        subtitle: "CI/CD Automation & Static Analysis",
        date: "2025",
        description: "Engineered CI/CD workflows for C# projects, running automated code reviews and static analysis checks on Pull Requests to enforce standards.",
        tags: ["GitHub Actions", "YAML", "C#", "CI/CD Automation", "Static Code Analysis"],
        live: "https://github.com/ayman-developer",
        image: "placeholder-codereview",
        details: [
            "CI/CD static analysis integration for automated pull request checks.",
            "Enforced branch protection rules that block code merges failing security check.",
            "Reduces manual reviews by identifying syntax or format errors."
        ]
    }
];

const DEFAULT_CERTIFICATIONS = [
    {
        id: 1,
        badge: "🍃",
        title: "Building RAG Apps Using MongoDB",
        issuer: "MongoDB University",
        description: "Focuses on building Retrieval-Augmented Generation applications using MongoDB Vector Search, index configuration, and semantic data models integrated with LLMs.",
        downloadUrl: "assets/certificates/mongodb-rag.jpg",
        verifyUrl: "https://university.mongodb.com/"
    },
    {
        id: 2,
        badge: "🧠",
        title: "Supervised Machine Learning Course",
        issuer: "Scalar Topics",
        description: "Deep dive into supervised learning models including regression, classification algorithms, gradient descent optimization, cost functions, and model validation techniques.",
        downloadUrl: "assets/certificates/supervised-ml.jpg",
        verifyUrl: "https://www.scaler.com/"
    }
];

const DEFAULT_CONTACT = {
    email: "mohammedayman7864@gmail.com",
    phone: "+91 7502949106",
    location: "Coimbatore, Tamil Nadu, India",
    linkedin: "www.linkedin.com/in/-a-ayman",
    github: "github.com/ayman-developer"
};

/* ==========================================
   PERSISTENCE DATA STORE LOADER
   ========================================== */
let store = {
    bio: JSON.parse(localStorage.getItem('ayman_bio')) || DEFAULT_BIO,
    skills: JSON.parse(localStorage.getItem('ayman_skills')) || DEFAULT_SKILLS,
    education: JSON.parse(localStorage.getItem('ayman_education')) || DEFAULT_EDUCATION,
    projects: JSON.parse(localStorage.getItem('ayman_projects')) || DEFAULT_PROJECTS,
    certifications: JSON.parse(localStorage.getItem('ayman_certifications')) || DEFAULT_CERTIFICATIONS,
    contact: JSON.parse(localStorage.getItem('ayman_contact')) || DEFAULT_CONTACT
};

function saveToLocalStorage(key, val) {
    localStorage.setItem(`ayman_${key}`, JSON.stringify(val));
    store[key] = val;
    renderAll();
}

// Self-healing: automatically migrate database and language lists to align with resume.pdf
if (store.skills && store.skills.technical) {
    const hasPostgres = store.skills.technical.some(s => s.name === "PostgreSQL");
    const hasMySql = store.skills.technical.some(s => s.name === "MySQL");
    const hasUrdu = store.skills.languages.includes("Urdu");
    
    if (!hasPostgres || hasMySql || hasUrdu) {
        localStorage.setItem('ayman_skills', JSON.stringify(DEFAULT_SKILLS));
        store.skills = DEFAULT_SKILLS;
    }
}

/* ==========================================
   INITIALIZATION & EVENT BINDINGS
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Generate background particles
    generateParticles(35);

    // Initial theme check
    const isLight = localStorage.getItem('theme') === 'light';
    if (isLight) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }

    // Set up typing subtitle words
    initTypingEffect();

    // Global window scroll listener (hides header, handles active sections, toggles back-to-top)
    window.addEventListener('scroll', () => {
        handleSnapScroll(document.documentElement);
    }, { passive: true });

    // Initial render
    renderAll();

    // Set up custom cursor followers (desktop only)
    initCursorTracker();

    // Set up touch swipe carousels on mobile
    initMobileCarousels();

    // Bind touch highlights for technical subpage skill cards
    const skillCards = document.querySelectorAll('.glass-card-skills');
    skillCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('active-touch');
        }, { passive: true });
        card.addEventListener('touchend', () => {
            setTimeout(() => card.classList.remove('active-touch'), 300);
        }, { passive: true });
    });

    // Check for anchor hash on load to trigger smooth scroll on redirect
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => {
            const section = document.getElementById(hash);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400);
    }

    // Auto-play ambient video on user click to override browser autoplay blocks
    const playAmbientVideo = () => {
        const video = document.getElementById('hero-video');
        if (video) {
            video.currentTime = 0;
            video.muted = true;
            video.play().catch(() => {});
        }
    };
    document.addEventListener('click', playAmbientVideo, { once: true });
    document.addEventListener('touchstart', playAmbientVideo, { once: true });
});

/* ==========================================
   BACKGROUND PARTICLES ENGINE
   ========================================== */
function generateParticles(num) {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < num; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1.5;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}



/* ==========================================
   TYPING WORDS ROTATING EFFECT
   ========================================== */
function initTypingEffect() {
    const span = document.getElementById('typing-text');
    if (!span) return;
    
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 100;
    
    function run() {
        const words = store.bio.subtitle;
        if (!words || words.length === 0) return;
        const currentWord = words[wordIdx % words.length];
        
        if (isDeleting) {
            charIdx--;
            speed = 50;
        } else {
            charIdx++;
            speed = 150;
        }
        
        span.textContent = currentWord.substring(0, charIdx);
        
        if (!isDeleting && charIdx === currentWord.length) {
            isDeleting = true;
            speed = 2000; // Pause at full word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx++;
            speed = 500; // Delay before next word
        }
        
        setTimeout(run, speed);
    }
    run();
}

/* ==========================================
   SCROLLING CONTROLLER (SNAP HIGHLIGHTS)
   ========================================== */
function scrollToSection(id) {
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');
    
    if (isHomePage) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        window.location.href = `index.html#${id}`;
    }
}

function handleSnapScroll(container) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    
    // Hide header when scrolling, show only at absolute top (scrollTop <= 50)
    const header = document.querySelector('.header');
    if (header) {
        if (scrollTop > 50) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
    }
    
    // Highlight Back to Top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (scrollTop > viewportHeight / 2) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    }

    // Map section IDs to header links
    const sections = ['about', 'education', 'skills', 'projects', 'certifications', 'personal-skills', 'contact'];
    sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
            const topOffset = el.offsetTop;
            const diff = scrollTop - topOffset;
            const link = document.getElementById(`nav-${secId}`);
            
            if (link) {
                if (Math.abs(diff) < viewportHeight / 2) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        }
    });
}

/* ==========================================
   3D CARD TRANSFORM ON SCROLL
   ========================================== */
function applyCardScrollTransforms(container) {
    const scrollTop = container.scrollTop;
    const height = container.clientHeight;
    const children = container.children;
    
    for (let i = 0; i < children.length; i++) {
        const card = children[i];
        const offset = card.offsetTop;
        const diff = scrollTop - offset;
        
        if (Math.abs(diff) < height) {
            const ratio = diff / height;
            card.style.transform = `perspective(1200px) rotateX(${ratio * 15}deg) translateZ(${Math.abs(ratio) * -60}px)`;
            card.style.opacity = 1 - Math.abs(ratio) * 0.3;
        } else {
            card.style.transform = '';
            card.style.opacity = '';
        }
    }
}

/* ==========================================
   THEME SWITCHING UTILS
   ========================================== */
function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('light')) {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        showToast('🌙 Dark Mode Activated');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
        showToast('☀️ Light Mode Activated');
    }
}

/* ==========================================
   SYSTEM TOAST MESSAGE DISPATCHER
   ========================================== */
function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    
    container.appendChild(toast);
    
    // Auto cleanup after anim ends
    setTimeout(() => {
        toast.remove();
    }, 3100);
}

/* ==========================================
   MODAL 1: PREVIEW CERTIFICATE POPUP
   ========================================== */
function viewCertificate(url, title) {
    const modal = document.getElementById('cert-modal');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalImg = document.getElementById('cert-modal-img');
    const modalDownload = document.getElementById('cert-modal-download');
    
    if (modal && modalImg && modalTitle && modalDownload) {
        modalTitle.textContent = `🏆 ${title} Certificate`;
        modalImg.src = url;
        modalDownload.href = url;
        modalDownload.download = url.split('/').pop();
        
        modal.classList.add('active');
    }
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) modal.classList.remove('active');
}

/* ==========================================
   MODAL 2: PROJECT DETAIL DIALOG
   ========================================== */
function viewProjectDetails(id) {
    const modal = document.getElementById('project-details-modal');
    const title = document.getElementById('project-details-title');
    const body = document.getElementById('project-details-body');
    
    const project = store.projects.find(p => p.id === id);
    if (!project || !modal || !title || !body) return;
    
    title.textContent = `💼 ${project.title}`;
    
    let listMarkup = project.details.map(b => `<li class="text-sm text-gray-300 leading-relaxed">• ${b}</li>`).join('');
    let tagsMarkup = project.tags.map(t => `<span class="tech-tag tech-tag-cyan">${t}</span>`).join('');
    
    body.innerHTML = `
        <h4 class="text-white font-bold text-base mb-1">${project.subtitle}</h4>
        <span class="text-xs text-gray-500 font-semibold uppercase block mb-4">${project.date}</span>
        <ul class="space-y-2 mb-6">
            ${listMarkup}
        </ul>
        <div class="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            ${tagsMarkup}
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProjectDetailsModal() {
    const modal = document.getElementById('project-details-modal');
    if (modal) modal.classList.remove('active');
}

/* ==========================================
   MODAL 3: OWNER LOCK SWITCHER
   ========================================== */
let isOwner = false;
let failAttempts = 0;
let lockOutUntil = 0;

function triggerAdminModal() {
    if (isOwner) {
        isOwner = false;
        document.body.classList.remove('owner-active');
        showToast('🔒 Locked. Owner mode disabled.');
    } else {
        const modal = document.getElementById('admin-auth-modal');
        if (modal) modal.classList.add('active');
    }
}

function closeAdminModal() {
    const modal = document.getElementById('admin-auth-modal');
    if (modal) modal.classList.remove('active');
}

function togglePasswordVisibility() {
    const input = document.getElementById('admin-password');
    const icon = document.getElementById('password-visibility-icon');
    if (!input || !icon) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;
    } else {
        input.type = 'password';
        icon.innerHTML = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    
    if (Date.now() < lockOutUntil) {
        const remaining = Math.ceil((lockOutUntil - Date.now()) / 1000);
        showToast(`🔒 Too many attempts. Try again in ${remaining}s.`);
        return;
    }
    
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;
    
    if (user === 'ayman-a' && pass === 'Ayman@786777') {
        isOwner = true;
        failAttempts = 0;
        document.body.classList.add('owner-active');
        closeAdminModal();
        showToast('🔓 Owner mode active. Edit triggers visible.');
        
        // Reset password fields
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';
    } else {
        failAttempts++;
        if (failAttempts >= 3) {
            lockOutUntil = Date.now() + 30000; // 30s lockout
            showToast('🔒 Locked out for 30 seconds due to 3 failed attempts.');
        } else {
            showToast(`❌ Incorrect credentials. (${failAttempts}/3 attempts)`);
        }
    }
}

/* ==========================================
   MOBILE MENU OVERLAY HANDLER
   ========================================== */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('active');
}

/* ==========================================
   CONTACT FORM DISPATCHER
   ========================================== */
function handleContactSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    const name = encodeURIComponent(data.get('name') || '');
    const email = encodeURIComponent(data.get('email') || '');
    const subject = encodeURIComponent(data.get('subject') || '');
    const message = encodeURIComponent(data.get('message') || '');
    
    // Redirect via system mail client hook
    window.location.href = `mailto:${store.contact.email}?subject=${subject}&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage: ${message}`;
    
    e.currentTarget.reset();
    showToast('✉️ Form validated. Opening Mail Client...');
}

/* ==========================================
   RE-RENDERING DOM LAYOUT ENGINE
   ========================================== */
function renderAll() {
    // Stat counters
    const projCount = store.projects.length;
    const certCount = store.certifications.length;
    
    const statProj = document.getElementById('stat-projects');
    if (statProj) statProj.textContent = `🚀 ${projCount}+`;
    const statCert = document.getElementById('stat-certs');
    if (statCert) statCert.textContent = `📜 ${certCount}+`;
    
    // Hero details
    const heroName = document.getElementById('display-hero-name');
    if (heroName) heroName.textContent = store.bio.name;
    const bioText = document.getElementById('display-bio-text');
    if (bioText) bioText.textContent = store.bio.text;
    
    // Education Cards
    const eduContainer = document.getElementById('education-list-container');
    if (eduContainer) {
        eduContainer.innerHTML = store.education.map(edu => `
            <div class="education-card glass relative group">
                <button class="delete-item-btn" onclick="deleteItem('education', ${edu.id})" aria-label="Delete">🗑️</button>
                <div class="cms-edit-wrapper h-full flex flex-col justify-between items-start">
                    <button class="cms-edit-trigger" onclick="openCmsEdit('education', ${edu.id})" aria-label="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                    <div>
                        <span class="education-date mb-4">${edu.date}</span>
                        <h3 class="text-xl font-bold text-white mb-2 leading-snug">${edu.degree}</h3>
                        <p class="text-gray-400 text-sm mb-4">${edu.school}</p>
                    </div>
                    <div class="w-full pt-4 border-t border-white/5 flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span>Academics</span>
                        <span class="text-cyan-400 text-sm font-black">${edu.score}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }


    // Technical stack categories list
    const techContainer = document.getElementById('technical-skills-categories');
    if (techContainer) {
        const categories = {
            "Frontend Development": [],
            "Backend Development": [],
            "Database": [],
            "Cloud & DevOps": [],
            "Generative AI": [],
            "Machine Learning": [],
            "Other Tools and Platforms": []
        };
        
        store.skills.technical.forEach(skill => {
            const name = skill.name.toLowerCase();
            if (name.includes('html') || name.includes('css') || name === 'javascript') {
                categories["Frontend Development"].push(skill);
            } else if (name === 'java' || name.includes('python')) {
                categories["Backend Development"].push(skill);
            } else if (name.includes('postgresql') || name.includes('mysql') || name.includes('postgres') || name.includes('sql') || name.includes('mongodb')) {
                categories["Database"].push(skill);
            } else if (name.includes('aws') || name.includes('docker') || name.includes('kubernetes') || name.includes('k8s') || name === 'git' || name === 'github' || name === 'git & github') {
                categories["Cloud & DevOps"].push(skill);
            } else if (name.includes('llm') || name.includes('large language') || name.includes('rag') || name.includes('prompt')) {
                categories["Generative AI"].push(skill);
            } else if (name.includes('machine learning') || name.includes('supervised')) {
                categories["Machine Learning"].push(skill);
            } else {
                categories["Other Tools and Platforms"].push(skill);
            }
        });
        
        let html = '';
        Object.keys(categories).forEach(cat => {
            const list = categories[cat];
            if (list.length === 0) return;
            
            let emoji = '💻';
            let borderClass = 'hover:border-cyan-500/30';
            let textClass = 'text-cyan-300 hover:border-cyan-500/40';
            let bgGrad = 'from-cyan-500 to-transparent';
            
            if (cat === "Frontend Development") {
                emoji = '🎨';
                borderClass = 'hover:border-cyan-500/30';
                textClass = 'text-cyan-300 hover:border-cyan-500/40';
                bgGrad = 'from-cyan-500 to-transparent';
            } else if (cat === "Backend Development") {
                emoji = '⚙️';
                borderClass = 'hover:border-blue-500/30';
                textClass = 'text-blue-300 hover:border-blue-500/40';
                bgGrad = 'from-blue-500 to-transparent';
            } else if (cat === "Database") {
                emoji = '💾';
                borderClass = 'hover:border-indigo-500/30';
                textClass = 'text-indigo-300 hover:border-indigo-500/40';
                bgGrad = 'from-indigo-500 to-transparent';
            } else if (cat === "Cloud & DevOps") {
                emoji = '☁️';
                borderClass = 'hover:border-purple-500/30';
                textClass = 'text-purple-300 hover:border-purple-500/40';
                bgGrad = 'from-purple-500 to-transparent';
            } else if (cat === "Generative AI") {
                emoji = '🤖';
                borderClass = 'hover:border-emerald-500/30';
                textClass = 'text-emerald-300 hover:border-emerald-500/40';
                bgGrad = 'from-emerald-500 to-transparent';
            } else if (cat === "Machine Learning") {
                emoji = '🧠';
                borderClass = 'hover:border-amber-500/30';
                textClass = 'text-amber-300 hover:border-amber-500/40';
                bgGrad = 'from-amber-500 to-transparent';
            } else {
                emoji = '🛠️';
                borderClass = 'hover:border-gray-500/30';
                textClass = 'text-gray-300 hover:border-gray-500/40';
                bgGrad = 'from-gray-500 to-transparent';
            }
            
            html += `
                <div class="glass p-6 rounded-3xl relative overflow-hidden group border border-white/5 ${borderClass} transition-all flex flex-col justify-between">
                    <div class="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${bgGrad}"></div>
                    <div>
                        <div class="text-2xl mb-3">${emoji}</div>
                        <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">${cat}</h4>
                        <div class="flex flex-wrap gap-2">
                            ${list.map(skill => `
                                <span class="px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 ${textClass} rounded-full transition-all">${skill.name}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        techContainer.innerHTML = html;
    }

    const softSkills = document.getElementById('soft-skills-container');
    if (softSkills) {
        softSkills.innerHTML = store.skills.soft.map(skill => `
            <span class="px-4 py-2 text-sm font-semibold bg-white/5 border border-white/10 hover:border-cyan-500/40 text-cyan-300 rounded-full transition-all">${skill}</span>
        `).join('');
    }

    const languagesContainer = document.getElementById('language-skills-container');
    if (languagesContainer) {
        languagesContainer.innerHTML = store.skills.languages.map(lang => `
            <span class="px-4 py-2 text-sm font-semibold bg-white/5 border border-white/10 hover:border-cyan-500/40 text-cyan-300 rounded-full transition-all">${lang}</span>
        `).join('');
    }

    // Projects Grid
    const projContainer = document.getElementById('projects-list-container');
    if (projContainer) {
        projContainer.innerHTML = store.projects.map(proj => {
            const hasCustomImage = !proj.image.includes('placeholder');
            return `
                <div class="project-card glass relative group">
                    <button class="delete-item-btn" onclick="deleteItem('project', ${proj.id})" aria-label="Delete">🗑️</button>
                    <div class="cms-edit-wrapper h-full flex flex-col justify-between">
                        <button class="cms-edit-trigger" onclick="openCmsEdit('project', ${proj.id})" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        <div class="project-img-wrapper">
                            ${hasCustomImage ? `
                                <img src="${proj.image}" alt="${proj.title}" class="project-img">
                            ` : `
                                <div class="placeholder-icon-card">
                                    <span class="text-4xl mb-2">${proj.image.includes('excel') ? '📊' : '💻'}</span>
                                    <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">${proj.image.includes('excel') ? 'Excel Sheet' : 'Utility Build'}</span>
                                </div>
                            `}
                            <span class="project-badge">${proj.tags[0] || 'Build'}</span>
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-grow text-left">
                            <div class="space-y-1 mb-4">
                                <span class="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">${proj.date}</span>
                                <h3 class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">${proj.title}</h3>
                                <p class="text-xs text-gray-400 font-semibold">${proj.subtitle}</p>
                                <p class="text-sm text-gray-300 leading-relaxed pt-2">${proj.description}</p>
                            </div>
                            <div class="space-y-4">
                                <div class="tag-list">
                                    ${proj.tags.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                                    ${proj.tags.length > 3 ? `<span class="tech-tag">+${proj.tags.length - 3}</span>` : ''}
                                </div>
                                <div class="flex pt-3 border-t border-white/5">
                                    <button onclick="viewProjectDetails(${proj.id})" class="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all text-center">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Certifications Grid
    const certsContainer = document.getElementById('certifications-list-container');
    if (certsContainer) {
        certsContainer.innerHTML = store.certifications.map(cert => `
            <div class="cert-card glass p-6 relative group text-left flex flex-col justify-between">
                <button class="delete-item-btn" onclick="deleteItem('achievement', ${cert.id})" aria-label="Delete">🗑️</button>
                <div class="cms-edit-wrapper h-full flex flex-col justify-between">
                    <button class="cms-edit-trigger" onclick="openCmsEdit('achievement', ${cert.id})" aria-label="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                    <div>
                        <div class="text-4xl mb-4">${cert.badge}</div>
                        <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">${cert.title}</h3>
                        <p class="text-xs font-semibold tracking-wide text-cyan-400 uppercase mb-4">${cert.issuer}</p>
                        <p class="text-sm text-gray-400 leading-relaxed mb-6">${cert.description}</p>
                    </div>
                    ${cert.downloadUrl ? `
                        <div class="pt-4 border-t border-white/5 flex gap-2">
                            <button onclick="viewCertificate('${cert.downloadUrl}', '${cert.title}')" class="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-cyan-300 rounded-xl text-[10px] font-bold transition-all text-center">👁️ Preview</button>
                            <a href="${cert.downloadUrl}" download="${cert.downloadUrl.split('/').pop()}" onclick="triggerDownloadFeedback(this)" class="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-[10px] font-bold transition-all text-center">📥 Download</a>
                            <a href="${cert.verifyUrl || '#'}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold transition-all text-center">🔗 Verify</a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    // Contact text updates
    const cEmail = document.getElementById('display-contact-email');
    if (cEmail) cEmail.textContent = store.contact.email;
    const cEmailLink = document.getElementById('display-contact-email-link');
    if (cEmailLink) cEmailLink.href = `mailto:${store.contact.email}`;
    const cPhone = document.getElementById('display-contact-phone');
    if (cPhone) cPhone.textContent = store.contact.phone;
    const cPhoneLink = document.getElementById('display-contact-phone-link');
    if (cPhoneLink) cPhoneLink.href = `tel:${store.contact.phone.replace(/\s+/g, '')}`;
    const cLoc = document.getElementById('display-contact-location');
    if (cLoc) cLoc.textContent = store.contact.location;
    const cLinkedin = document.getElementById('display-contact-linkedin');
    if (cLinkedin) cLinkedin.href = `https://${store.contact.linkedin}`;
    const cGithub = document.getElementById('display-contact-github');
    if (cGithub) cGithub.href = `https://${store.contact.github}`;
    
    // Auto initialize scroll reveals on data render updates
    initScrollReveal();
}

/* ==========================================
   DYNAMIC DYNAMIC EDITOR ENGINE (CMS)
   ========================================== */
let activeEditSection = null;
let activeEditId = null;

function openCmsEdit(section, id = null) {
    activeEditSection = section;
    activeEditId = id;
    
    const modal = document.getElementById('cms-editor-modal');
    const form = document.getElementById('cms-editor-form');
    const typeLabel = document.getElementById('cms-editor-type');
    
    if (!modal || !form || !typeLabel) return;
    
    typeLabel.textContent = section;
    let inputsMarkup = '';
    
    if (section === 'hero') {
        inputsMarkup = `
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Owner Name</label>
                <input name="name" type="text" value="${store.bio.name}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Subtitles (Comma separated)</label>
                <input name="subtitle" type="text" value="${store.bio.subtitle.join(', ')}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
        `;
    } else if (section === 'bio') {
        inputsMarkup = `
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Objective Statement</label>
                <textarea name="text" rows="5" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm resize-none" required>${store.bio.text}</textarea>
            </div>
        `;
    } else if (section === 'skills') {
        const techStr = store.skills.technical.map(s => s.name).join(', ');
        inputsMarkup = `
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Technical Skills (Comma separated, e.g. Java, Python, HTML)</label>
                <input name="technical" type="text" value="${techStr}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Soft Skills (Comma separated)</label>
                <input name="soft" type="text" value="${store.skills.soft.join(', ')}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Languages (Comma separated)</label>
                <input name="languages" type="text" value="${store.skills.languages.join(', ')}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
        `;
    } else if (section === 'education') {
        const edu = id ? store.education.find(e => e.id === id) : { degree: '', school: '', score: '', date: '' };
        inputsMarkup = `
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Degree Name</label>
                <input name="degree" type="text" value="${edu.degree}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Institution / School</label>
                <input name="school" type="text" value="${edu.school}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Score / GPA</label>
                    <input name="score" type="text" value="${edu.score}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Date / Period</label>
                    <input name="date" type="text" value="${edu.date}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
            </div>
        `;
    } else if (section === 'project') {
        const proj = id ? store.projects.find(p => p.id === id) : { title: '', subtitle: '', date: '', description: '', tags: [], live: '', image: '', details: [] };
        inputsMarkup = `
            <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Project Title</label>
                    <input name="title" type="text" value="${proj.title}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Subtitle / Niche</label>
                    <input name="subtitle" type="text" value="${proj.subtitle}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Date / Period</label>
                    <input name="date" type="text" value="${proj.date}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Tags (Comma separated)</label>
                    <input name="tags" type="text" value="${proj.tags.join(', ')}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Live Demo Link</label>
                <input name="live" type="url" value="${proj.live}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Image Link (Use 'placeholder-excel' or local URL)</label>
                <input name="image" type="text" value="${proj.image}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Short Description</label>
                <textarea name="description" rows="2" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm resize-none" required>${proj.description}</textarea>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Detail Bullets (Comma separated)</label>
                <textarea name="details" rows="3" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm resize-none" required>${proj.details.join(', ')}</textarea>
            </div>
        `;
    } else if (section === 'achievement') {
        const cert = id ? store.certifications.find(c => c.id === id) : { badge: '🏅', title: '', issuer: '', description: '', downloadUrl: '' };
        inputsMarkup = `
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-1 space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Emoji</label>
                    <input name="badge" type="text" value="${cert.badge}" class="w-full text-center px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
                <div class="col-span-3 space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Title</label>
                    <input name="title" type="text" value="${cert.title}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Issuer</label>
                <input name="issuer" type="text" value="${cert.issuer}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea name="description" rows="3" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm resize-none" required>${cert.description}</textarea>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Certificate Image Link (e.g. /mongodb-rag.jpg)</label>
                <input name="downloadUrl" type="text" value="${cert.downloadUrl}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm">
            </div>
        `;
    } else if (section === 'contact') {
        inputsMarkup = `
            <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Contact Email</label>
                    <input name="email" type="email" value="${store.contact.email}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-400 uppercase">Contact Phone</label>
                    <input name="phone" type="text" value="${store.contact.phone}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
                </div>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">Location String</label>
                <input name="location" type="text" value="${store.contact.location}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">LinkedIn Handle (No https://)</label>
                <input name="linkedin" type="text" value="${store.contact.linkedin}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-400 uppercase">GitHub Handle (No https://)</label>
                <input name="github" type="text" value="${store.contact.github}" class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-cyan-500 outline-none text-sm" required>
            </div>
        `;
    }
    
    // Add Save & Cancel CTA buttons
    form.innerHTML = `
        ${inputsMarkup}
        <div class="pt-4 flex gap-3">
            <button type="button" onclick="closeCmsModal()" class="flex-1 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-xs hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" class="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-xs transition-colors">Save Changes</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeCmsModal() {
    const modal = document.getElementById('cms-editor-modal');
    if (modal) modal.classList.remove('active');
    activeEditSection = null;
    activeEditId = null;
}

function openItemAdd(section) {
    openCmsEdit(section, null);
}

function handleCmsSave(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    if (activeEditSection === 'hero') {
        const nextBio = {
            ...store.bio,
            name: data.get('name'),
            subtitle: data.get('subtitle').split(',').map(s => s.trim()).filter(Boolean)
        };
        saveToLocalStorage('bio', nextBio);
        showToast('✔️ Hero details updated successfully!');
    } else if (activeEditSection === 'bio') {
        const nextBio = {
            ...store.bio,
            text: data.get('text')
        };
        saveToLocalStorage('bio', nextBio);
        showToast('✔️ Biography objective updated!');
    } else if (activeEditSection === 'skills') {
        const techStr = data.get('technical');
        const technical = techStr.split(',').map(item => {
            const name = item.trim();
            return name ? { name, progress: 100 } : null;
        }).filter(Boolean);
        
        const nextSkills = {
            technical,
            soft: data.get('soft').split(',').map(s => s.trim()).filter(Boolean),
            languages: data.get('languages').split(',').map(s => s.trim()).filter(Boolean)
        };
        saveToLocalStorage('skills', nextSkills);
        showToast('✔️ Skills matrices updated!');
    } else if (activeEditSection === 'education') {
        let list = [...store.education];
        const item = {
            id: activeEditId || Date.now(),
            degree: data.get('degree'),
            school: data.get('school'),
            score: data.get('score'),
            date: data.get('date')
        };
        if (activeEditId) {
            list = list.map(e => e.id === activeEditId ? item : e);
        } else {
            list.push(item);
        }
        saveToLocalStorage('education', list);
        showToast('✔️ Education node updated!');
    } else if (activeEditSection === 'project') {
        let list = [...store.projects];
        const tags = data.get('tags').split(',').map(t => t.trim()).filter(Boolean);
        const details = data.get('details').split(',').map(t => t.trim()).filter(Boolean);
        const item = {
            id: activeEditId || Date.now(),
            title: data.get('title'),
            subtitle: data.get('subtitle'),
            date: data.get('date'),
            description: data.get('description'),
            tags,
            live: data.get('live'),
            image: data.get('image'),
            details
        };
        if (activeEditId) {
            list = list.map(e => e.id === activeEditId ? item : e);
        } else {
            list.push(item);
        }
        saveToLocalStorage('projects', list);
        showToast('✔️ Project item updated!');
    } else if (activeEditSection === 'achievement') {
        let list = [...store.certifications];
        const item = {
            id: activeEditId || Date.now(),
            badge: data.get('badge'),
            title: data.get('title'),
            issuer: data.get('issuer'),
            description: data.get('description'),
            downloadUrl: data.get('downloadUrl')
        };
        if (activeEditId) {
            list = list.map(c => c.id === activeEditId ? item : c);
        } else {
            list.push(item);
        }
        saveToLocalStorage('certifications', list);
        showToast('✔️ Certification verified & updated!');
    } else if (activeEditSection === 'contact') {
        const nextContact = {
            email: data.get('email'),
            phone: data.get('phone'),
            location: data.get('location'),
            linkedin: data.get('linkedin'),
            github: data.get('github')
        };
        saveToLocalStorage('contact', nextContact);
        showToast('✔️ Personal contact details updated!');
    }
    
    closeCmsModal();
}

function deleteItem(section, id) {
    if (!confirm('Are you sure you want to delete this element?')) return;
    
    if (section === 'education') {
        const list = store.education.filter(e => e.id !== id);
        saveToLocalStorage('education', list);
        showToast('❌ Education node deleted.');
    } else if (section === 'project') {
        const list = store.projects.filter(e => e.id !== id);
        saveToLocalStorage('projects', list);
        showToast('❌ Project card removed.');
    } else if (section === 'achievement') {
        const list = store.certifications.filter(e => e.id !== id);
        saveToLocalStorage('certifications', list);
        showToast('❌ Certification card deleted.');
    }
}

function downloadResume(btn) {
    if (!btn) return;
    
    // Save original state
    const originalHtml = btn.innerHTML;
    
    // Set loading state
    btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Preparing...
    `;
    btn.style.pointerEvents = 'none';
    
    showToast('💾 Preparing resume download...');
    
    setTimeout(() => {
        // Trigger download of local asset
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf';
        link.download = 'Ayman_A_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success state
        btn.innerHTML = `✔️ Downloaded!`;
        btn.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        btn.style.borderColor = '#10b981';
        showToast('✔️ Resume downloaded successfully!');
        
        // Reset after delay
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.pointerEvents = '';
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
        }, 2000);
    }, 1200);
}

function triggerDownloadFeedback(aElement) {
    if (!aElement) return;
    
    const originalText = aElement.textContent;
    aElement.textContent = '📥 Saving...';
    aElement.style.pointerEvents = 'none';
    
    showToast('💾 Downloading certificate asset...');
    
    setTimeout(() => {
        aElement.textContent = '✔️ Done!';
        setTimeout(() => {
            aElement.textContent = originalText;
            aElement.style.pointerEvents = '';
        }, 1500);
    }, 1000);
}

/* ==========================================
   SCROLL REVEAL / OBSERVER ENGINE
   ========================================== */
function initScrollReveal() {
    // If the user prefers reduced motion, do not initialize reveal observers
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px 0px -40px 0px', // trigger slightly before entering viewport
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Calculate stagger delay based on relative sibling index
                const parent = el.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(el);
                    if (index !== -1) {
                        el.style.transitionDelay = `${index * 80}ms`;
                    }
                }
                
                el.classList.add('revealed');
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Track all reveal targets
    const elements = document.querySelectorAll(
        '.reveal-on-scroll, ' +
        '.education-card, ' +
        '.timeline-item, ' +
        '#technical-skills-categories span, ' +
        '#soft-skills-container span, ' +
        '#language-skills-container span, ' +
        '.project-card, ' +
        '.cert-card, ' +
        '.form-group, ' +
        '.section-subtitle, ' +
        '.snap-section h2'
    );
    
    elements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        if (!el.classList.contains('revealed')) {
            revealObserver.observe(el);
        }
    });
}

// Mobile Touch Swipe Carousel Implementation
function initMobileCarousels() {
    const containers = [
        document.getElementById('projects-list-container'),
        document.getElementById('certifications-list-container')
    ];
    
    containers.forEach(container => {
        if (!container) return;
        
        let startX = 0;
        let startY = 0;
        let scrollStart = 0;
        let isSwiping = false;
        let startTime = 0;
        
        container.addEventListener('touchstart', (e) => {
            // Only activate carousel on mobile viewports
            if (window.innerWidth >= 768) return;
            
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            scrollStart = container.scrollLeft;
            isSwiping = false;
            startTime = Date.now();
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            if (window.innerWidth >= 768) return;
            
            const touchX = e.touches[0].pageX;
            const touchY = e.touches[0].pageY;
            const deltaX = touchX - startX;
            const deltaY = touchY - startY;
            
            // If horizontal swipe is dominant, prevent vertical scroll and slide horizontally
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                isSwiping = true;
                container.scrollLeft = scrollStart - deltaX;
                
                // Add scale/opacity feedback during swipe
                updateSwipeFeedback(container);
            }
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            if (window.innerWidth >= 768 || !isSwiping) return;
            
            const endTime = Date.now();
            const elapsed = endTime - startTime;
            const finalScroll = container.scrollLeft;
            const deltaScroll = finalScroll - scrollStart;
            
            // Snap to closest card based on swipe velocity and offset
            const cards = container.children;
            if (cards.length === 0) return;
            
            const cardWidth = cards[0].offsetWidth + 20; // Width + gap
            let targetIndex = Math.round(finalScroll / cardWidth);
            
            // Check for swipe velocity to go next/prev
            if (elapsed < 300 && Math.abs(deltaScroll) > 30) {
                targetIndex = deltaScroll > 0 ? Math.ceil(finalScroll / cardWidth) : Math.floor(finalScroll / cardWidth);
            }
            
            targetIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));
            
            // Smooth snap transition matching existing cubic-bezier
            container.scrollTo({
                left: targetIndex * cardWidth,
                behavior: 'smooth'
            });
            
            // Re-apply focus styles
            setTimeout(() => updateSwipeFeedback(container), 300);
        }, { passive: true });
        
        // Listen to scroll to apply active states dynamically
        container.addEventListener('scroll', () => {
            if (window.innerWidth < 768) {
                updateSwipeFeedback(container);
            }
        }, { passive: true });
    });
}

function updateSwipeFeedback(container) {
    const cards = container.children;
    const containerCenter = container.scrollLeft + (container.clientWidth / 2);
    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = Math.abs(containerCenter - cardCenter);
        const maxDistance = container.clientWidth / 1.2;
        
        // Calculate scale and opacity based on closeness to center
        let factor = 1 - (distance / maxDistance);
        factor = Math.max(0.85, Math.min(1, factor));
        
        let opacity = 1 - (distance / maxDistance) * 0.3;
        opacity = Math.max(0.7, Math.min(1, opacity));
        
        // Apply GPU-friendly properties
        card.style.transform = `scale(${factor})`;
        card.style.opacity = opacity;
        
        // Highlight border of centered card
        if (distance < card.offsetWidth / 2) {
            card.style.borderColor = 'rgba(0, 229, 255, 0.4)';
            card.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.15)';
        } else {
            card.style.borderColor = '';
            card.style.boxShadow = '';
        }
    }
}

/* ==========================================
   CUSTOM CURSOR FOLLOWER & HOVER EFFECT
   ========================================== */
function initCursorTracker() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    function updateOutline() {
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;
        
        outlineX += dx * 0.15;
        outlineY += dy * 0.15;
        
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(updateOutline);
    }
    requestAnimationFrame(updateOutline);

    const bindCursorHover = () => {
        const interactives = document.querySelectorAll('a, button, input, textarea, .cms-edit-trigger, select, [onclick], .nav-btn, .mobile-link, .add-item-btn, .tech-tag, .project-card, .cert-card, .education-card');
        interactives.forEach(el => {
            if (!el.dataset.cursorBound) {
                el.dataset.cursorBound = 'true';
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            }
        });
    };
    
    bindCursorHover();
    setInterval(bindCursorHover, 1000);
}
