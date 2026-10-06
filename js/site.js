/* Rise and Balance — scroll reveals and parallax.
 *
 * Plain JavaScript. No libraries, no build step, no network calls.
 *
 * Three hard rules this file exists to honour:
 *   1. Nothing is ever hidden by CSS alone. The hidden state is scoped to
 *      `html.js`, which is set by an inline script in the head. If this file
 *      never runs, or JS is off, or IntersectionObserver is missing, the page
 *      renders fully visible and readable.
 *   2. prefers-reduced-motion turns both systems off completely.
 *   3. Reveals are decoration, never a gate. Content is in the DOM and
 *      readable before, during and after the animation.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Parallax
     Each [data-par] element moves against its parent band. A POSITIVE
     factor lags the scroll, which reads as distance (background). A
     NEGATIVE factor outruns it, which reads as nearness (foreground).
     Offset is derived from how far the parent band's centre is from the
     viewport centre, so an element is at rest when its band is centred
     and displacement is bounded no matter how long the page gets —
     absolute scroll position is never used, which is what makes this
     safe on a page of any length.
  --------------------------------------------------------------- */
  var parEls = Array.prototype.slice.call(document.querySelectorAll('[data-par]'));

  if (parEls.length && !reduce) {
    var ticking = false;

    var frame = function () {
      ticking = false;
      var vh = window.innerHeight;

      for (var i = 0; i < parEls.length; i++) {
        var el = parEls[i];
        var host = el.parentElement;
        if (!host) { continue; }

        var hr = host.getBoundingClientRect();
        /* skip anything well outside the viewport */
        if (hr.bottom < -400 || hr.top > vh + 400) { continue; }

        var delta = (vh / 2) - (hr.top + hr.height / 2);
        var speed = parseFloat(el.getAttribute('data-par')) || 0;
        var off = delta * speed;

        if (off > 260) { off = 260; }
        else if (off < -260) { off = -260; }

        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      }
    };

    var onScroll = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(frame); }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------------------------------------------------------------
     Scroll reveals
  --------------------------------------------------------------- */
  if (!('IntersectionObserver' in window) || reduce) { return; }

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('in');
        io.unobserve(entries[i].target);
      }
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  var mark = function (el, cls, delay) {
    if (!el) { return; }
    el.classList.add('rv');
    if (cls) { el.classList.add(cls); }
    if (delay) { el.style.transitionDelay = delay + 'ms'; }
    io.observe(el);
  };

  /* Body sections: walk each band's direct children and give each one a
     direction and a stagger. Lists reveal item by item rather than as a
     block, because a list that fades in whole reads as one object. */
  var bands = document.querySelectorAll('section .wrap, .panel .wrap, .cta-band .wrap');

  Array.prototype.forEach.call(bands, function (band) {
    Array.prototype.forEach.call(band.children, function (el, i) {
      var d = Math.min(i, 5) * 80;

      if (el.tagName === 'OL' || el.tagName === 'UL') {
        Array.prototype.forEach.call(el.children, function (li, j) {
          mark(li, 'rv-r', Math.min(j, 6) * 70);
        });
      } else if (el.classList.contains('eyebrow')) {
        mark(el, 'rv-l', d);
      } else if (el.classList.contains('line') || el.classList.contains('quote')) {
        mark(el, 'rv-bg', d);
      } else {
        mark(el, null, d);
      }
    });
  });

  /* Hero: reveals on load rather than on scroll, since it is already
     on screen. The pull quote comes out of the background. */
  var heroWrap = document.querySelector('.hero .wrap');
  if (heroWrap) {
    Array.prototype.forEach.call(heroWrap.children, function (el, i) {
      mark(el, el.classList.contains('line') ? 'rv-bg' : null, i * 120);
    });
  }

  /* The Balance descent */
  Array.prototype.forEach.call(document.querySelectorAll('.pillars .pillar'), function (p, i) {
    mark(p, 'rv-bg', i * 90);
  });
  mark(document.querySelector('.pillars .balance-word'), 'rv-bg', 0);
  mark(document.querySelector('.pillars .tagline'), 'rv-bg', 220);

  /* Safety net: if anything is still hidden after 4s that should be
     visible, show it. A reveal that never fires is a blank page. */
  window.setTimeout(function () {
    var stuck = document.querySelectorAll('.rv:not(.in)');
    Array.prototype.forEach.call(stuck, function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add('in'); }
    });
  }, 4000);
})();
