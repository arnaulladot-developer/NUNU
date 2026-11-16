"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { rutaPer } from "@/lib/routes";
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

/**
 * Enllaç intern: un `<a href>` real a la ruta de la pantalla destí, de manera
 * que els cercadors el poden seguir i el client pot obrir-lo en una pestanya
 * nova.
 */
export function NavLink({ to, filtre, children, onNavigate, ...rest }: NavLinkProps) {
  return (
    <Link href={rutaPer(to, filtre)} {...rest} onClick={() => onNavigate?.()}>
      {children}
    </Link>
  );
}
