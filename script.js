// Modern Portfolio JavaScript - Pure Scroll Experience

// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        const sunIcon = this.themeToggle.querySelector('.fa-sun');
        const moonIcon = this.themeToggle.querySelector('.fa-moon');
        
        if (theme === 'dark') {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        } else {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Scroll Progress Bar
class ScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.progress-bar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        this.progressBar.style.width = scrollPercent + '%';
    }
}

// Pure Scroll Navigation - No Click Navigation
class ScrollNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 'home';
        this.init();
    }

    init() {
        // Only scroll-based navigation - no click handlers
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
        });
        
        // Initialize with home section active
        this.updateActiveSection();
    }

    updateActiveSection() {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                if (sectionId !== this.currentSection) {
                    this.setActiveSection(sectionId);
                }
            }
        });
    }

    setActiveSection(sectionId) {
        // Update navigation highlighting
        this.navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.parentElement.classList.add('active');
            }
        });
        
        this.currentSection = sectionId;
    }
}

// Smooth Animations and Intersection Observer
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry));
        }, this.observerOptions);
        this.init();
    }

    init() {
        // Observe elements for animations
        this.observeElements();
        
        // Initialize counter animations
        this.initCounters();
        
        // Initialize skill progress bars
        this.initSkillBars();
    }

    observeElements() {
        // Skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            this.observer.observe(card);
        });

        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-50px)';
            card.style.transition = `all 0.8s ease ${index * 0.2}s`;
            this.observer.observe(card);
        });

        // Stats
        const stats = document.querySelectorAll('.stat-item');
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px)';
            stat.style.transition = `all 0.6s ease ${index * 0.1}s`;
            this.observer.observe(stat);
        });

        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            item.style.transition = `all 0.6s ease ${index * 0.2}s`;
            this.observer.observe(item);
        });

        // Section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach((header, index) => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            header.style.transition = `all 0.6s ease ${index * 0.1}s`;
            this.observer.observe(header);
        });
    }

    handleIntersection(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0) translateY(0)';
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 200);
                }
            }
            
            // Trigger counter animations
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter) {
                    this.animateCounter(counter);
                }
            }
        }
    }

    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            counter.setAttribute('data-current', '0');
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const current = parseInt(counter.getAttribute('data-current') || '0');
        
        if (current < target) {
            const increment = target / 50;
            const newValue = Math.min(current + increment, target);
            counter.textContent = Math.floor(newValue) + (counter.textContent.includes('%') ? '%' : '');
            counter.setAttribute('data-current', newValue.toString());
            
            setTimeout(() => this.animateCounter(counter), 30);
        }
    }

    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
}

// Projects Carousel
class ProjectsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.projectCards = document.querySelectorAll('.project-card');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.previous());
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Auto-play carousel
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const carousel = document.querySelector('.projects-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.projectCards.length;
        this.updateCarousel();
    }

    previous() {
        this.currentIndex = (this.currentIndex - 1 + this.projectCards.length) % this.projectCards.length;
        this.updateCarousel();
    }

    updateCarousel() {
        this.projectCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentIndex) {
                setTimeout(() => {
                    card.classList.add('active');
                }, 100);
            }
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Micro-interactions and Hover Effects
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.initButtonEffects();
        this.initCardHoverEffects();
        this.initParallaxEffect();
        this.initMouseFollower();
        this.initSmoothTransitions();
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initCardHoverEffects() {
        const cards = document.querySelectorAll('.skill-card, .project-card, .stat-item, .timeline-content');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-tech .tech-icon');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initMouseFollower() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale cursor on hover
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    initSmoothTransitions() {
        // Add smooth transition classes to elements
        const elements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .timeline-content, .contact-form');
        elements.forEach(element => {
            element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Validation
        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create mailto link as fallback
            const subject = `New portfolio inquiry from ${name}`;
            const body = `From: ${name} <${email}>\n\nMessage:\n${message}`;
            const mailto = `mailto:rreshmaa6@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            this.showNotification('Opening your email client to send the message.', 'success');
            window.location.href = mailto;
            
        } catch (error) {
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.form.reset();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Page Loader
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.hideLoader();
        });
    }

    hideLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-hero);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        body:not(.loaded) {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Create loader
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <h2>Reshma</h2>
            <p>Loading Portfolio...</p>
        </div>
    `;
    document.body.appendChild(loader);

    // Initialize all components
    new ThemeManager();
    new ScrollProgress();
    new ScrollNavigation();
    new AnimationController();
    new ProjectsCarousel();
    new MicroInteractions();
    new ContactForm();
    new PageLoader();
});
