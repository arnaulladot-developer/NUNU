import type { ReactNode } from "react";

/** Etiqueta amb fletxa animada, feta servir dins d'un enllaç ja clicable. */
export function ArrowLabel({ children }: { children: ReactNode }) {
  return (
    <span className="enllac-fletxa">
      {children}
      <span className="fletxa" aria-hidden="true" />
    </span>
  );
}
