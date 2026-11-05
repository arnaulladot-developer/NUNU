"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useNavigation } from "@/context/navigation";
import type { ScreenId } from "@/lib/types";

interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  to: ScreenId;
  /** Secció dins de la pantalla destí (vegeu `useNavigation`). */
  filtre?: string;
  children: ReactNode;
  /** Executat després de navegar — el fa servir el menú mòbil per tancar-se. */
  onNavigate?: () => void;
}

/** Enllaç intern entre pantalles del prototip (equivalent a `data-va-a`). */
export function NavLink({ to, filtre, children, onNavigate, ...rest }: NavLinkProps) {
  const { goTo } = useNavigation();

  return (
    <a
      href="#"
      {...rest}
      onClick={(event) => {
        event.preventDefault();
        goTo(to, filtre);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}
