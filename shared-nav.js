/**
 * Koleex Brand Guidelines — Shared Navigation System
 * Handles dropdown menus, blur overlay, mobile menu, language switcher,
 * scroll progress bar, scroll reveal animations, and page navigation.
 */

(function() {
  'use strict';

  // ============================================================
  // NAVIGATION SECTION DATA
  // ============================================================
  const NAV_SECTIONS = {
    foundation: {
      label: 'Foundation',
      items: [
        { num: '01', name: 'Introduction',             icon: 'fa-book-open',            href: '01-introduction.html' },
        { num: '02', name: 'Brand Overview',            icon: 'fa-eye',                  href: '02-brand-overview.html' },
        { num: '03', name: 'Meaning of KOLEEX',         icon: 'fa-signature',            href: '03-meaning-of-koleex.html' },
        { num: '04', name: 'Brand Philosophy',           icon: 'fa-lightbulb',            href: '04-brand-philosophy.html' },
        { num: '05', name: 'Design Philosophy',          icon: 'fa-compass-drafting',     href: '05-design-philosophy.html' },
        { num: '06', name: 'Brand Personality',          icon: 'fa-fingerprint',          href: '06-brand-personality.html' },
        { num: '07', name: 'Tone of Voice',              icon: 'fa-comment-dots',         href: '07-tone-of-voice.html' },
        { num: '08', name: 'Brand Language',             icon: 'fa-language',             href: '08-brand-language.html' },
        { num: '09', name: 'Brand Slogan',               icon: 'fa-quote-right',          href: '09-brand-slogan.html' }
      ]
    },
    visual: {
      label: 'Visual Identity',
      items: [
        { num: '10', name: 'Logo System',                icon: 'fa-vector-square',        href: '10-logo-system.html' },
        { num: '11', name: 'Logo Usage Rules',            icon: 'fa-ruler-combined',       href: '11-logo-usage.html' },
        { num: '12', name: "Logo Do & Don't",             icon: 'fa-ban',                  href: '12-logo-donts.html' },
        { num: '13', name: 'Color System',                icon: 'fa-droplet',              href: '13-color-system.html' },
        { num: '14', name: 'Typography System',           icon: 'fa-font',                 href: '14-typography-system.html' },
        { num: '15', name: 'Layout & Grid System',        icon: 'fa-border-all',           href: '15-layout-grid.html' },
        { num: '16', name: 'Graphic Elements System',     icon: 'fa-shapes',               href: '16-graphic-elements.html' },
        { num: '17', name: 'Background Style',            icon: 'fa-swatchbook',           href: '17-background-style.html' },
        { num: '18', name: 'Photography Style',           icon: 'fa-camera',               href: '17-photography-style.html' },
        { num: '19', name: 'Icon System',                 icon: 'fa-icons',                href: '18-icon-system.html' }
      ]
    },
    digital: {
      label: 'Digital & Media',
      items: [
        { num: '20', name: 'UI/UX Design System',                icon: 'fa-mobile-screen-button',  href: '19-ui-components.html' },
        { num: '21', name: 'Stationery & Corporate Materials',   icon: 'fa-pen-ruler',             href: '20-stationery-corporate.html' },
        { num: '22', name: 'Website Design Guidelines',          icon: 'fa-globe',                 href: '22-website-guidelines.html' },
        { num: '23', name: 'Social Media Guidelines',            icon: 'fa-share-nodes',           href: '23-social-media.html' },
        { num: '24', name: 'Print & Marketing Materials',        icon: 'fa-print',                 href: '24-print-marketing.html' },
        { num: '25', name: 'Packaging & Labels Guidelines',      icon: 'fa-box-open',              href: '25-packaging-labels.html' },
        { num: '26', name: 'Exhibition & Environmental Design',  icon: 'fa-store',                 href: '26-exhibition-environmental.html' },
        { num: '27', name: 'Motion & Animation Style',           icon: 'fa-wand-magic-sparkles',   href: '27-motion-animation.html' }
      ]
    },
    management: {
      label: 'Management',
      items: [
        { num: '28', name: 'Brand Applications',                    icon: 'fa-layer-group',       href: '28-brand-applications.html' },
        { num: '29', name: 'Brand Touchpoints',                     icon: 'fa-hand-pointer',      href: '29-brand-touchpoints.html' },
        { num: '30', name: 'File Naming & Structure',               icon: 'fa-folder-tree',       href: '30-file-naming.html' },
        { num: '31', name: 'Brand Architecture',                    icon: 'fa-diagram-project',   href: '31-brand-architecture.html' },
        { num: '32', name: 'Sub-Brands & Product Naming System',    icon: 'fa-tags',              href: '32-sub-brands.html' },
        { num: '33', name: 'Brand Ownership & Trademark',           icon: 'fa-shield-halved',     href: '33-brand-ownership.html' },
        { num: '34', name: 'Brand Designer & Credits',              icon: 'fa-user-pen',          href: '34-brand-credits.html' },
        { num: '35', name: 'Brand Governance',                      icon: 'fa-gavel',             href: '35-brand-governance.html' },
        { num: '36', name: 'Final Brand Summary',                   icon: 'fa-flag-checkered',    href: '36-final-summary.html' }
      ]
    }
  };

  // ============================================================
  // INIT NAV — main entry point
  // ============================================================
  function initNav() {
    _setupDropdownOverlay();
    _setupMobileMenu();
    _setupLanguageSwitcher();
    _setupMobileLangSwitcher();
    _setupScrollProgress();
    _setupScrollReveal();
    _fixDropdownLinks();
  }

  // ============================================================
  // FIX DROPDOWN LINKS — ensure all nav links point to correct HTML files
  // ============================================================
  function _fixDropdownLinks() {
    // Desktop dropdown items
    document.querySelectorAll('.nav-dropdown-item').forEach(function(link) {
      const text = link.textContent.trim();
      // Extract the section number or name
      const numMatch = text.match(/^(\d{2})/);
      if (numMatch) {
        const num = numMatch[1];
        const item = _findItemByNum(num);
        if (item && item.href !== '#') {
          link.setAttribute('href', item.href);
        }
      }
    });

    // Mobile menu links
    document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
      const text = link.textContent.trim();
      const numMatch = text.match(/(\d{2})/);
      if (numMatch) {
        const num = numMatch[1];
        const item = _findItemByNum(num);
        if (item && item.href !== '#') {
          link.setAttribute('href', item.href);
        }
      }
    });

    // TOC cards on index page
    document.querySelectorAll('.toc-card').forEach(function(card) {
      const numEl = card.querySelector('.toc-card-num');
      if (numEl) {
        const numMatch = numEl.textContent.match(/(\d{2})/);
        if (numMatch) {
          const item = _findItemByNum(numMatch[1]);
          if (item && item.href !== '#') {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
              e.preventDefault();
              window.location.href = item.href;
            });
            // If the card is wrapped in an <a> tag, fix it
            if (card.tagName === 'A') {
              card.setAttribute('href', item.href);
            }
          }
        }
      }
    });
  }

  /**
   * Find a navigation item by its section number (e.g., '01', '10').
   */
  function _findItemByNum(num) {
    for (var cat in NAV_SECTIONS) {
      var items = NAV_SECTIONS[cat].items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].num === num) return items[i];
      }
    }
    return null;
  }

  // ============================================================
  // DROPDOWN BLUR OVERLAY
  // ============================================================
  function _setupDropdownOverlay() {
    const overlay = document.querySelector('.nav-blur-overlay');
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    if (!overlay || !dropdowns.length) return;

    dropdowns.forEach(function(dd) {
      dd.addEventListener('mouseenter', function() {
        overlay.classList.add('active');
      });
      dd.addEventListener('mouseleave', function() {
        overlay.classList.remove('active');
      });
    });

    // Close overlay when clicking on it
    overlay.addEventListener('click', function() {
      overlay.classList.remove('active');
    });
  }

  // ============================================================
  // MOBILE MENU
  // ============================================================
  function _setupMobileMenu() {
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var mobileMenu = document.getElementById('mobileMenu');

    if (!hamburgerBtn || !mobileMenu) return;

    // Dynamically build mobile menu from NAV_SECTIONS data
    var inner = mobileMenu.querySelector('.mobile-menu-inner');
    if (inner) {
      var html = '<a href="index.html" class="mobile-menu-link" style="font-weight:700;margin-bottom:8px"><i class="fa-solid fa-house"></i> Home</a>';
      var cats = ['foundation','visual','digital','management'];
      for (var c = 0; c < cats.length; c++) {
        var cat = NAV_SECTIONS[cats[c]];
        if (!cat) continue;
        html += '<div class="mobile-menu-section"><div class="mobile-menu-label">' + cat.label + '</div>';
        for (var i = 0; i < cat.items.length; i++) {
          var item = cat.items[i];
          html += '<a href="' + item.href + '" class="mobile-menu-link"><i class="fa-solid ' + item.icon + '"></i> ' + item.num + ' ' + item.name + '</a>';
        }
        html += '</div>';
      }
      inner.innerHTML = html;
    }

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        mobileMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('active');
        hamburgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu when clicking a link
    mobileMenu.addEventListener('click', function(e) {
      if (e.target.closest('.mobile-menu-link')) {
        mobileMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================================
  // LANGUAGE SWITCHER
  // ============================================================
  function _setupLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.kx-lang-btn');
    if (!langBtns.length) return;

    langBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const lang = btn.getAttribute('data-lang');

        // Update active state for ALL lang-btn elements (desktop + mobile)
        document.querySelectorAll('.kx-lang-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        document.querySelectorAll('.kx-lang-btn[data-lang="' + lang + '"]').forEach(function(b) {
          b.classList.add('active');
        });

        // Sync mobile lang dropdown
        document.querySelectorAll('.mobile-lang-opt').forEach(function(o) { o.classList.remove('active'); });
        var mobileOpt = document.querySelector('.mobile-lang-opt[data-lang="' + lang + '"]');
        if (mobileOpt) mobileOpt.classList.add('active');

        // Call translation system
        if (typeof window.translatePage === 'function') {
          window.translatePage(lang);
        }

        // Store preference
        try {
          localStorage.setItem('koleex-lang', lang);
        } catch(e) {}
      });
    });

    // Restore previously selected language
    try {
      var savedLang = localStorage.getItem('koleex-lang');
      if (savedLang && savedLang !== 'en') {
        // Set active button
        document.querySelectorAll('.kx-lang-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        document.querySelectorAll('.kx-lang-btn[data-lang="' + savedLang + '"]').forEach(function(b) {
          b.classList.add('active');
        });
        // Sync mobile lang dropdown
        document.querySelectorAll('.mobile-lang-opt').forEach(function(o) { o.classList.remove('active'); });
        var mobileOpt = document.querySelector('.mobile-lang-opt[data-lang="' + savedLang + '"]');
        if (mobileOpt) mobileOpt.classList.add('active');
        // Translate after a short delay to let the page render first
        setTimeout(function() {
          if (typeof window.translatePage === 'function') {
            window.translatePage(savedLang);
          }
        }, 100);
      }
    } catch(e) {}
  }

  // ============================================================
  // MOBILE LANGUAGE SWITCHER
  // ============================================================
  function _setupMobileLangSwitcher() {
    var trigger = document.getElementById('mobileLangTrigger');
    var dropdown = document.getElementById('mobileLangDropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    dropdown.querySelectorAll('.mobile-lang-opt').forEach(function(opt) {
      opt.addEventListener('click', function() {
        var lang = this.getAttribute('data-lang');
        // Sync with desktop buttons
        document.querySelectorAll('.kx-lang-btn').forEach(function(b) { b.classList.remove('active'); });
        var desktopBtn = document.querySelector('.kx-lang-btn[data-lang="' + lang + '"]');
        if (desktopBtn) { desktopBtn.classList.add('active'); desktopBtn.click(); }
        // Update mobile active state
        dropdown.querySelectorAll('.mobile-lang-opt').forEach(function(o) { o.classList.remove('active'); });
        this.classList.add('active');
        dropdown.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  // ============================================================
  // SCROLL PROGRESS BAR
  // ============================================================
  function _setupScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // ============================================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================================
  function _setupScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Use a simple scroll handler as fallback alongside IntersectionObserver
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    reveals.forEach(function(el) {
      observer.observe(el);
    });

    // Fallback: check on scroll + initial check after short delay
    function checkReveals() {
      var viewHeight = window.innerHeight;
      reveals.forEach(function(el) {
        if (el.classList.contains('visible')) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < viewHeight + 100) {
          el.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', checkReveals, { passive: true });
    window.addEventListener('resize', checkReveals, { passive: true });
    setTimeout(checkReveals, 200);
    setTimeout(checkReveals, 500);
    setTimeout(checkReveals, 1500);
  }

  // ============================================================
  // SCROLL ANCHOR BAR (side dots)
  // ============================================================
  function initAnchorHandlers(anchorBar) {
    // Show/hide
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 200) {
        anchorBar.classList.add('visible');
      } else {
        anchorBar.classList.remove('visible');
      }
      // Update active dot
      var dots = anchorBar.querySelectorAll('.scroll-anchor-dot');
      var currentIdx = 0;
      dots.forEach(function(dot, idx) {
        var targetId = dot.getAttribute('data-target');
        var target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          var rect = target.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) currentIdx = idx;
        }
      });
      dots.forEach(function(d, i) { d.classList.toggle('active', i === currentIdx); });
    }, { passive: true });
    // Click
    anchorBar.querySelectorAll('.scroll-anchor-dot[data-target]').forEach(function(dot) {
      dot.addEventListener('click', function() {
        var target = document.getElementById(dot.getAttribute('data-target'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function initScrollAnchor() {
    var anchorBar = document.getElementById('scrollAnchor');
    if (!anchorBar) return;

    // Determine which sections to track
    var isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    var sections;

    if (isHomePage) {
      // Home page — pick up top-level sections and TOC categories only
      // Use > to avoid nested subsections inside embedded content
      sections = document.querySelectorAll('section.hero, section.stats-section, section.role-section, section.toc, section.section[id]');
    } else {
      // Section pages — all subsections + hero + page header
      sections = document.querySelectorAll('.intro-subsection, .intro-hero, .page-header');
    }
    if (sections.length === 0) return;

    // Clear existing dots
    anchorBar.innerHTML = '';

    sections.forEach(function(section, idx) {
      // Find a title for the label
      var titleEl = section.querySelector('.intro-subsection-title, h1, h2, h3');
      var title = titleEl ? titleEl.textContent.trim().substring(0, 30) : 'Section ' + (idx + 1);

      // Give section an ID if it doesn't have one
      if (!section.id) {
        section.id = 'anchor-section-' + idx;
      }

      var dot = document.createElement('div');
      dot.className = 'scroll-anchor-dot';
      dot.setAttribute('data-target', section.id);

      var label = document.createElement('span');
      label.className = 'scroll-anchor-label';
      label.textContent = title;
      dot.appendChild(label);

      anchorBar.appendChild(dot);
    });

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 200) {
        anchorBar.classList.add('visible');
      } else {
        anchorBar.classList.remove('visible');
      }

      // Update active dot based on scroll position
      var dots = anchorBar.querySelectorAll('.scroll-anchor-dot');
      var currentIdx = 0;
      sections.forEach(function(section, idx) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          currentIdx = idx;
        }
      });
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === currentIdx);
      });
    }, { passive: true });

    // Click to scroll
    anchorBar.querySelectorAll('.scroll-anchor-dot[data-target]').forEach(function(dot) {
      dot.addEventListener('click', function() {
        var targetId = dot.getAttribute('data-target');
        var target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================================
  // HERO PARTICLES (index page)
  // ============================================================
  function initParticles() {
    var container = document.querySelector('.hero-particles');
    if (!container) return;

    for (var i = 0; i < 30; i++) {
      var particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (Math.random() * 2 + 1) + 'px';
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }

  // ============================================================
  // STAT COUNTER ANIMATION (index page)
  // ============================================================
  function initStatCounters() {
    var statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var text = el.textContent;
          var numMatch = text.match(/(\d+)/);
          if (numMatch) {
            var target = parseInt(numMatch[1]);
            var suffix = text.replace(numMatch[0], '');
            _animateCounter(el, target, suffix);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function(el) { observer.observe(el); });
  }

  function _animateCounter(el, target, suffix) {
    var current = 0;
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // ============================================================
  // AUTO-INIT ON DOM READY
  // ============================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initNav();
      initScrollAnchor();
      initParticles();
      initStatCounters();
    });
  } else {
    initNav();
    initScrollAnchor();
    initParticles();
    initStatCounters();
  }

  // Expose for manual use
  window.initNav = initNav;
  window.initScrollAnchor = initScrollAnchor;
  window.initParticles = initParticles;
  window.initStatCounters = initStatCounters;
  window.NAV_SECTIONS = NAV_SECTIONS;

})();
