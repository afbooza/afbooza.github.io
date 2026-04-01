/* ============================================
   ANTONIO BUSA — PORTFOLIO
   Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  // --- Scroll-triggered reveal animations ---
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // --- Header scroll effect ---
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Mobile nav toggle ---
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Expandable experience cards ---
  function initExpandableCards() {
    document.querySelectorAll('.exp-card-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.exp-card');
        const details = card.querySelector('.exp-card-details');
        const isOpen = details.classList.contains('open');

        details.classList.toggle('open');
        btn.classList.toggle('open');
        btn.setAttribute('aria-expanded', !isOpen);
      });
    });

    // Also toggle on header click
    document.querySelectorAll('.exp-card-header').forEach((header) => {
      header.addEventListener('click', () => {
        const card = header.closest('.exp-card');
        const btn = card.querySelector('.exp-card-toggle');
        if (btn) btn.click();
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // --- Parallax-like subtle shift on hero ---
  function initHeroParallax() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight) {
            heroName.style.transform = `translateY(${scrolled * 0.12}px)`;
            heroName.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Initialize everything ---
  function init() {
    initRevealAnimations();
    initHeaderScroll();
    initMobileNav();
    initExpandableCards();
    initSmoothScroll();
    initHeroParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
