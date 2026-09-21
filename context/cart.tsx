"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProducteById } from "@/lib/data";

const CLAU_EMMAGATZEMATGE = "nunu-cistella-v1";
const QUANTITAT_MAXIMA = 20;

export interface ArticleCistella {
  productId: string;
  quantitat: number;
  comentari: string;
}

interface CartContextValue {
  articles: ArticleCistella[];
  afegir: (productId: string, quantitat?: number) => void;
  actualitzarQuantitat: (productId: string, quantitat: number) => void;
  actualitzarComentari: (productId: string, comentari: string) => void;
  eliminar: (productId: string) => void;
  buidar: () => void;
  totalArticles: number;
  totalPreu: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function llegeixEmmagatzemat(): ArticleCistella[] {
  if (typeof window === "undefined") return [];
  try {
    const brut = window.localStorage.getItem(CLAU_EMMAGATZEMATGE);
    if (!brut) return [];
    const parsed: unknown = JSON.parse(brut);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ArticleCistella =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as ArticleCistella).productId === "string" &&
        typeof (item as ArticleCistella).quantitat === "number",
    );
  } catch {
    // Emmagatzematge no disponible (mode privat, quota, etc.) — comencem
    // amb la cistella buida en comptes de trencar la pàgina.
    return [];
  }
}

/**
 * Cistella de compra: viu en memòria i es persisteix a `localStorage` perquè
 * no es perdi en recarregar la pàgina, mentre no hi hagi encara backend real
 * (ADR-001, arquitectura.md — la cistella real es mourà a una comanda a
 * PostgreSQL quan es connecti la passarel·la de pagament).
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<ArticleCistella[]>([]);
  const hidratat = useRef(false);

  useEffect(() => {
    // Excepció justificada, no oblit: `localStorage` no existeix en SSR, així
    // que l'estat inicial ha de començar buit (`useState([])` de dalt) i
    // sincronitzar-se amb el sistema extern un cop muntats al navegador —
    // exactament el cas d'ús "sincronitzar amb un sistema extern" que
    // documenten els Effects de React, encara que aquí no calgui subscripció
    // contínua perquè `localStorage` no notifica canvis de la mateixa pestanya.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArticles(llegeixEmmagatzemat());
    hidratat.current = true;
  }, []);

  useEffect(() => {
    if (!hidratat.current) return;
    try {
      window.localStorage.setItem(CLAU_EMMAGATZEMATGE, JSON.stringify(articles));
    } catch {
      // Res a fer si l'emmagatzematge no accepta escriptura.
    }
  }, [articles]);

  const afegir = useCallback((productId: string, quantitat = 1) => {
    setArticles((actuals) => {
      const existent = actuals.find((a) => a.productId === productId);
      if (existent) {
        return actuals.map((a) =>
          a.productId === productId
            ? {
                ...a,
                quantitat: Math.min(QUANTITAT_MAXIMA, a.quantitat + quantitat),
              }
            : a,
        );
      }
      return [
        ...actuals,
        {
          productId,
          quantitat: Math.min(QUANTITAT_MAXIMA, Math.max(1, quantitat)),
          comentari: "",
        },
      ];
    });
  }, []);

  const actualitzarQuantitat = useCallback((productId: string, quantitat: number) => {
    const clamped = Math.min(QUANTITAT_MAXIMA, Math.max(1, Math.round(quantitat) || 1));
    setArticles((actuals) =>
      actuals.map((a) => (a.productId === productId ? { ...a, quantitat: clamped } : a)),
    );
  }, []);

  const actualitzarComentari = useCallback((productId: string, comentari: string) => {
    setArticles((actuals) =>
      actuals.map((a) => (a.productId === productId ? { ...a, comentari } : a)),
    );
  }, []);

  const eliminar = useCallback((productId: string) => {
    setArticles((actuals) => actuals.filter((a) => a.productId !== productId));
  }, []);

  const buidar = useCallback(() => setArticles([]), []);

  const totalArticles = useMemo(
    () => articles.reduce((suma, a) => suma + a.quantitat, 0),
    [articles],
  );

  const totalPreu = useMemo(
    () =>
      articles.reduce((suma, a) => {
        const producte = getProducteById(a.productId);
        return suma + (producte ? producte.preu * a.quantitat : 0);
      }, 0),
    [articles],
  );

  const value = useMemo(
    () => ({
      articles,
      afegir,
      actualitzarQuantitat,
      actualitzarComentari,
      eliminar,
      buidar,
      totalArticles,
      totalPreu,
    }),
    [articles, afegir, actualitzarQuantitat, actualitzarComentari, eliminar, buidar, totalArticles, totalPreu],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart s'ha de fer servir dins de <CartProvider>.");
  }
  return context;
}
