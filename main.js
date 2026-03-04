/* ============================================================
   BODYLUXE WELLNESS SPA — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Nav ─────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    backTop.classList.toggle('visible', window.scrollY > 500);
    updateActiveNav();
  }, { passive: true });

  /* ── Hamburger / Drawer ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const overlay   = document.getElementById('drawer-overlay');

  function openDrawer() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-links a').forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });

  /* ── Hero Slider ────────────────────────────────────────── */
  const slides   = document.querySelectorAll('.slide');
  const dots     = document.querySelectorAll('.slider-dot');
  let current    = 0;
  let autoplay;

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function start() { autoplay = setInterval(function () { goTo(current + 1); }, 6000); }
  function reset() { clearInterval(autoplay); start(); }

  dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); reset(); }); });
  document.getElementById('slide-next').addEventListener('click', function () { goTo(current + 1); reset(); });
  document.getElementById('slide-prev').addEventListener('click', function () { goTo(current - 1); reset(); });

  start();

  /* ── Scroll Fade ────────────────────────────────────────── */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(function (el) { observer.observe(el); });

  /* ── Back to Top ────────────────────────────────────────── */
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Active Nav ─────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let active = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 110) active = s.id;
    });
    navItems.forEach(function (a) {
      a.style.color = a.getAttribute('href') === '#' + active ? 'var(--gold)' : '';
    });
  }

  /* ── Booking Form ───────────────────────────────────────── */
  const form = document.getElementById('booking-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('f-name').value.trim();
      const phone   = document.getElementById('f-phone').value.trim();
      const service = document.getElementById('f-service').value;

      if (!name || !phone || !service) {
        showMsg('Please fill in all required fields.', 'error');
        return;
      }

      const branch  = document.getElementById('f-branch').value || 'Not specified';
      const date    = document.getElementById('f-date').value || 'Flexible';
      const note    = document.getElementById('f-note').value.trim();

      const text = encodeURIComponent(
        'Hello Bodyluxe Wellness Spa, I would like to book a session.\n\n' +
        'Name: ' + name + '\n' +
        'Service: ' + service + '\n' +
        'Branch: ' + branch + '\n' +
        'Preferred Date: ' + date + '\n' +
        (note ? 'Notes: ' + note + '\n' : '') +
        'Contact: ' + phone + '\n\nThank you.'
      );

      window.open('https://wa.me/2348028778058?text=' + text, '_blank');
    });
  }

  function showMsg(text, type) {
    const old = document.getElementById('form-msg');
    if (old) old.remove();
    const p = document.createElement('p');
    p.id = 'form-msg';
    p.textContent = text;
    p.style.cssText = 'font-size:.8rem;text-align:center;margin-top:12px;color:' +
      (type === 'error' ? '#c0392b' : '#27ae60');
    form.appendChild(p);
    setTimeout(function () { p.remove(); }, 4000);
  }

})();