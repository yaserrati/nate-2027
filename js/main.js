/* ═══════════════════════════════════════════════════════
   ECLIPSE MOROCCO 2027 — Main JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── COUNTDOWN TIMER ──────────────────────────────────
  const eclipseDate = new Date('2027-08-02T08:34:00+01:00');

  function pad(n, len = 2) {
    return String(n).padStart(len, '0');
  }

  function updateCountdown() {
    const now  = new Date().getTime();
    const diff = eclipseDate.getTime() - now;

    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    if (dEl) dEl.textContent = pad(days, 3);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ─── MOBILE NAV ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      drawer.classList.toggle('open');
    });

    // Close on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }

  // ─── SCROLL REVEAL ────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.project-card, .activity-card, .team-card, ' +
    '.news-card, .edu-card, .objective, .timeline-item, ' +
    '.stat-card, .fact-item, .partner-tile, .reveal'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger within a parent grid
        const siblings = entry.target.parentElement.querySelectorAll(
          '.project-card, .activity-card, .team-card, ' +
          '.news-card, .edu-card, .objective, .timeline-item, ' +
          '.stat-card, .fact-item, .partner-tile, .reveal'
        );
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ─── FORM SUBMISSIONS ────────────────────────────────
  const regForm  = document.getElementById('registration-form');
  const visitForm = document.getElementById('visit-request-form');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✓ Registration received! We\'ll be in touch within 5 working days.');
      regForm.reset();
    });
  }

  if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✓ SpaceBus visit request submitted! Our team will contact you shortly.');
      visitForm.reset();
    });
  }

  // Toast notification
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%;
      transform: translateX(-50%);
      background: #2C1E0C; border: 1px solid #EA3B15;
      color: #FFF5E8; padding: 1rem 2rem;
      font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem;
      letter-spacing: 0.08em;
      z-index: 9999; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      opacity: 0; transition: opacity 0.3s;
      max-width: 90vw; text-align: center;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ─── NAV ACTIVE STATE ON SCROLL ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--orange)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
