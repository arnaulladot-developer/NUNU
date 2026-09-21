"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax del text del hero d'Inici (design-system.md §5.7, efecte Terrer).
 * Manipula `style.transform` / `style.opacity` directament sobre el node,
 * sense passar per `setState`, per no provocar cap re-render de React a
 * cada fotograma — el mateix compromís de rendiment que la maqueta HTML
 * original, ara embolcallat en un hook reutilitzable.
 */
export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let frame = 0;

    function tick() {
      const y = window.scrollY || window.pageYOffset || 0;
      const desplaçament = Math.min(y * 0.18, 140);
      const opacitat = Math.max(0, 1 - y / 560);
      if (el) {
        el.style.transform = `translateY(-${desplaçament}px)`;
        el.style.opacity = String(opacitat);
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return ref;
}
