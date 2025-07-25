// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const portfolioModal = document.getElementById('portfolio-modal');
const portfolioLinks = document.querySelectorAll('.portfolio-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        document.body.style.overflow = 'visible';
        
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        
        // Initialize particles
        initParticles();
        
        // Start typing animation
        startTypingAnimation();
        
        // Animate skill bars
        animateSkillBars();
        
    }, 2000);
});

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ec4899' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#f9a8d4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }
}

// ===== TYPING ANIMATION =====
function startTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Fullstack Developer',
        'Frontend Specialist',
        'Backend Engineer',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 100 : 150;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// ===== NAVIGATION =====
// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== PORTFOLIO FILTER =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== PORTFOLIO MODAL =====
const portfolioData = {
    1: {
        title: 'Tootech',
        description: 'Sistem Diagnosa Penyakit Gigi dengan menggunakan teknologi AI dan machine learning untuk memberikan diagnosis yang akurat. Aplikasi ini dilengkapi dengan interface yang user-friendly dan database komprehensif tentang berbagai penyakit gigi.',
        image: 'assets/project1.jpg',
        tech: ['PHP', 'MySQL', 'Python', 'HTML', 'CSS'],
        demo: 'https://github.com/rafikary',
        github: 'https://github.com/rafikary'
    },
    2: {
        title: 'PulmoCare',
        description: 'Platform Diagnosa Penyakit Kanker Paru-Paru menggunakan teknologi deep learning dan computer vision untuk analisis citra medis. Sistem ini membantu tenaga medis dalam melakukan screening awal dan diagnosis kanker paru-paru dengan tingkat akurasi tinggi.',
        image: 'assets/project2.jpg',
        tech: ['PHP', 'Flask', 'Python', 'HTML', 'CSS'],
        demo: 'https://github.com/rafikary',
        github: 'https://github.com/rafikary'
    },
    3: {
        title: 'Dentist',
        description: 'Aplikasi mobile untuk pemesanan dokter gigi dengan fitur scheduling yang fleksibel, profile dokter lengkap, dan sistem notifikasi appointment. Dibangun dengan Flutter untuk cross-platform compatibility dan Laravel sebagai backend API.',
        image: 'assets/project3.jpg',
        tech: ['Flutter', 'Laravel'],
        demo: 'https://github.com/rafikary',
        github: 'https://github.com/rafikary'
    },
    4: {
        title: 'E-Commerce Toko Parfum',
        description: 'Aplikasi pemasaran toko parfum dengan nuansa simple dan elegant. Fitur lengkap mulai dari katalog produk, sistem pembayaran, manajemen inventory, hingga dashboard admin untuk monitoring penjualan.',
        image: 'assets/project4.jpg',
        tech: ['Laravel', 'API', 'PHP'],
        demo: 'https://github.com/rafikary',
        github: 'https://github.com/rafikary'
    },
    5: {
        title: 'Admin Cakeshop',
        description: 'Aplikasi untuk admin mengelola dan membuat laporan toko kue. Sistem ini dilengkapi dengan fitur manajemen produk, tracking pesanan, laporan penjualan, dan dashboard analytics untuk membantu owner dalam mengambil keputusan bisnis.',
        image: 'assets/project5.jpg',
        tech: ['CSS', 'HTML', 'JavaScript', 'PHP'],
        demo: 'https://github.com/rafikary',
        github: 'https://github.com/rafikary'
    },
    6: {
        title: 'RumahVelg',
        description: 'Aplikasi untuk pemasaran velg mobil dengan katalog lengkap berbagai jenis velg, sistem pencarian berdasarkan merk mobil, dan fitur konsultasi online. Dibangun menggunakan Laravel dengan admin panel yang user-friendly.',
        image: 'assets/project6.jpg',
        tech: ['Laravel'],
        demo: 'https://github.com/rafikary',
        github: 'https://github.com/rafikary'
    }
};

portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = portfolioData[projectId];
        
        if (project) {
            // Populate modal with project data
            document.getElementById('modal-img').src = project.image;
            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('modal-description').textContent = project.description;
            document.getElementById('modal-demo').href = project.demo;
            document.getElementById('modal-github').href = project.github;
            
            // Populate tech stack
            const techContainer = document.getElementById('modal-tech');
            techContainer.innerHTML = '';
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techContainer.appendChild(span);
            });
            
            // Show modal
            portfolioModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    portfolioModal.style.display = 'none';
    document.body.style.overflow = 'visible';
});

