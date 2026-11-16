"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { parseRuta, rutaPer } from "@/lib/routes";
import type { ScreenId } from "@/lib/types";

interface NavigationContextValue {
  screen: ScreenId;
  /** Secció dins de la pantalla (p. ex. "secs" a Flors, "casaments" a
   * Ocasions, l'id del producte a la fitxa); `null` vol dir la pantalla sencera. */
  filtre: string | null;
  goTo: (screen: ScreenId, filtre?: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Pont entre l'API "pantalla + filtre" dels components i les rutes reals
 * de l'App Router (ADR-017, arquitectura-addenda-2026-11.md). La pantalla
 * activa es deriva de la URL, no d'un estat propi: recarregar, tornar enrere
 * o obrir un enllaç compartit porta sempre a la pàgina correcta. L'scroll a
 * dalt en canviar de ruta el fa el router de Next.js.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const destinacio = useMemo(() => parseRuta(pathname), [pathname]);

  const goTo = useCallback(
    (screen: ScreenId, filtre?: string) => {
      router.push(rutaPer(screen, filtre));
    },
    [router],
  );

  const value = useMemo(
    () => ({ screen: destinacio.screen, filtre: destinacio.filtre, goTo }),
    [destinacio, goTo],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation s'ha de fer servir dins de <NavigationProvider>.");
  }
  return context;
}
