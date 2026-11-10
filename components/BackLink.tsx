import type { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import type { ScreenId } from "@/lib/types";

interface BackLinkProps {
  to: ScreenId;
  /** Secció de la pantalla destí (vegeu `useNavigation`). */
  filtre?: string;
  children: ReactNode;
  className?: string;
}

/** Botó de tornar enrere (§7.13 design-system.md): mateixa fletxa, mirallada. */
export function BackLink({ to, filtre, children, className }: BackLinkProps) {
  const classes = ["enllac-fletxa", "enllac-fletxa--enrere", className]
    .filter(Boolean)
    .join(" ");

  return (
    <NavLink to={to} filtre={filtre} className={classes}>
      <span className="fletxa" aria-hidden="true" />
      {children}
    </NavLink>
  );
}
