// =================================================================
// WEBSITE INTERACTIVITY - GATESIX BY SITOTES 2025
// =================================================================

document.addEventListener('DOMContentLoaded', () => {

  /**
   * ----------------------------------------
   * 1. STICKY NAVIGATION & PARALLAX HERO BY SITOTES 2025
   * ----------------------------------------
   * Adds a background to the navigation bar and applies a parallax
   * effect to the hero background image on scroll.
   */
  const nav = document.querySelector('.main-nav');
  const heroBg = document.querySelector('.hero-bg-img');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky Nav
    if (nav) {
      if (scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }

    // Parallax Hero Background
    if (heroBg) {
      const scrollY = window.scrollY;
      const scale = 1 + scrollY / 1000;
      // Move the background image slower than the scroll speed
      heroBg.style.transform = `translateY(${scrollY * 0.5}px) scale(${scale})`;
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  /**
   * ----------------------------------------
   * 1.1. SCROLL PROGRESS INDICATOR BY SITOTES 2025
   * ----------------------------------------
   * Updates the width of the progress bar based on scroll position.
   */
  const progressBar = document.querySelector('.scroll-progress-indicator .progress-bar');

  if (progressBar) {
    const updateProgressBar = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    };

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial update
  }


  /**
   * ----------------------------------------
   * 2. REVEAL-ON-SCROLL ANIMATION BY SITOTES 2025
   * ----------------------------------------
   * Uses the Intersection Observer API to add a 'is-visible' class
   * to elements as they enter the viewport.
   */
  // Ensure revealElements only contains elements not covered by staggered reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.feature-card):not(.portfolio-item):not(.advantage-card):not(.catalog-item)');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  /**
   * ----------------------------------------
   * 2.1. STAGGERED REVEAL-ON-SCROLL ANIMATION BY SITOTES 2025
   * ----------------------------------------
   * Uses the Intersection Observer API to add a 'is-visible' class
   * to elements with 'fade-in-up-staggered' as they enter the viewport.
   */
  const staggeredRevealElements = document.querySelectorAll('.fade-in-up-staggered');

  if (staggeredRevealElements.length > 0) {
    const staggeredRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    staggeredRevealElements.forEach(element => {
      staggeredRevealObserver.observe(element);
    });
  }

  /**
   * ----------------------------------------
   * 3. ACTIVE NAVIGATION ON SCROLL BY SITOTES 2025
   * ----------------------------------------
   * Uses IntersectionObserver to highlight the nav link corresponding
   * to the section currently in the viewport.
   */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-links a');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          navLinks.forEach(link => {
            // Remove active from all links
            link.classList.remove('active');
            
            // Add active to the correct link
            // Check if the link's href matches the current section ID (for internal links)
            const linkHref = link.getAttribute('href');
            const targetId = linkHref.includes('#') ? linkHref.substring(linkHref.indexOf('#') + 1) : '';

            if (targetId === sectionId) {
              link.classList.add('active');
            } else if (linkHref.includes('katalog.html') && window.location.pathname.includes('katalog.html')) {
              link.classList.add('active');
            } else if (linkHref === 'index.html' && (sectionId === '' || window.location.pathname.endsWith('/'))) { // Handle 'HOME' link when at the very top of index.html or root
                if (link.textContent.trim().toUpperCase() === 'HOME') {
                    link.classList.add('active');
                }
            }
          });
        }
      });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, {
      rootMargin: '-50% 0px -50% 0px', // Triggers when the section is in the vertical center of the viewport
      threshold: 0
    });

    sections.forEach(section => {
      scrollObserver.observe(section);
    });
  }

  /**
   * ----------------------------------------
   * 4. TYPED.JS EFFECT BY SITOTES 2025
   * ----------------------------------------
   * Initializes the typing animation for the hero subtitle.
   */
  if (document.getElementById('typed-subtitle')) {
    const typed = new Typed('#typed-subtitle', {
      strings: [
        'Custom Printing',
        'Convection',
        'Merchandise',
        'Your Brand, Your Style'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      smartBackspace: true
    });
  }

  /**
   * ----------------------------------------
   * 5. CUSTOM CURSOR BY SITOTES 2025
   * ----------------------------------------
   * Creates a custom cursor that follows the mouse and changes
   * appearance on hover over interactive elements.
   */
  const isTouchDevice = () => {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  };

  if (!isTouchDevice()) { // Only initialize custom cursor for non-touch devices
    const customCursor = document.getElementById('custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .feature-card, .advantage-card, .catalog-item');

    if (customCursor) {
      document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
      });

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          customCursor.classList.add('grow');
        });
        element.addEventListener('mouseleave', () => {
          customCursor.classList.remove('grow');
        });
      });
    }
  }

  /**
   * ----------------------------------------
   * 6. SCROLL-TO-TOP BUTTON BY SITOTES 2025
   * ----------------------------------------
   * Shows/hides a scroll-to-top button based on scroll position.
   */
  const scrollToTopButton = document.querySelector('.scroll-to-top');

  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) { // Show button after scrolling down 200px
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
      }
    });

    scrollToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksList = document.querySelector('.main-nav .nav-links');

  if (menuToggle && navLinksList) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open'); // Toggle 'open' class on main-nav
      menuToggle.classList.toggle('open');
      document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    });

    // Close menu when a link is clicked (for smoother navigation)
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /**
   * ----------------------------------------
   * 7. SMOOTH SCROLL FOR ANCHOR LINKS BY SITOTES 2025
   * ----------------------------------------
   * Ensures smooth scrolling for all internal anchor links.
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  /**
   * ----------------------------------------
   * 8. IMAGE LAZY LOADING WITH SKELETON BY SITOTES 2025
   * ----------------------------------------
   * Uses IntersectionObserver for efficient lazy loading and removes
   * the 'loading' class once images are loaded.
   */
  const lazyImages = document.querySelectorAll('img.placeholder-image');

  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // The image src is already set in HTML, we just need to remove loading class
        // For a true lazy load, src would be set here from a data-src attribute
        if (img.complete) {
          img.classList.remove('loading');
          img.classList.add('loaded'); // Add loaded class
        } else {
          img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded'); // Add loaded class
          });
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '0px 0px 100px 0px', // Start loading when 100px from viewport
    threshold: 0
  });

  lazyImages.forEach(img => {
    lazyLoadObserver.observe(img);
  });

});