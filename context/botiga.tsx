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
import {
  COMANDES_EXEMPLE,
  ESTATS_COMANDA,
  type Comanda,
  type EstatComanda,
} from "@/lib/data";

const CLAU_COMANDES = "nunu-comandes-v1";
const CLAU_EXHAURITS = "nunu-exhaurits-v1";

interface BotigaContextValue {
  comandes: Comanda[];
  canviarEstat: (comandaId: string, estat: EstatComanda) => void;
  /** Identificadors de producte marcats com a exhaurits per la propietària. */
  exhaurits: string[];
  esExhaurit: (productId: string) => boolean;
  commutarExhaurit: (productId: string) => void;
  /** Sessió oberta al panell intern. Viu en memòria a propòsit: es perd en
   * recarregar, perquè no té cap sentit "recordar" una sessió que no està
   * autenticada de debò (ADR-014). */
  sessioAdmin: boolean;
  obrirSessioAdmin: () => void;
  tancarSessioAdmin: () => void;
}

const BotigaContext = createContext<BotigaContextValue | null>(null);

function esEstatValid(valor: unknown): valor is EstatComanda {
  return (
    typeof valor === "string" &&
    (ESTATS_COMANDA as readonly string[]).includes(valor)
  );
}

/**
 * Només es recuperen de `localStorage` els estats de les comandes, no les
 * comandes senceres: les dades del client viuen a `lib/data.ts` i no han de
 * poder-se alterar des del navegador. Així, si demà canvia el contingut
 * d'exemple, els estats guardats hi segueixen encaixant i una entrada
 * manipulada no pot inventar-se una comanda que no existeix.
 */
function llegeixEstats(): Record<string, EstatComanda> {
  if (typeof window === "undefined") return {};
  try {
    const brut = window.localStorage.getItem(CLAU_COMANDES);
    if (!brut) return {};
    const parsed: unknown = JSON.parse(brut);
    if (typeof parsed !== "object" || parsed === null) return {};
    const resultat: Record<string, EstatComanda> = {};
    for (const [id, estat] of Object.entries(parsed)) {
      if (esEstatValid(estat)) resultat[id] = estat;
    }
    return resultat;
  } catch {
    return {};
  }
}

function llegeixExhaurits(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const brut = window.localStorage.getItem(CLAU_EXHAURITS);
    if (!brut) return [];
    const parsed: unknown = JSON.parse(brut);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

/**
 * Estat de botiga que la propietària controla des del panell intern
 * (ADR-014, arquitectura.md): en quin punt és cada comanda i quins rams
 * estan exhaurits. Com la cistella (ADR-003), viu al navegador amb
 * `localStorage` perquè encara no hi ha backend — amb la diferència
 * important que això, en producció, ha de viure al servidor sí o sí: és
 * informació de negoci compartida, no la cistella d'un sol visitant.
 */
export function BotigaProvider({ children }: { children: ReactNode }) {
  const [estats, setEstats] = useState<Record<string, EstatComanda>>({});
  const [exhaurits, setExhaurits] = useState<string[]>([]);
  const [sessioAdmin, setSessioAdmin] = useState(false);
  /** Estat i no `useRef`: amb un ref, els efectes d'escriptura de sota
   * s'executen dins del mateix commit inicial i desen l'estat encara buit a
   * sobre del que hi ha guardat. Vegeu el comentari equivalent a
   * `context/cart.tsx`, on aquest mateix error feia que la cistella no
   * sobrevisqués a cap recàrrega. */
  const [hidratat, setHidratat] = useState(false);

  useEffect(() => {
    // Mateix motiu que a context/cart.tsx: `localStorage` no existeix durant
    // el render del servidor, així que l'estat comença buit i se sincronitza
    // un cop muntat al navegador.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEstats(llegeixEstats());
    setExhaurits(llegeixExhaurits());
    setHidratat(true);
  }, []);

  useEffect(() => {
    if (!hidratat) return;
    try {
      window.localStorage.setItem(CLAU_COMANDES, JSON.stringify(estats));
    } catch {
      // Res a fer si l'emmagatzematge no accepta escriptura.
    }
  }, [estats, hidratat]);

  useEffect(() => {
    if (!hidratat) return;
    try {
      window.localStorage.setItem(CLAU_EXHAURITS, JSON.stringify(exhaurits));
    } catch {
      // Res a fer si l'emmagatzematge no accepta escriptura.
    }
  }, [exhaurits, hidratat]);

  const comandes = useMemo(
    () =>
      COMANDES_EXEMPLE.map((comanda) => ({
        ...comanda,
        estat: estats[comanda.id] ?? comanda.estat,
      })),
    [estats],
  );

  const canviarEstat = useCallback((comandaId: string, estat: EstatComanda) => {
    setEstats((actuals) => ({ ...actuals, [comandaId]: estat }));
  }, []);

  const esExhaurit = useCallback(
    (productId: string) => exhaurits.includes(productId),
    [exhaurits],
  );

  const commutarExhaurit = useCallback((productId: string) => {
    setExhaurits((actuals) =>
      actuals.includes(productId)
        ? actuals.filter((id) => id !== productId)
        : [...actuals, productId],
    );
  }, []);

  const obrirSessioAdmin = useCallback(() => setSessioAdmin(true), []);
  const tancarSessioAdmin = useCallback(() => setSessioAdmin(false), []);

  const value = useMemo(
    () => ({
      comandes,
      canviarEstat,
      exhaurits,
      esExhaurit,
      commutarExhaurit,
      sessioAdmin,
      obrirSessioAdmin,
      tancarSessioAdmin,
    }),
    [
      comandes,
      canviarEstat,
      exhaurits,
      esExhaurit,
      commutarExhaurit,
      sessioAdmin,
      obrirSessioAdmin,
      tancarSessioAdmin,
    ],
  );

  return (
    <BotigaContext.Provider value={value}>{children}</BotigaContext.Provider>
  );
}

export function useBotiga(): BotigaContextValue {
  const context = useContext(BotigaContext);
  if (!context) {
    throw new Error("useBotiga s'ha de fer servir dins de <BotigaProvider>.");
  }
  return context;
}
