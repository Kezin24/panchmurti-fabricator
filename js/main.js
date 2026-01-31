// Hamburger menu toggle
function toggleMenu() {
    const menuPanel = document.getElementById('menuPanel');
    const hamburger = document.querySelector('.hamburger');
    menuPanel.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMenu() {
            const menuPanel = document.getElementById('menuPanel');
            const hamburger = document.querySelector('.hamburger');
            menuPanel.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const menuPanel = document.getElementById('menuPanel');
            const hamburger = document.querySelector('.hamburger');
            if (menuPanel.classList.contains('active') && 
                !menuPanel.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            // Update main nav links
            document.querySelectorAll('.nav-main a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });

            // Update menu panel links
            document.querySelectorAll('.menu-panel a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                // Let Formspree handle the submission
                // Show success message and clear form after a delay
                setTimeout(() => {
                    alert('Thank you for your inquiry! We will contact you within 24 hours.');
                    contactForm.reset(); // Clear all form fields
                }, 1000);
            });
        }

        // Certificate modal functions
        function openModal(certId) {
            document.getElementById('certificateModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(event) {
            document.getElementById('certificateModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Gallery filter functions
        function filterGallery(category) {
            const items = document.querySelectorAll('.gallery-item');
            const buttons = document.querySelectorAll('.filter-btn');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Filter items
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Lightbox functions
        let currentImageIndex = 0;
        const galleryImages = document.querySelectorAll('.gallery-item');

        function openLightbox(index) {
            currentImageIndex = index;
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox(event) {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function navigateGallery(direction) {
            currentImageIndex += direction;
            if (currentImageIndex < 0) {
                currentImageIndex = galleryImages.length - 1;
            } else if (currentImageIndex >= galleryImages.length) {
                currentImageIndex = 0;
            }
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeLightbox();
            }
            if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            }
            if (e.key === 'ArrowRight') {
                navigateGallery(1);
            }
        });

// Clients Carousel - Continuous Smooth Scroll
let carouselAnimationId;
let carouselScrollPosition = 0;
let isPaused = false;
let carouselInitialized = false;

function initContinuousCarousel() {
    const track = document.getElementById('clientsCarouselTrack');
    if (!track) {
        console.log('Carousel track not found, will retry...');
        return false;
    }
    
    const cards = track.querySelectorAll('.client-card-carousel');
    if (cards.length === 0) {
        console.log('No carousel cards found, will retry...');
        return false;
    }
    
    // Check if already initialized (prevent double initialization)
    if (carouselInitialized) {
        console.log('Carousel already initialized');
        return true;
    }
    
    console.log('Initializing carousel with', cards.length, 'cards');
    
    // Clone all cards and append to create infinite loop
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    carouselInitialized = true;
    startContinuousScroll();
    return true;
}

function startContinuousScroll() {
    const track = document.getElementById('clientsCarouselTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.client-card-carousel');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 24; // 1.5rem gap
    const itemWidth = cardWidth + gap;
    const originalCardsCount = cards.length / 2; // Half are clones
    const resetPoint = -(originalCardsCount * itemWidth);
    
    function animate() {
        if (!isPaused) {
            carouselScrollPosition -= 0.5; // Speed: lower = slower, higher = faster
            
            // Reset position for infinite loop
            if (carouselScrollPosition <= resetPoint) {
                carouselScrollPosition = 0;
            }
            
            track.style.transform = `translateX(${carouselScrollPosition}px)`;
        }
        
        carouselAnimationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function moveCarousel(direction) {
    const track = document.getElementById('clientsCarouselTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.client-card-carousel');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const itemWidth = cardWidth + gap;
    
    // Move by one card width
    carouselScrollPosition -= direction * itemWidth;
}

// Try to initialize carousel multiple times until successful
function tryInitCarousel(attempts = 0, maxAttempts = 50) {
    if (attempts >= maxAttempts) {
        console.log('Max carousel initialization attempts reached');
        return;
    }
    
    const success = initContinuousCarousel();
    
    if (!success) {
        // Try again after a short delay
        setTimeout(() => {
            tryInitCarousel(attempts + 1, maxAttempts);
        }, 100); // Try every 100ms (reduced from 200ms for faster initialization)
    } else {
        console.log('Carousel initialized successfully after', attempts, 'attempts');
    }
}

// IMMEDIATE: Try to initialize as soon as this script loads
console.log('Script loaded, attempting immediate carousel initialization...');
tryInitCarousel();

// Listen for custom event when clients section is loaded
window.addEventListener('clientsSectionLoaded', () => {
    console.log('clientsSectionLoaded event received, initializing carousel...');
    if (!carouselInitialized) {
        tryInitCarousel();
    }
});

// Initialize on DOMContentLoaded (earlier than 'load')
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting carousel initialization...');
    if (!carouselInitialized) {
        tryInitCarousel();
    }
});

// Also try on window.load as backup
window.addEventListener('load', () => {
    if (!carouselInitialized) {
        console.log('Window loaded, trying carousel initialization...');
        tryInitCarousel();
    }
});

// ADDITIONAL: Set an interval to keep trying for the first 10 seconds
let initIntervalCounter = 0;
const initInterval = setInterval(() => {
    initIntervalCounter++;
    
    if (carouselInitialized) {
        console.log('Carousel initialized, stopping interval check');
        clearInterval(initInterval);
    } else if (initIntervalCounter < 100) { // Try for 10 seconds (100 * 100ms)
        tryInitCarousel();
    } else {
        console.log('Carousel initialization interval timeout');
        clearInterval(initInterval);
    }
}, 100);

// Setup hover pause/resume
document.addEventListener('DOMContentLoaded', () => {
    // Use a mutation observer to detect when carousel is added to DOM
    const observer = new MutationObserver((mutations) => {
        const carouselWrapper = document.querySelector('.clients-carousel-wrapper');
        if (carouselWrapper && !carouselWrapper.dataset.listenersAdded) {
            carouselWrapper.dataset.listenersAdded = 'true';
            
            carouselWrapper.addEventListener('mouseenter', () => {
                isPaused = true;
            });
            
            carouselWrapper.addEventListener('mouseleave', () => {
                isPaused = false;
            });
            
            console.log('Carousel hover listeners added');
        }
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Stop animation when page is hidden (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(carouselAnimationId);
    } else if (document.getElementById('clientsCarouselTrack')) {
        startContinuousScroll();
    }
});
