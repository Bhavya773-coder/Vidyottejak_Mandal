/**
 * Vidyottejak Mandal - Premium Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Dark & Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    const isDark = localStorage.getItem('theme') === 'dark';

    if (isDark) {
        rootEl.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (rootEl.getAttribute('data-theme') === 'dark') {
            rootEl.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            rootEl.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    // --- Navbar Scroll & Parallax Variables ---
    const navbar = document.getElementById('navbar');
    const aboutImg = document.querySelector('.parallax-img');
    const timelineFill = document.getElementById('timeline-fill');
    const timelineItems = document.querySelectorAll('.timeline-item');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar blur effect
        if (scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Simple About Image Parallax
        if(aboutImg) {
            aboutImg.style.transform = `scale(1.05) translateY(${scrollY * 0.05}px)`;
        }

        // Timeline Scroll Fill line
        const processSec = document.getElementById('process');
        if(processSec) {
            const rect = processSec.getBoundingClientRect();
            const processTop = rect.top;
            const processHeight = rect.height;
            const windowH = window.innerHeight;

            // If section is in view
            if (processTop < windowH && processTop > -processHeight) {
                let progress = 0;
                if(window.innerWidth > 1024) {
                    // Horizontal line
                    progress = ((windowH - processTop - 300) / (processHeight)) * 100;
                    progress = Math.max(0, Math.min(100, progress));
                    if(timelineFill) timelineFill.style.width = `${progress}%`;
                } else {
                    // Vertical line
                    progress = ((windowH - processTop - 300) / (processHeight)) * 100;
                    progress = Math.max(0, Math.min(100, progress));
                    if(timelineFill) timelineFill.style.height = `${progress}%`;
                }

                // Highlight active items
                timelineItems.forEach((item, index) => {
                    const threshold = (100 / timelineItems.length) * (index + 0.5);
                    if(progress > threshold) item.classList.add('active');
                    else item.classList.remove('active');
                });
            }
        }
    });

    // --- Scroll Reveal System (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter, .badge-num');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = +entry.target.getAttribute('data-target');
                const duration = 2500;
                const increment = target / (duration / 16);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));

    // --- Progress Bars ---
    const progressFills = document.querySelectorAll('.progress-fill');
    const progressTexts = document.querySelectorAll('.progress-percent');
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Expanding the bar
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressFills.forEach(bar => progressObserver.observe(bar));

    // Animate text percentage
    const textPercentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = +entry.target.getAttribute('data-target');
                let current = 0;
                const increment = target / (2000 / 16);
                const updatePercent = () => {
                    current += increment;
                    if(current < target) {
                        entry.target.innerText = Math.ceil(current) + '%';
                        requestAnimationFrame(updatePercent);
                    } else {
                        entry.target.innerText = target + '%';
                    }
                };
                updatePercent();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    progressTexts.forEach(t => textPercentObserver.observe(t));

    // --- Magnetic Buttons Effect ---
    // A premium touch where buttons slightly snap to the cursor
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Instituions Grid Feature ---
    const institutionsData = [
        { name: "Shree M. P. Shah Muni. Commerce College", location: "Jamnagar, Gujarat", type: "college", img: "assets/IMG_1776.jpg" },
        { name: "K.P. Shah Law College", location: "Jamnagar, Gujarat", type: "college", img: "assets/IMG_1792.jpg" },
        { name: "Shree Prabhulal Sanghraj Shah Vidyalaya", location: "Jamnagar, Gujarat", type: "school", img: "assets/IMG_1811.jpg" },
        { name: "Shree Municipal High School", location: "Jamnagar, Gujarat", type: "school", img: "assets/IMG_1814.jpg" },
        { name: "Shri D.C.C. High School", location: "Jamnagar, Gujarat", type: "school", img: "assets/IMG_1816.jpg" },
        { name: "Kumar mandir", location: "Jamnagar, Gujarat", type: "school", img: "assets/kumar_mandir.png" }
    ];

    const grid = document.getElementById('institutions-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderInstitutions(filter = 'all') {
        if (!grid) return;
        grid.innerHTML = '';
        let filtered = institutionsData;
        if(filter !== 'all') {
            filtered = institutionsData.filter(i => i.type === filter);
        }

        filtered.forEach((inst, index) => {
            const card = document.createElement('div');
            card.className = `inst-card`;
            card.style.animationDelay = `${index * 0.15}s`;
            
            card.innerHTML = `
                <div class="inst-card-img-wrapper">
                    <div class="inst-card-img" style="background-image: url('${inst.img}');"></div>
                </div>
                <div class="inst-card-content">
                    <span class="inst-badge">${inst.type}</span>
                    <h4 class="inst-name">${inst.name}</h4>
                    <div class="inst-location">
                        <i class="fa-solid fa-location-dot"></i> ${inst.location}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    renderInstitutions('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            renderInstitutions(filter);
        });
    });

    // --- Form Mock Submission ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Success!';
                btn.classList.add('bg-green');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green');
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // --- Topper Carousel ---
    const track = document.getElementById('topperTrack');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('carouselNext');
        const prevButton = document.getElementById('carouselPrev');
        const dotsNav = document.getElementById('carouselDots');
        
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if(i===0) dot.classList.add('active');
            dotsNav.appendChild(dot);
        });
        
        const dots = Array.from(dotsNav.children);
        let currentIndex = 0;

        const moveToSlide = (index) => {
            if(index < 0) index = slides.length - 1;
            if(index >= slides.length) index = 0;
            
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        };

        if(nextButton) nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        if(prevButton) prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => moveToSlide(index));
        });
        
        setInterval(() => moveToSlide(currentIndex + 1), 5000);
    }
});
