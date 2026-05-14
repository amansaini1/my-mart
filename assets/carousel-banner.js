// carousel-banner.js
(function () {
  'use strict';

  class CarouselBanner {
    constructor(el) {
      this.el = el;
      this.track = el.querySelector('.carousel-banner__track');
      this.slides = Array.from(el.querySelectorAll('.carousel-banner__slide'));
      this.dots = Array.from(el.querySelectorAll('.carousel-banner__dot'));
      this.prevBtn = el.querySelector('.carousel-banner__btn--prev');
      this.nextBtn = el.querySelector('.carousel-banner__btn--next');

      this.current = 0;
      this.total = this.slides.length;
      this.autoplay = el.dataset.autoplay === 'true';
      this.speed = (parseInt(el.dataset.speed, 10) || 5) * 1000;
      this.timer = null;
      this.transitioning = false;

      if (this.total <= 1) return;

      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.go(this.current - 1));
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.go(this.current + 1));

      this.dots.forEach((dot) => {
        dot.addEventListener('click', () => this.go(parseInt(dot.dataset.index, 10)));
      });

      // Touch / swipe
      let startX = 0;
      this.track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
      this.track.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) this.go(diff > 0 ? this.current + 1 : this.current - 1);
      });

      // Keyboard navigation
      this.el.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.go(this.current - 1);
        if (e.key === 'ArrowRight') this.go(this.current + 1);
      });

      // Pause on hover
      this.el.addEventListener('mouseenter', () => this.pause());
      this.el.addEventListener('mouseleave', () => { if (this.autoplay) this.start(); });
      this.el.addEventListener('focusin', () => this.pause());
      this.el.addEventListener('focusout', () => { if (this.autoplay) this.start(); });

      // Set initial track height to match first slide
      this._syncHeight();
      window.addEventListener('resize', () => this._syncHeight());

      if (this.autoplay) this.start();
    }

    go(index) {
      if (this.transitioning) return;
      this.transitioning = true;

      const prev = this.current;
      this.current = ((index % this.total) + this.total) % this.total;

      // Fade out previous, position it absolute so it overlaps during transition
      const prevSlide = this.slides[prev];
      prevSlide.style.position = 'absolute';
      prevSlide.style.top = '0';
      prevSlide.style.left = '0';
      prevSlide.style.width = '100%';
      prevSlide.classList.remove('is-active');

      // Activate next
      this.slides[this.current].classList.add('is-active');
      this.slides[this.current].style.position = '';

      // After transition, clean up old slide positioning
      setTimeout(() => {
        prevSlide.style.position = '';
        this.transitioning = false;
        this._syncHeight();
      }, 900);

      // Update dots
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === this.current);
        dot.setAttribute('aria-selected', i === this.current ? 'true' : 'false');
      });

      // Restart autoplay timer
      if (this.autoplay) {
        this.pause();
        this.start();
      }
    }

    _syncHeight() {
      const active = this.slides[this.current];
      if (active) this.track.style.minHeight = active.offsetHeight + 'px';
    }

    start() {
      this.pause();
      this.timer = setInterval(() => this.go(this.current + 1), this.speed);
    }

    pause() {
      clearInterval(this.timer);
    }
  }

  document.querySelectorAll('[id^="CarouselBanner-"]').forEach((el) => new CarouselBanner(el));
})();
