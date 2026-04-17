/**
 * Scroll Animations
 * Uses Intersection Observer API to trigger animations when elements enter the viewport
 */

document.addEventListener('DOMContentLoaded', () => {
  // Animation config
  const animationConfig = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 }
    },
    slideUp: {
      initial: { opacity: 0, transform: 'translateY(50px)' },
      animate: { opacity: 1, transform: 'translateY(0)' },
      transition: { duration: 0.6 }
    },
    slideRight: {
      initial: { opacity: 0, transform: 'translateX(-50px)' },
      animate: { opacity: 1, transform: 'translateX(0)' },
      transition: { duration: 0.6 }
    },
    slideLeft: {
      initial: { opacity: 0, transform: 'translateX(50px)' },
      animate: { opacity: 1, transform: 'translateX(0)' },
      transition: { duration: 0.6 }
    },
    zoomIn: {
      initial: { opacity: 0, transform: 'scale(0.95)' },
      animate: { opacity: 1, transform: 'scale(1)' },
      transition: { duration: 0.6 }
    },
    stagger: {
      staggerChildren: 0.1
    }
  };

  // Map sections to animation types
  const sectionAnimations = {
    // Hero section doesn't need animation as it's visible on load
    'features': 'slideUp',
    'mtp-visa-section': 'fadeIn',
    'resources-section': 'slideUp',
    'faq': 'fadeIn',
    'grow-assets-section': 'slideUp',
    'cta-section': 'fadeIn',
    // Add default animation for any other sections
    'default': 'slideUp'
  };

  // Special element animations
  const elementAnimations = {
    '.feature-card': 'zoomIn',
    '.resource-item': 'slideUp',
    '.faq-item': 'slideRight',
    '.mtp-benefit-item': 'slideRight',
    '.mtp-card-display': 'slideLeft',
    '.trust-card': 'zoomIn'
  };

  // Apply initial styles
  function applyInitialStyles() {
    // Process sections
    Object.keys(sectionAnimations).forEach(sectionId => {
      if (sectionId === 'default') return;
      
      const section = document.getElementById(sectionId);
      if (!section) return;
      
      const animationType = sectionAnimations[sectionId];
      const config = animationConfig[animationType];
      
      Object.assign(section.style, {
        opacity: config.initial.opacity || 0,
        transform: config.initial.transform || 'none',
        transition: `opacity ${config.transition.duration}s ease, transform ${config.transition.duration}s ease`
      });
    });
    
    // Process specific elements
    Object.keys(elementAnimations).forEach(selector => {
      const elements = document.querySelectorAll(selector);
      const animationType = elementAnimations[selector];
      const config = animationConfig[animationType];
      
      elements.forEach((el, index) => {
        Object.assign(el.style, {
          opacity: config.initial.opacity || 0,
          transform: config.initial.transform || 'none',
          transition: `opacity ${config.transition.duration}s ease, transform ${config.transition.duration}s ease`,
          transitionDelay: `${index * 0.1}s` // Stagger effect
        });
      });
    });
  }

  // Create and setup intersection observer
  function setupObserver() {
    const observerOptions = {
      root: null, // use viewport
      rootMargin: '0px',
      threshold: 0.15 // trigger when 15% of element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe sections
    Object.keys(sectionAnimations).forEach(sectionId => {
      if (sectionId === 'default') return;
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });
    
    // Observe specific elements
    Object.keys(elementAnimations).forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
      });
    });
    
    // Observe any element with .animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Animate the element
  function animateElement(element) {
    // Determine animation type
    let animationType = 'fadeIn'; // default animation
    
    // Check if element is a section
    if (element.id && sectionAnimations[element.id]) {
      animationType = sectionAnimations[element.id];
    } 
    // Check if element matches a specific selector
    else {
      for (const selector in elementAnimations) {
        if (element.matches(selector)) {
          animationType = elementAnimations[selector];
          break;
        }
      }
    }
    
    // Get animation config
    const config = animationConfig[animationType];
    
    // Apply animation
    Object.assign(element.style, {
      opacity: config.animate.opacity || 1,
      transform: config.animate.transform || 'none'
    });
  }

  // Initialize animations
  applyInitialStyles();
  // Small delay to ensure styles are applied before observer starts
  setTimeout(setupObserver, 100);
}); 