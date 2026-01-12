// ============================================
// Jay Saadana Portfolio - Scripts
// Smooth animations and interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollAnimations();
    initNavigation();
    initSmoothScroll();
    initTypingEffect();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section contents
    document.querySelectorAll('.section-content').forEach(el => {
        observer.observe(el);
    });

    // Observe cards with staggered delay
    document.querySelectorAll('.skill-card, .work-card, .contact-link').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Navigation behavior
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Add background opacity based on scroll
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(10, 10, 11, 0.95)';
                } else {
                    nav.style.background = 'rgba(10, 10, 11, 0.8)';
                }

                // Hide/show nav on scroll
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }

                lastScrollY = window.scrollY;
                ticking = false;
            });

            ticking = true;
        }
    });

    // Add transition for smooth hide/show
    nav.style.transition = 'transform 0.3s ease, background 0.3s ease';
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for code window
function initTypingEffect() {
    const codeContent = document.querySelector('.code-content code');
    if (!codeContent) return;

    const originalHTML = codeContent.innerHTML;
    const text = codeContent.textContent;
    
    // Only run typing effect on initial load, not on every visit
    if (sessionStorage.getItem('typingDone')) {
        return;
    }

    // Clear and type
    codeContent.innerHTML = '';
    codeContent.style.opacity = '1';
    
    let index = 0;
    const speed = 15; // milliseconds per character

    function typeWriter() {
        if (index < text.length) {
            // Build up the text character by character
            const partialText = text.substring(0, index + 1);
            codeContent.textContent = partialText;
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Restore syntax highlighting
            codeContent.innerHTML = originalHTML;
            sessionStorage.setItem('typingDone', 'true');
        }
    }

    // Start typing after hero animation
    setTimeout(typeWriter, 1000);
}

// Parallax effect for gradient orbs
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// Initialize parallax on desktop only
if (window.innerWidth > 768) {
    initParallax();
}

// Add active state to nav links based on scroll position
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

initActiveNav();

// Console easter egg
console.log(`
%c✨ Hey there, fellow developer! ✨
%c
Welcome to my portfolio source code.
If you're here, you might be into vibe coding too.

Let's connect:
🐦 Twitter: @jaysaadana
🔗 GitHub: github.com/jaysaadana

Happy coding! 🚀
`, 
'color: #f97316; font-size: 16px; font-weight: bold;',
'color: #a1a1aa; font-size: 12px;'
);
