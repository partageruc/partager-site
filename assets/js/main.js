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

  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (!isCoarse) {
    document.querySelectorAll('.slider').forEach(slider => {
      let isDown = false, moved = false, startX = 0, startScroll = 0;
      slider.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        isDown = true; moved = false;
        startX = e.pageX; startScroll = slider.scrollLeft;
      });
      slider.addEventListener('mousemove', e => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 5) {
          if (!moved) { moved = true; slider.classList.add('is-dragging'); }
          slider.scrollLeft = startScroll - dx;
        }
      });
      const end = () => {
        if (!isDown) return;
        isDown = false;
        if (moved) {
          setTimeout(() => slider.classList.remove('is-dragging'), 0);
        }
      };
      slider.addEventListener('mouseup', end);
      slider.addEventListener('mouseleave', end);
      slider.addEventListener('click', e => {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);
      slider.addEventListener('dragstart', e => e.preventDefault());
    });
  }
})();
