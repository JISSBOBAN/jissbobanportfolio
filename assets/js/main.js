/**
 * Jiss Boban Portfolio — Microsoft Security Engineer
 * Vanilla JS: Loader, Custom Cursor, Active Nav, Scroll Reveals,
 * Live Clock, Smooth Scroll
 */
(function () {
  'use strict';

  /* ── Loader ── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 1900);
  });

  /* ── Custom cursor ── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (dot) {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    }
  });

  // Ring follows with lerp
  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) {
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand ring on hover
  const hoverables = document.querySelectorAll('a, button, .honor-card, .stat-box, .project-item');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovered'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    if (dot) dot.style.opacity = '0';
    if (ring) ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (dot) dot.style.opacity = '1';
    if (ring) ring.style.opacity = '1';
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.topnav-link');

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
  );

  sections.forEach(s => navObserver.observe(s));

  // Topnav glass on scroll
  const topnav = document.getElementById('topnav');
  window.addEventListener('scroll', () => {
    if (!topnav) return;
    if (window.scrollY > 80) {
      topnav.style.borderBottomColor = 'rgba(255,255,255,.1)';
    } else {
      topnav.style.borderBottomColor = 'rgba(255,255,255,.08)';
    }
  }, { passive: true });

  /* ── Scroll reveal animations ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger siblings of the same parent
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal:not(.revealed)')
          );
          siblings.forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 70);
          });
          // Always reveal this one
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -50px 0px', threshold: 0.06 }
  );

  revealEls.forEach(el => revealObs.observe(el));

  /* ── Live IST clock ── */
  const clocks = [
    document.getElementById('live-clock'),
    document.getElementById('hero-clock'),
    document.getElementById('footer-clock'),
  ].filter(Boolean);

  function tick() {
    const now = new Date();
    const ist = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(now);
    clocks.forEach(el => { el.textContent = 'IST ' + ist; });
  }

  tick();
  setInterval(tick, 1000);

  /* ── Smooth scroll with topnav offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id     = this.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 56; // topnav height
      const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Parallax on hero bg ── */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const y = window.pageYOffset;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.35}px) scale(1)`;
    }
  }, { passive: true });

})();
