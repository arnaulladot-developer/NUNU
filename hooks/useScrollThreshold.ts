"use client";

import { useEffect, useState } from "react";

/**
 * Retorna `true` quan `window.scrollY` supera `threshold`. Fa servir el
 * mateix mecanisme que la maqueta original: es llegeix la posició dins
 * d'un bucle `requestAnimationFrame`, mai amb un listener de `scroll`
 * addicional (design-system.md §5.7 — cost de rendiment zero).
 */
export function useScrollThreshold(threshold: number): boolean {
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last: boolean | null = null;

    function tick() {
      const y = window.scrollY || window.pageYOffset || 0;
      const value = y > threshold;
      if (value !== last) {
        last = value;
        setPastThreshold(value);
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [threshold]);

  return pastThreshold;
}
