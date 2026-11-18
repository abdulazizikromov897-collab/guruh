document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     1. STICKY NAVBAR & ACTIVE LINK HIGHLIGHT
  ========================================= */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    // Sticky header effect
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active section highlight
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* =========================================
     2. MOBILE HAMBURGER MENU
  ========================================= */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* =========================================
     3. MODELS FILTERING
  ========================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const modelCards = document.querySelectorAll('.model-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      modelCards.forEach((card) => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* =========================================
     4. TEST-DRIVE MODAL
  ========================================= */
  const modal = document.getElementById('test-drive-modal');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  const closeModalButton = document.getElementById('close-modal');
  const modelSelect = document.getElementById('td-model');
  const dateInput = document.getElementById('td-date');

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  const openModal = (selectedModel = null) => {
    closeMenu();
    if (selectedModel && modelSelect) {
      modelSelect.value = selectedModel;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modelName = btn.getAttribute('data-model');
      openModal(modelName);
    });
  });

  closeModalButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* =========================================
     5. FORM SUBMISSIONS
  ========================================= */
  const testDriveForm = document.getElementById('test-drive-form');
  const tdFeedback = document.getElementById('td-feedback');

  if (testDriveForm) {
    testDriveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('td-name').value.trim();
      const model = modelSelect.value;

      tdFeedback.textContent = `Rahmat, ${name}! ${model} uchun test-drayv so‘rovingiz qabul qilindi.`;
      testDriveForm.reset();

      setTimeout(() => {
        tdFeedback.textContent = '';
        closeModal();
      }, 2800);
    });
  }

  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();

      contactFeedback.textContent = `Hurmatli ${name}, xabaringiz yuborildi. Tez orada siz bilan bog‘lanamiz!`;
      contactForm.reset();

      setTimeout(() => {
        contactFeedback.textContent = '';
      }, 4000);
    });
  }

  /* =========================================
     6. SCROLL REVEAL ANIMATION
  ========================================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});