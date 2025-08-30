/**
 * Modern Skin Clinic - Enhanced JavaScript
 * Features:
 * - Smooth scrolling
 * - Mobile navigation
 * - Sticky header
 * - Testimonial slider
 * - Animation triggers
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Navigation =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
      
      // Toggle body scroll when menu is open
      document.body.style.overflow = mainNav.classList.contains('active') 
        ? 'hidden' 
        : 'auto';
    });
  
    // Close mobile menu when clicking a link
    document.querySelectorAll('#mainNav a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto';
      });
    });
  
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // ===== Sticky Header =====
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });
  
    // ===== Testimonial Slider =====
    const testimonials = [
      {
        img: 'https://randomuser.me/api/portraits/women/43.jpg',
        rating: 5,
        quote: "After struggling with acne for years, Dr. Johnson created a treatment plan that cleared my skin in just 3 months. The staff is incredibly supportive and knowledgeable.",
        name: "Emily R.",
        role: "Acne Treatment Patient"
      },
      {
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        quote: "Dr. Chen's expertise with fillers gave me natural-looking results that took years off my appearance without looking 'done'. I couldn't be happier!",
        name: "Michael T.",
        role: "Anti-Aging Patient"
      },
      {
        img: 'https://randomuser.me/api/portraits/women/65.jpg',
        rating: 5,
        quote: "The skin cancer screening was thorough and professional. When they found a suspicious mole, Dr. Williams removed it quickly and painlessly. Peace of mind is priceless.",
        name: "Sarah L.",
        role: "Skin Cancer Screening Patient"
      }
    ];
  
    let currentTestimonial = 0;
    const testimonialElement = document.querySelector('.testimonial');
    
    function updateTestimonial() {
      const t = testimonials[currentTestimonial];
      testimonialElement.innerHTML = `
        <img src="${t.img}" alt="${t.name}" class="testimonial-img">
        <div class="rating">
          ${'<i class="fas fa-star"></i>'.repeat(t.rating)}
        </div>
        <p class="testimonial-text">"${t.quote}"</p>
        <h4 class="testimonial-name">${t.name}</h4>
        <span class="testimonial-role">${t.role}</span>
      `;
      
      // Add fade animation
      testimonialElement.style.animation = 'fadeIn 0.5s ease';
      setTimeout(() => {
        testimonialElement.style.animation = '';
      }, 500);
    }
  
    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    }, 5000);
  
    // Initial load
    updateTestimonial();
  
    // ===== Animate on Scroll =====
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .doctor-card, .feature-item');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    // Set initial state
    document.querySelectorAll('.service-card, .doctor-card, .feature-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
    });
  
    // Trigger on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
  });