'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function easeBetween(value: number, start: number, end: number) {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}

export function OpeningMotion({ children }: { children: ReactNode }) {
  const opening = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = opening.current;
    if (!element) return;
    const pin = element.querySelector<HTMLElement>('.opening-pin');
    const stage = element.querySelector<HTMLElement>('.opening-stage');
    const copy = element.querySelector<HTMLElement>('.hero-copy');
    const next = element.querySelector<HTMLElement>('.opening-next');
    if (!pin || !stage || !copy || !next) return;

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 700px)');
    let frame = 0;
    let span = 0;
    let previous = -1;

    function draw() {
      frame = 0;
      if (!element || !stage || !copy || !next || preference.matches || span <= 0) return;

      const progress = clamp(-element.getBoundingClientRect().top / span);
      if (progress === previous) return;
      previous = progress;
      const morph = easeBetween(progress, .05, .87);
      const reveal = easeBetween(progress, .29, .79);
      const fade = easeBetween(progress, .045, .32);
      const panel = easeBetween(progress, .04, .64);
      const narrow = mobile.matches;

      element.style.setProperty('--morph', morph.toFixed(4));
      element.style.setProperty('--scene', easeBetween(progress, .14, .65).toFixed(4));
      element.style.setProperty('--panel', panel.toFixed(4));
      element.style.setProperty('--reveal', reveal.toFixed(4));
      element.style.setProperty('--hero-out', fade.toFixed(4));
      stage.style.transform = `translate3d(${(narrow ? 16 : 25) * morph}vw, calc(var(--print-lift, -5%) * ${morph}), 0) rotate(${(narrow ? 8 : 7) * morph}deg) scale(calc(1 - var(--print-shrink, .59) * ${morph}))`;
      // A focused link stays available even when the scene changes around it.
      copy.dataset.faded = String(fade > .96 && !copy.contains(document.activeElement));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function measure() {
      if (!element || !pin || !stage || !copy) return;
      previous = -1;
      if (preference.matches) {
        element.removeAttribute('data-motion');
        element.removeAttribute('style');
        stage.removeAttribute('style');
        delete copy.dataset.faded;
      } else {
        element.dataset.motion = '';
        span = element.offsetHeight - pin.offsetHeight;
        draw();
      }
    }

    function ensureCopyVisible(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement) || !copy?.contains(event.target)) return;
      if (previous > .35) element?.scrollIntoView({ behavior: 'instant' });
      delete copy.dataset.faded;
    }

    const observer = new ResizeObserver(measure);
    observer.observe(pin);
    window.addEventListener('scroll', schedule, { passive: true });
    mobile.addEventListener('change', measure);
    preference.addEventListener('change', measure);
    element.addEventListener('focusin', ensureCopyVisible);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      mobile.removeEventListener('change', measure);
      preference.removeEventListener('change', measure);
      element.removeEventListener('focusin', ensureCopyVisible);
      element.removeAttribute('data-motion');
      element.removeAttribute('style');
      stage.removeAttribute('style');
      delete copy.dataset.faded;
    };
  }, []);

  return <section className="opening" ref={opening} aria-labelledby="hero-title">{children}</section>;
}
