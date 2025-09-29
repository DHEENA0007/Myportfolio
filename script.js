// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', () => {
    const current = getCurrentSection();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function getCurrentSection() {
    const sections = ['home', 'about', 'experience', 'skills', 'contact'];
    for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                return section;
            }
        }
    }
    return 'home';
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:barath.bhojan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Barath,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Email client opened! Your message has been prepared.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags - find the complete tag
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    let tag = text.substring(i, tagEnd + 1);
                    element.innerHTML += tag;
                    i = tagEnd + 1;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const typedNameElement = document.getElementById('typed-name');
    if (typedNameElement) {
        setTimeout(() => {
            typeWriter(typedNameElement, 'Barath R', 150, () => {
                // Remove cursor blinking after typing is complete
                typedNameElement.style.borderRight = 'none';
                const cursor = typedNameElement.querySelector('.cursor');
                if(cursor) {
                    cursor.style.display = 'none';
                }
                 if (typedNameElement.classList.contains('typing')) {
                    typedNameElement.classList.remove('typing');
                }
            });
        }, 500);
    }
    
    // Initialize advanced features
    createParticleSystem();
    createMatrixEffect();
    createCodeBackground();
    createGeometricShapes();
});

// Create particle system for hero section
function createParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create matrix rain effect for about section
function createMatrixEffect() {
    const about = document.querySelector('.about');
    if (!about) return;
    
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    about.appendChild(matrixBg);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDelay = Math.random() * 8 + 's';
        column.style.animationDuration = (Math.random() * 4 + 8) + 's';
        
        let columnText = '';
        for (let j = 0; j < 30; j++) {
            columnText += characters.charAt(Math.floor(Math.random() * characters.length)) + '\n';
        }
        column.textContent = columnText;
        
        matrixBg.appendChild(column);
    }
}

// Create floating tech icons
function createFloatingIcons() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'floating-elements';
    
    const techIcons = [
        'fas fa-database',
        'fas fa-chart-line',
        'fab fa-python',
        'fas fa-code',
        'fas fa-brain',
        'fas fa-robot',
        'fas fa-network-wired',
        'fas fa-microchip'
    ];
    
    techIcons.forEach((icon, index) => {
        const iconElement = document.createElement('i');
        iconElement.className = `${icon} floating-icon`;
        iconElement.style.left = Math.random() * 100 + '%';
        iconElement.style.top = Math.random() * 100 + '%';
        iconElement.style.animationDelay = Math.random() * 8 + 's';
        iconsContainer.appendChild(iconElement);
    });
    
    hero.appendChild(iconsContainer);
}

// Create data stream visualization
function createDataStream() {
    const about = document.querySelector('.about');
    if (!about) return;
    
    setInterval(() => {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.left = Math.random() * 100 + '%';
        stream.style.animationDelay = '0s';
        about.appendChild(stream);
        
        setTimeout(() => {
            stream.remove();
        }, 2000);
    }, 1000);
}

// Terminal-like console effect
function createConsoleEffect() {
    const consoleContainer = document.createElement('div');
    consoleContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 300px;
        height: 200px;
        background: rgba(0, 0, 0, 0.9);
        border-radius: 8px;
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        padding: 10px;
        z-index: 1001;
        backdrop-filter: blur(10px);
        border: 1px solid var(--primary-color);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    
    const consoleText = document.createElement('div');
    consoleText.innerHTML = `
        <div style="color: #00ff00;">$ analyzing portfolio data...</div>
        <div style="color: #ffff00;">Loading skills: Python ████████ 95%</div>
        <div style="color: #ffff00;">Loading skills: SQL ███████ 90%</div>
        <div style="color: #ffff00;">Loading skills: Power BI ██████ 88%</div>
        <div style="color: #00ff00;">✓ Portfolio loaded successfully</div>
        <div style="color: #00ffff;">Ready for connections...</div>
    `;
    
    consoleContainer.appendChild(consoleText);
    document.body.appendChild(consoleContainer);
    
    // Show console on scroll
    let consoleShown = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300 && !consoleShown) {
            consoleContainer.style.opacity = '1';
            consoleShown = true;
            
            setTimeout(() => {
                consoleContainer.style.opacity = '0';
                setTimeout(() => {
                    consoleContainer.remove();
                }, 300);
            }, 5000);
        }
    });
}

// Interactive skill bars with animation
function createInteractiveSkillBars() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Create skill proficiency popup
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                z-index: 1002;
                max-width: 300px;
                text-align: center;
                border: 2px solid var(--primary-color);
            `;
            
            const skillName = tag.textContent;
            const proficiency = Math.floor(Math.random() * 20) + 80; // Random 80-100%
            
            popup.innerHTML = `
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${skillName}</h3>
                <div style="background: #f0f0f0; border-radius: 10px; height: 20px; overflow: hidden; margin-bottom: 1rem;">
                    <div style="background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); height: 100%; width: ${proficiency}%; transition: width 1s ease; border-radius: 10px;"></div>
                </div>
                <p style="color: var(--text-light);">Proficiency: ${proficiency}%</p>
                <button onclick="this.parentElement.remove()" style="background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; margin-top: 1rem;">Close</button>
            `;
            
            document.body.appendChild(popup);
            
            // Auto close after 3 seconds
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.remove();
                }
            }, 3000);
        });
    });
}

// Network connection visualization
function createNetworkVisualization() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb';
            ctx.fill();
        });
        
        // Draw connections
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Enhanced typing effect with more realistic coding simulation
function enhancedTypeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            // Add character with slight randomization for more natural feel
            const char = text.charAt(i);
            element.innerHTML += char;
            i++;
            
            // Vary speed slightly for more natural typing
            const randomSpeed = speed + (Math.random() - 0.5) * 50;
            setTimeout(type, Math.max(randomSpeed, 20));
        } else if (callback) {
            callback();
        }
    }
    
    // Add initial cursor
    element.style.borderRight = '2px solid var(--primary-color)';
    type();
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initMouseTracking();
        initParallaxEffect();
        initCursorTrail();
        enhanceMatrixEffect();
        createDataVisualization();
    }, 1000);
});

// Update the main initialization
window.addEventListener('load', () => {
    const typedNameElement = document.getElementById('typed-name');
    if (typedNameElement) {
        setTimeout(() => {
            enhancedTypeWriter(typedNameElement, 'Barath R', 150, () => {
                // Remove cursor blinking after typing is complete
                typedNameElement.style.borderRight = 'none';
            });
        }, 500);
    }
    
    // Initialize all advanced features
    createParticleSystem();
    createMatrixEffect();
    createCodeBackground();
    createGeometricShapes();
    createFloatingIcons();
    createDataStream();
    createConsoleEffect();
    createNetworkVisualization();
    
    setTimeout(() => {
        createInteractiveSkillBars();
    }, 2000);
});