window.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        portfolioModal.style.display = 'none';
        document.body.style.overflow = 'visible';
    }
});

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    try {
        // Send form data to PHP backend
        const response = await fetch('contact.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message, 'success');
            contactForm.reset();
        } else {
            showNotification(result.message, 'error');
        }
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Terjadi kesalahan jaringan. Silakan coba lagi.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SMOOTH SCROLLING FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        // Your scroll handling code here
    }, 10);
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/profile.jpg',
        'assets/about.jpg',
        'assets/project1.jpg',
        'assets/project2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(1turn)';
        document.body.style.transition = 'transform 2s ease';
        
        setTimeout(() => {
            document.body.style.transform = 'rotate(0turn)';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 2000);
        }, 2000);
        
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        konamiCode = [];
    }
});

// ===== ANALYTICS TRACKING =====
function trackEvent(category, action, label = '') {
    // Google Analytics or other tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track portfolio views
portfolioLinks.forEach(link => {
    link.addEventListener('click', () => {
        const projectId = link.getAttribute('data-project');
        trackEvent('Portfolio', 'View Project', `Project ${projectId}`);
    });
});

// Track contact form submissions
contactForm.addEventListener('submit', () => {
    trackEvent('Contact', 'Form Submit', 'Contact Form');
});

// ===== RESPONSIVE UTILITIES =====
class ResponsiveHandler {
    constructor() {
        this.breakpoints = {
            xs: 575,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.init();
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.xs) return 'xs';
        if (width <= this.breakpoints.md) return 'sm';
        if (width <= this.breakpoints.lg) return 'md';
        if (width <= this.breakpoints.xl) return 'lg';
        return 'xl';
    }
    
    init() {
        this.handleNavigation();
        this.handleParticles();
        this.handleModals();
        this.handleTouchEvents();
        
        window.addEventListener('resize', debounce(() => {
            const newBreakpoint = this.getCurrentBreakpoint();
            if (newBreakpoint !== this.currentBreakpoint) {
                this.currentBreakpoint = newBreakpoint;
                this.handleBreakpointChange();
            }
        }, 250));
    }
    
    handleNavigation() {
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.currentBreakpoint === 'xs' || this.currentBreakpoint === 'sm') {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    handleParticles() {
        // Reduce particles on mobile devices
        if (typeof particlesJS !== 'undefined') {
            const particleCount = this.currentBreakpoint === 'xs' ? 30 : 
                                this.currentBreakpoint === 'sm' ? 50 : 80;
            
            // Update particle configuration based on screen size
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.number.value = particleCount;
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }
    }
    
    handleModals() {
        // Improve modal behavior on mobile
        const modal = document.getElementById('portfolio-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Add swipe to close on mobile
            if ('ontouchstart' in window) {
                let startY = 0;
                let currentY = 0;
                let isDragging = false;
                
                modal.addEventListener('touchstart', (e) => {
                    startY = e.touches[0].clientY;
                    isDragging = true;
                });
                
                modal.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    currentY = e.touches[0].clientY;
                    const diff = startY - currentY;
                    
                    if (diff < -100) { // Swipe down
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        isDragging = false;
                    }
                });
                
                modal.addEventListener('touchend', () => {
                    isDragging = false;
                });
            }
        }
    }
    
    handleTouchEvents() {
        // Add touch events for better mobile interaction
        if ('ontouchstart' in window) {
            // Add touch feedback to buttons
            document.querySelectorAll('.btn, .filter-btn, .nav-link').forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                element.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
            
            // Improve portfolio item interaction on touch devices
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.addEventListener('touchstart', function() {
                    const overlay = this.querySelector('.portfolio-overlay');
                    if (overlay) {
                        overlay.style.opacity = '1';
                    }
                });
            });
        }
    }
    
    handleBreakpointChange() {
        // Handle specific changes when breakpoint changes
        this.handleParticles();
        
        // Reset navigation state
        if (this.currentBreakpoint !== 'xs' && this.currentBreakpoint !== 'sm') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Trigger AOS refresh
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // Report slow loading
            if (loadTime > 3000) {
                console.warn('Page is loading slowly. Consider optimizations.');
            }
        });
    }
}

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Console welcome message
console.log('Portfolio loaded successfully!');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize responsive handler
    new ResponsiveHandler();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Monitor performance
    monitorPerformance();
    
    console.log('Portfolio website initialized successfully!');
});
