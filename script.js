// Document ready event handler - this will run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make sure the theme gets applied immediately on page load
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Initialize all components
    initPortfolio();
});

// Initialize all portfolio functionality
function initPortfolio() {
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
    initAnimations();
    initBackToTop();
    initTypewriter();
    initParticlesJS();
}

// Initialize the theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) return;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const body = document.documentElement; // Using documentElement (html) for more consistent theming

    // Check for saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    // Set the initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.setAttribute('data-theme', 'dark');
        
        // Make sure we have the correct icon by removing all possible icon classes first
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add('fa-sun');
    } else {
        body.setAttribute('data-theme', 'light');
        
        // Make sure we have the correct icon by removing all possible icon classes first
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    // Add toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
}

// Helper function for hero title typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize smooth scrolling
function initSmoothScroll() {
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
    
    // Apply typing effect to hero h2
    const heroH2 = document.querySelector('.hero-content h2');
    if (heroH2) {
        const originalText = heroH2.textContent;
        heroH2.textContent = '';
        setTimeout(() => typeWriter(heroH2, originalText), 500);
    }
}

// Initialize mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Animated counters function
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target % 1 === 0 ? target : target.toFixed(1);
                clearInterval(timer);
            } else {
                element.textContent = start % 1 === 0 ? Math.floor(start) : start.toFixed(1);
            }
        }, 16);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Animate stats
                if (element.classList.contains('stat')) {
                    const h3 = element.querySelector('h3');
                    if (h3) {
                        const target = parseFloat(h3.textContent);
                        if (!isNaN(target)) {
                            animateCounter(h3, target);
                        }
                        observer.unobserve(element);
                    }
                }

                // Add fade-in class
                element.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.stat, .timeline-item, .skills-category, .contact-item').forEach(el => {
        observer.observe(el);
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Initialize progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width;
            }
        });
    };

    // Use Intersection Observer for animating elements when they come into view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress-container')) {
                    animateProgressBars();
                }
                entry.target.classList.add('animate');
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-progress-container, .skill-card, .certification-card').forEach(el => {
        skillsObserver.observe(el);
    });

    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
    
    // Form validation for contact forms
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = contactForm.querySelector('input[name="name"]')?.value.trim();
            const email = contactForm.querySelector('input[name="email"]')?.value.trim();
            const subject = contactForm.querySelector('input[name="subject"]')?.value.trim();
            const message = contactForm.querySelector('textarea[name="message"]')?.value.trim();

            if (!name || !email || !subject || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Form will submit via mailto
        });
    }
}

// Initialize typewriter effect
function initTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) return;
    
    const phrases = [
        'Data Analyst',
        'Digital Marketer',
        'SEO Specialist',
        'BI Professional'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let newTextDelay = 2000; // Delay between typing new phrases

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        // Add or remove characters based on whether we're deleting or typing
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Set typing speed (faster when deleting)
        let speed = isDeleting ? typingDelay / 2 : typingDelay;
        
        // If we've finished typing the phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            speed = newTextDelay; // Wait before starting to delete
        }
        
        // If we've finished deleting the phrase
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to the next phrase
        }
        
        setTimeout(typeWriter, speed);
    }

    setTimeout(typeWriter, 1000);
}

// Initialize particles.js
function initParticlesJS() {
    if (document.getElementById('particles-js')) {
        // Check if particlesJS is defined
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "push": {
                            "particles_nb": 4
                        }
                    }
                },
                "retina_detect": true
            });
        } else {
            console.warn('particlesJS is not defined. Make sure you include the particles.js library.');
        }
    }
}