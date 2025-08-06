    document.addEventListener('DOMContentLoaded', function() {
      // Loading screen
      const loadingScreen = document.querySelector('.loading-screen');
      setTimeout(() => {
        loadingScreen.classList.add('loading-finished');
        document.querySelector('.main-content').classList.add('visible');
      }, 1500);

      // Navigation scroll effect
      const navbar = document.getElementById('navbar');
      const aboutSection = document.getElementById('about');
      const heroSection = document.getElementById('hero');
      
      function updateNavbar() {
        const heroPosition = heroSection.getBoundingClientRect();
        const aboutPosition = aboutSection.getBoundingClientRect();
        
        // When in hero section (top of page)
        if (heroPosition.top <= 0 && aboutPosition.top > 0) {
          navbar.className = 'narrow';
        }
        // When in about section
        else if (aboutPosition.top <= 0) {
          navbar.className = 'wide';
        }
      }

      // Fade-in animations
      const fadeElements = document.querySelectorAll('.fade-in');
      
      function checkFadeElements() {
        fadeElements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
            element.classList.add('visible');
          }
        });
      }

      // Gallery horizontal scroll effect
      const filmstrip = document.getElementById('filmstrip');
      const gallerySection = document.getElementById('gallery');
      const galleryHeight = gallerySection.offsetHeight;
      const filmstripWidth = filmstrip.offsetWidth;
      const maxTranslate = filmstripWidth - window.innerWidth + 160; // 80px padding on each side

      function updateGalleryScroll() {
        const galleryRect = gallerySection.getBoundingClientRect();
        const scrollTop = -galleryRect.top;
        
        // Only apply transform when the gallery is in view
        if (scrollTop >= 0 && scrollTop <= galleryHeight) {
          // Calculate the translateX value based on scroll position
          let translateX = -(scrollTop / galleryHeight) * maxTranslate;
          
          // Ensure we don't exceed the maximum translation
          translateX = Math.max(-maxTranslate, translateX);
          
          filmstrip.style.transform = `translateX(${translateX}px)`;
        }
      }

      // Event listeners
      window.addEventListener('scroll', () => {
        updateNavbar();
        checkFadeElements();
        updateGalleryScroll();
      });

      window.addEventListener('resize', () => {
        // Recalculate values on resize
        updateGalleryScroll();
      });

      // Initial check
      setTimeout(checkFadeElements, 100);
      
      // Prevent form submission
      document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
      });
    });
