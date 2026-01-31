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

// Clients Carousel Functions
let currentCarouselIndex = 0;
let carouselInterval;

function moveCarousel(direction) {
    const track = document.getElementById('clientsCarouselTrack');
    const cards = track.querySelectorAll('.client-card-carousel');
    const cardWidth = cards[0].offsetWidth;
    const gap = 24; // 1.5rem gap
    const itemWidth = cardWidth + gap;
    
    // Calculate visible cards based on screen width
    const containerWidth = track.parentElement.offsetWidth;
    let visibleCards = 5;
    
    if (window.innerWidth <= 1200) visibleCards = 4;
    if (window.innerWidth <= 968) visibleCards = 3;
    if (window.innerWidth <= 768) visibleCards = 2;
    if (window.innerWidth <= 480) visibleCards = 1;
    
    const maxIndex = cards.length - visibleCards;
    
    currentCarouselIndex += direction;
    
    // Loop carousel
    if (currentCarouselIndex < 0) {
        currentCarouselIndex = maxIndex;
    } else if (currentCarouselIndex > maxIndex) {
        currentCarouselIndex = 0;
    }
    
    const offset = -(currentCarouselIndex * itemWidth);
    track.style.transform = `translateX(${offset}px)`;
    
    // Reset auto-scroll timer
    clearInterval(carouselInterval);
    startCarouselAutoScroll();
}

function startCarouselAutoScroll() {
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 3000); // Auto-scroll every 3 seconds
}

// Start auto-scroll when page loads
window.addEventListener('load', () => {
    if (document.getElementById('clientsCarouselTrack')) {
        startCarouselAutoScroll();
    }
});

// Pause auto-scroll on hover
document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.querySelector('.clients-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            startCarouselAutoScroll();
        });
    }
});
