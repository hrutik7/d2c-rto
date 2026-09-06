'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Fire once when an element crosses into view. Everything on this page that
 * moves is gated on this — nothing animates above the fold that the visitor
 * has already scrolled past.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    // No observer, or reduced motion: show everything immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);

    // Insurance. If the observer has not fired within three seconds the copy
    // is shown anyway — no reveal effect is worth an invisible page.
    const bail = setTimeout(() => setSeen(true), 3000);

    return () => {
      io.disconnect();
      clearTimeout(bail);
    };
  }, [seen, threshold]);

  return [ref, seen] as const;
}

/** easeOutCubic — the count-up curve. Fast start, long settle. */
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Count from 0 to `target` over `duration` once `run` flips true. */
export function useCountUp(target: number, run: boolean, duration = 1800) {
  // Server-rendered markup carries the finished number, so the page reads
  // correctly with no JS at all. The client rewinds it before first paint.
  const [v, setV] = useState(target);
  const armed = useRef(false);

  useLayoutEffect(() => {
    if (armed.current) return;
    armed.current = true;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setV(0);
  }, []);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setV(target * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);

  return v;
}
