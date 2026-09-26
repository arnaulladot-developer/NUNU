"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  /** Estat del calaix lateral (ADR-008, arquitectura.md): la cistella ja
   * no és una pantalla pròpia — és un panell que es pot obrir des de
   * qualsevol pantalla sense navegar-hi. */
  calaixObert: boolean;
  obrirCalaix: () => void;
  tancarCalaix: () => void;
  commutarCalaix: () => void;
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
 * (ADR-003, arquitectura.md — la cistella real es mourà a una comanda a
 * PostgreSQL quan es connecti la passarel·la de pagament, ADR-004).
 * `calaixObert` decideix si el panell de `CistellaCalaix.tsx` es mostra —
 * viu aquí, no al component, perquè el botó que l'obre (a `SiteHeader.tsx`)
 * i el panell que el mostra no tenen cap relació pare-fill (ADR-008).
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<ArticleCistella[]>([]);
  const [calaixObert, setCalaixObert] = useState(false);
  /**
   * Ha de ser estat, no `useRef`: amb un ref, l'efecte d'escriptura de sota
   * s'executava dins del mateix commit inicial, just després d'aquest, quan
   * `articles` encara era la llista buida però el senyal ja estava a `true`
   * — i desava `[]` a sobre del que hi havia guardat. La cistella no ha
   * arribat mai a sobreviure a una recàrrega per aquest motiu (ADR-014, on
   * es va trobar el mateix error al context nou de botiga). Amb estat,
   * l'efecte torna a executar-se després del render ja hidratat i escriu
   * el contingut bo.
   */
  const [hidratat, setHidratat] = useState(false);

  useEffect(() => {
    // Excepció justificada, no oblit: `localStorage` no existeix en SSR, així
    // que l'estat inicial ha de començar buit (`useState([])` de dalt) i
    // sincronitzar-se amb el sistema extern un cop muntats al navegador —
    // exactament el cas d'ús "sincronitzar amb un sistema extern" que
    // documenten els Effects de React, encara que aquí no calgui subscripció
    // contínua perquè `localStorage` no notifica canvis de la mateixa pestanya.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArticles(llegeixEmmagatzemat());
    setHidratat(true);
  }, []);

  useEffect(() => {
    if (!hidratat) return;
    try {
      window.localStorage.setItem(CLAU_EMMAGATZEMATGE, JSON.stringify(articles));
    } catch {
      // Res a fer si l'emmagatzematge no accepta escriptura.
    }
  }, [articles, hidratat]);

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

  const obrirCalaix = useCallback(() => setCalaixObert(true), []);
  const tancarCalaix = useCallback(() => setCalaixObert(false), []);
  const commutarCalaix = useCallback(() => setCalaixObert((actual) => !actual), []);

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
      calaixObert,
      obrirCalaix,
      tancarCalaix,
      commutarCalaix,
    }),
    [
      articles,
      afegir,
      actualitzarQuantitat,
      actualitzarComentari,
      eliminar,
      buidar,
      totalArticles,
      totalPreu,
      calaixObert,
      obrirCalaix,
      tancarCalaix,
      commutarCalaix,
    ],
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
