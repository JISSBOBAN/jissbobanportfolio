/**
 * Main Interactive Script
 * Er. Jiss Boban Portfolio (Luxe Minimalist Serif Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('jb_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('jb_theme', isLight ? 'light' : 'dark');
    });
  }

  // 2. Navbar Scroll Effect & Mobile Drawer
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('.nav-toggle-mobile');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (mobileToggle) mobileToggle.textContent = '☰';
      });
    });
  }

  // 3. Experience Tabs (Work vs Education)
  const tabBtns = document.querySelectorAll('.tab-control-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 4. 3D Flip Cards Interaction
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });

  // 5. Projects Filter Tabs (if applicable)
  const projFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  projFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      projFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('resume-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  openResumeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResume();
  });

  // 7. Contact Click Me Button
  const clickMeBtn = document.getElementById('contact-click-btn');
  if (clickMeBtn) {
    clickMeBtn.addEventListener('click', () => {
      window.open('https://www.linkedin.com/in/jissboban07', '_blank');
    });
  }
});
