(function () {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const close = document.querySelector('.nav-overlay__close');

  function open() {
    overlay.classList.add('is-open');
    toggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function shut() {
    overlay.classList.remove('is-open');
    toggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', () => overlay.classList.contains('is-open') ? shut() : open());
  if (close) close.addEventListener('click', shut);
  if (overlay) overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  const yr = document.querySelector('[data-current-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
