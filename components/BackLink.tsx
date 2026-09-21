import type { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import type { ScreenId } from "@/lib/types";

interface BackLinkProps {
  to: ScreenId;
  children: ReactNode;
  className?: string;
}

/** Botó de tornar enrere (§7.13 design-system.md): mateixa fletxa, mirallada. */
export function BackLink({ to, children, className }: BackLinkProps) {
  const classes = ["enllac-fletxa", "enllac-fletxa--enrere", className]
    .filter(Boolean)
    .join(" ");

  return (
    <NavLink to={to} className={classes}>
      <span className="fletxa" aria-hidden="true" />
      {children}
    </NavLink>
  );
}
