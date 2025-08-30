/**
 * treatments.js - Interactive functionality for treatment pages
 * Features:
 * - Image slider functionality
 * - FAQ accordion system
 * - Animation effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== Image Slider Functionality =====
    const initImageSlider = () => {
        const sliders = document.querySelectorAll('.image-slider');
        
        sliders.forEach(slider => {
            const images = slider.querySelectorAll('.slider-image');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            
            // Only initialize if there are images
            if (images.length === 0) return;
            
            let currentIndex = 0;
            let slideInterval;
            
            // Function to show specific slide
            const showSlide = (index) => {
                // Hide all images
                images.forEach(img => img.classList.remove('active'));
                
                // Handle index boundaries
                if (index >= images.length) currentIndex = 0;
                else if (index < 0) currentIndex = images.length - 1;
                else currentIndex = index;
                
                // Show current image
                images[currentIndex].classList.add('active');
            };
            
            // Next slide function
            const nextSlide = () => {
                showSlide(currentIndex + 1);
            };
            
            // Previous slide function
            const prevSlide = () => {
                showSlide(currentIndex - 1);
            };
            
            // Set up event listeners
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            
            // Auto-advance slides every 5 seconds
            const startSlider = () => {
                slideInterval = setInterval(nextSlide, 5000);
            };
            
            // Initialize slider
            showSlide(0);
            startSlider();
            
            // Pause auto-advancement when hovering over slider
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            // Resume auto-advancement when leaving slider
            slider.addEventListener('mouseleave', () => {
                startSlider();
            });
        });
    };
    
    // ===== FAQ Accordion Functionality =====
    const initFAQAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Set initial state
            question.classList.remove('active');
            answer.classList.remove('active');
            
            question.addEventListener('click', () => {
                // Toggle active class on question
                const isActive = question.classList.toggle('active');
                
                // Toggle answer visibility
                if (isActive) {
                    answer.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-times');
                } else {
                    answer.classList.remove('active');
                    answer.style.maxHeight = '0';
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-plus');
                }
                
                // Close other FAQ items when one is opened
                if (isActive) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherQuestion = otherItem.querySelector('.faq-question');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherQuestion.querySelector('i');
                            
                            otherQuestion.classList.remove('active');
                            otherAnswer.classList.remove('active');
                            otherAnswer.style.maxHeight = '0';
                            otherIcon.classList.remove('fa-times');
                            otherIcon.classList.add('fa-plus');
                        }
                    });
                }
            });
        });
    };
    
    // ===== Animation Effects =====
    const initAnimations = () => {
        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.treatment-text, .treatment-image, .type-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for animated elements
        const animatedElements = document.querySelectorAll('.treatment-text, .treatment-image, .type-card');
        if (animatedElements.length > 0) {
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease';
            });
            
            // Trigger on load and scroll
            window.addEventListener('load', animateOnScroll);
            window.addEventListener('scroll', animateOnScroll);
        }
    };
    
    // ===== Initialize All Functionality =====
    initImageSlider();
    initFAQAccordion();
    initAnimations();
});