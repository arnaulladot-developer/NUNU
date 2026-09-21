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
  goTo: (screen: ScreenId) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Substitueix el `data-va-a` + listener delegat de la maqueta HTML original:
 * un únic estat en memòria decideix quina pantalla es renderitza. Cada
 * canvi de pantalla porta l'usuari a dalt de tot, exactament com feia
 * `window.scrollTo({top:0, behavior:'instant'})` a l'script original.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>("inici");

  const goTo = useCallback((next: ScreenId) => {
    setScreen(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const value = useMemo(() => ({ screen, goTo }), [screen, goTo]);

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
