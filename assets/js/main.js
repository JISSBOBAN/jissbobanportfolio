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

  // 8. Cybersecurity Clearance Gateway (Human Verification / CAPTCHA)
  const gateway = document.getElementById('security-gateway');
  const verifyBtn = document.getElementById('captcha-verify-btn');
  const statusText = document.getElementById('captcha-status-text');
  const terminal = document.getElementById('gateway-terminal');
  const bypassBtn = document.getElementById('gateway-bypass-btn');
  const lockTerminalBtn = document.getElementById('btn-lock-terminal');

  function addTerminalLine(text, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!terminal) return resolve();
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="term-prefix">&gt;</span> <span class="term-text">${text}</span>`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        resolve();
      }, delay);
    });
  }

  function unlockPortfolio() {
    if (!gateway) return;
    sessionStorage.setItem('jb_cyber_clearance', 'verified');
    gateway.classList.add('verified');
    document.body.classList.remove('gateway-active');
    setTimeout(() => {
      gateway.style.display = 'none';
    }, 700);
  }

  function lockPortfolio() {
    if (!gateway) return;
    sessionStorage.removeItem('jb_cyber_clearance');
    gateway.style.display = 'flex';
    gateway.classList.remove('verified');
    document.body.classList.add('gateway-active');
    if (verifyBtn) {
      verifyBtn.classList.remove('scanning', 'passed');
    }
    if (statusText) {
      statusText.textContent = 'Verify Human Security Analyst';
    }
    if (terminal) {
      terminal.innerHTML = `<div class="terminal-line"><span class="term-prefix">&gt;</span> <span class="term-text">STATUS: Awaiting analyst identity challenge response...</span></div>`;
    }
  }

  // Check initial verification status
  const isVerified = sessionStorage.getItem('jb_cyber_clearance') === 'verified';
  if (!isVerified && gateway) {
    document.body.classList.add('gateway-active');
    gateway.style.display = 'flex';
  } else if (gateway) {
    gateway.style.display = 'none';
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', async () => {
      if (verifyBtn.classList.contains('scanning') || verifyBtn.classList.contains('passed')) return;

      verifyBtn.classList.add('scanning');
      if (statusText) statusText.textContent = 'Authenticating TLS & Biometrics...';

      await addTerminalLine('Initializing client cryptographic handshake...', 180);
      await addTerminalLine('Validating TLS 1.3 fingerprint & anti-bot posture... [OK]', 300);
      await addTerminalLine('SHA-256 Checksum: 0x9816FC7E055DD8... [MATCHED]', 350);
      await addTerminalLine('Identity Verified: Human Security Analyst.', 250);
      await addTerminalLine('Clearance Level 3 Approved. Decrypting portfolio...', 200);

      verifyBtn.classList.remove('scanning');
      verifyBtn.classList.add('passed');
      if (statusText) statusText.textContent = 'Verified [Access Granted]';

      setTimeout(() => {
        unlockPortfolio();
      }, 500);
    });
  }

  if (bypassBtn) {
    bypassBtn.addEventListener('click', () => {
      unlockPortfolio();
    });
  }

  if (lockTerminalBtn) {
    lockTerminalBtn.addEventListener('click', () => {
      lockPortfolio();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

