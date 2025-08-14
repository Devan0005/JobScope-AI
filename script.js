// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeButtonEffects();
    initializeMobileMenu();
    initializeApplicationSystem();
    initializeChatbot();
    initializeQuotesCarousel();
    initializeEnhancedHero();
    initializeMatrixRain();
});

// Animation on Scroll (AOS) implementation
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Navigation functionality
function initializeNavigation() {
    // Add application link to existing nav links
    const applicationLink = document.querySelector('.nav-link[href="#application"]');
    if (!applicationLink) {
        const navMenu = document.querySelector('.nav-menu');
        const applicationItem = document.createElement('li');
        applicationItem.className = 'nav-item';
        applicationItem.innerHTML = '<a href="#application" class="nav-link">Apply Now</a>';
        
        // Insert before contact link
        const contactItem = navMenu.querySelector('li:last-child');
        navMenu.insertBefore(applicationItem, contactItem);
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Scroll effects for navbar
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for navbar styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Button effects and interactions
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', createRippleEffect);
        
        // Add hover animations
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('btn-secondary')) {
                button.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Specific button actions
    const exploreJobsBtn = document.getElementById('exploreJobsBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    if (exploreJobsBtn) {
        exploreJobsBtn.addEventListener('click', () => {
            scrollToSection('#careers');
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            scrollToSection('#about');
        });
    }
    
    // Career buttons
    const careerButtons = document.querySelectorAll('.career-btn');
    careerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Simulate job search functionality
            showJobModal(btn.closest('.career-card'));
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Mobile menu functionality
function initializeMobileMenu() {
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const target = document.querySelector(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Show job modal (placeholder functionality)
function showJobModal(careerCard) {
    const careerTitle = careerCard.querySelector('h3').textContent;
    const roles = Array.from(careerCard.querySelectorAll('.career-roles li')).map(li => li.textContent);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'job-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${careerTitle} Opportunities</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Explore exciting opportunities in ${careerTitle.toLowerCase()}:</p>
                <ul class="job-list">
                    ${roles.map(role => `
                        <li class="job-item">
                            <span class="job-title">${role}</span>
                            <span class="job-location">Multiple Locations</span>
                            <button class="apply-btn">Apply Now</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .job-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid #eee;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .job-list {
                list-style: none;
                margin-top: 1.5rem;
            }
            
            .job-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                border: 1px solid #eee;
                border-radius: 10px;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
            }
            
            .job-item:hover {
                border-color: var(--cognizant-blue);
                box-shadow: 0 5px 15px rgba(0, 102, 204, 0.1);
            }
            
            .job-title {
                font-weight: 600;
                color: var(--text-dark);
            }
            
            .job-location {
                color: var(--text-light);
                font-size: 0.9rem;
            }
            
            .apply-btn {
                background: var(--cognizant-blue);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .apply-btn:hover {
                background: var(--cognizant-dark-blue);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Apply button functionality
    modal.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const jobTitle = e.target.closest('.job-item').querySelector('.job-title').textContent;
            showApplicationForm(jobTitle);
            closeModal();
        });
    });
}

// Show application form (placeholder)
function showApplicationForm(jobTitle) {
    alert(`Application form for ${jobTitle} would open here. This is a demo of the Cognizant careers site.`);
}

// Parallax effect for hero section
function initializeParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
        
        orbs.forEach((orb, index) => {
            const speed = 0.2 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax after DOM load
document.addEventListener('DOMContentLoaded', initializeParallax);

// Add CSS for ripple effect
const rippleCSS = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-link.active {
        color: var(--cognizant-blue);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-item {
            margin: 1rem 0;
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
        
        body.menu-open {
            overflow: hidden;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

// Add the CSS to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate');
    }
});

// Enhanced Hero Animations and Counter
function initializeEnhancedHero() {
    // Animated Counter
    animateCounters();
    
    // Typing Effect
    initializeTypingEffect();
    
    // Button Interactions
    enhanceButtonEffects();
    
    // AI Avatar Interactions
    initializeAIAvatar();
    
    // Scroll to next section
    initializeScrollIndicator();
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetCount = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, targetCount);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(1) + 'K';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 40);
}

function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    const texts = [
        'Meet JobScope AI',
        'Your Career Companion',
        'AI-Powered Matching',
        'Smart Job Search'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    setTimeout(typeText, 1000);
}

function enhanceButtonEffects() {
    const glowBtn = document.querySelector('.btn-glow');
    const glassBtn = document.querySelector('.btn-glass');
    
    if (glowBtn) {
        glowBtn.addEventListener('mousemove', (e) => {
            const rect = glowBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glowBtn.style.setProperty('--mouse-x', x + 'px');
            glowBtn.style.setProperty('--mouse-y', y + 'px');
        });
        
        // Particle effect on click
        glowBtn.addEventListener('click', (e) => {
            createParticleExplosion(e.target, e);
        });
    }
    
    if (glassBtn) {
        glassBtn.addEventListener('click', (e) => {
            const ripple = glassBtn.querySelector('.btn-ripple');
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            setTimeout(() => {
                ripple.style.width = '0';
                ripple.style.height = '0';
            }, 600);
        });
    }
}

function createParticleExplosion(button, event) {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        button.appendChild(particle);
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 50 + Math.random() * 30;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

function initializeAIAvatar() {
    const avatar = document.querySelector('.ai-avatar');
    const speechBubble = document.querySelector('.ai-speech-bubble');
    
    if (!avatar || !speechBubble) return;
    
    const messages = [
        "Hi! I'm JobScope AI. Ready to revolutionize your career? 🚀",
        "Upload your resume and I'll find perfect job matches! 📄",
        "I can explain complex job descriptions in simple terms 💬",
        "Ask me anything about your career journey! 🤔",
        "Let's find your dream job together! ✨"
    ];
    
    let messageIndex = 0;
    
    function changeMessage() {
        const speechText = speechBubble.querySelector('.speech-text');
        speechText.style.opacity = '0';
        
        setTimeout(() => {
            speechText.textContent = messages[messageIndex];
            speechText.style.opacity = '1';
            messageIndex = (messageIndex + 1) % messages.length;
        }, 300);
    }
    
    // Change message every 5 seconds
    setInterval(changeMessage, 5000);
    
    // Click to interact
    avatar.addEventListener('click', () => {
        toggleChatbot();
        avatar.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            avatar.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
    });
}

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.jobscope-intro-section');
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Hide indicator when scrolled
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - (scrolled / 300));
        scrollIndicator.style.opacity = opacity;
    });
}

// Live data updates
function initializeLiveUpdates() {
    // Update counter numbers periodically
    setInterval(() => {
        const liveCounter = document.querySelector('.counter-number');
        if (liveCounter) {
            const current = parseInt(liveCounter.textContent);
            liveCounter.textContent = current + Math.floor(Math.random() * 3);
        }
    }, 5000);
    
    // Update progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        setInterval(() => {
            const currentWidth = parseInt(bar.style.width) || 89;
            const newWidth = Math.min(95, currentWidth + Math.floor(Math.random() * 2));
            bar.style.width = newWidth + '%';
        }, 3000);
    });
}

// Add floating animation to cards
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.card-animated');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = `translateY(-30px) scale(1.08) rotateY(5deg)`;
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px) scale(1) rotateY(0deg)';
            card.style.zIndex = '1';
        });
        
        // Add random floating motion
        setInterval(() => {
            const randomY = Math.sin(Date.now() * 0.001 + index) * 10;
            if (!card.matches(':hover')) {
                card.style.transform = `translateY(${randomY}px)`;
            }
        }, 100);
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Add to existing initialization
    setTimeout(() => {
        initializeEnhancedHero();
        initializeLiveUpdates();
        enhanceFloatingCards();
    }, 500);
});

// Add matrix rain content
function initializeMatrixRain() {
    const columns = document.querySelectorAll('.matrix-column');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    columns.forEach((column, index) => {
        setInterval(() => {
            let content = '';
            for (let i = 0; i < 20; i++) {
                content += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            column.textContent = content;
        }, 100 + index * 50);
    });
}

// Initialize matrix rain
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeMatrixRain, 1000);
});

// Enhanced button click effects
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.getElementById('exploreJobsBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // Animate to careers section with AI effect
            const careersSection = document.getElementById('careers');
            if (careersSection) {
                careersSection.scrollIntoView({ behavior: 'smooth' });
                // Trigger AI job matching demo
                setTimeout(() => {
                    showNotification('🤖 AI is analyzing available jobs for you...', 'info');
                }, 1000);
            }
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Show demo modal
            showConversationDemo();
        });
    }
});
