"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ScreenId } from "@/lib/types";

interface NavigationContextValue {
  screen: ScreenId;
  /** Secció dins de la pantalla (p. ex. "secs" a Flors, "casaments" a
   * Ocasions); `null` vol dir la pantalla sencera. */
  filtre: string | null;
  goTo: (screen: ScreenId, filtre?: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Substitueix el `data-va-a` + listener delegat de la maqueta HTML original:
 * un únic estat en memòria decideix quina pantalla es renderitza. Cada
 * canvi de pantalla porta l'usuari a dalt de tot, exactament com feia
 * `window.scrollTo({top:0, behavior:'instant'})` a l'script original.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [destinacio, setDestinacio] = useState<{
    screen: ScreenId;
    filtre: string | null;
  }>({ screen: "inici", filtre: null });

  const goTo = useCallback((next: ScreenId, filtre?: string) => {
    setDestinacio({ screen: next, filtre: filtre ?? null });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

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
