"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavLink } from "@/components/NavLink";
import { useCart } from "@/context/cart";
import { useNavigation } from "@/context/navigation";
import {
  CATEGORIES_FLORS,
  CATEGORIES_NADAL,
  OCASIONS,
  getCategoria,
  getProducteById,
} from "@/lib/data";
import type { ScreenId } from "@/lib/types";

type SeccioMenu = "inici" | "flors" | "nadal" | "ocasions" | "fires" | "contacte";

/** A quina entrada del menú pertany cada pantalla (per subratllar l'activa). */
const SECCIO_PER_PANTALLA: Partial<Record<ScreenId, SeccioMenu>> = {
  inici: "inici",
  botiga: "flors",
  fitxa: "flors",
  projectes: "ocasions",
  fires: "fires",
  contacte: "contacte",
};

function Xevro() {
  return (
    <svg
      className="capcalera-xevro"
      viewBox="0 0 12 8"
      width="11"
      height="8"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 1.5 6 6.5 11 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconaUsuari() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.6" />
        <path d="M4.5 20c0-4 3.4-6.4 7.5-6.4s7.5 2.4 7.5 6.4Z" />
      </g>
    </svg>
  );
}

function IconaCistella() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.2 7.5h13.6l-.9 12.2a1 1 0 0 1-1 .9H7.1a1 1 0 0 1-1-.9Z" />
        <path d="M8.8 10.2V7a3.2 3.2 0 0 1 6.4 0v3.2" />
      </g>
    </svg>
  );
}

interface ItemDesplegable {
  etiqueta: string;
  to: ScreenId;
  filtre: string;
}

interface DesplegableProps {
  id: string;
  etiqueta: string;
  actiu: boolean;
  items: readonly ItemDesplegable[];
  onNavigate: () => void;
}

/** Entrada del menú amb llista: s'obre amb el cursor, el teclat o el tàctil. */
function Desplegable({ id, etiqueta, actiu, items, onNavigate }: DesplegableProps) {
  const [obert, setObert] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  // Un toc dispara `mouseenter` i després `click`: si tots dos obrissin i
  // tanquessin, la llista es tancaria sola. Només el cursor real obre per
  // hover; el toc i el teclat alternen amb el clic.
  const ultimPunter = useRef<string>("mouse");

  // Es tanca en prémer Escape o en fer clic fora seu.
  useEffect(() => {
    if (!obert) return;
    function alTecla(event: KeyboardEvent) {
      if (event.key === "Escape") setObert(false);
    }
    function alClic(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setObert(false);
    }
    document.addEventListener("keydown", alTecla);
    document.addEventListener("mousedown", alClic);
    return () => {
      document.removeEventListener("keydown", alTecla);
      document.removeEventListener("mousedown", alClic);
    };
  }, [obert]);

  return (
    <div
      className={`capcalera-desplegable${obert ? " obert" : ""}`}
      ref={ref}
      onPointerDown={(event) => {
        ultimPunter.current = event.pointerType;
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setObert(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setObert(false);
      }}
    >
      <button
        type="button"
        className="capcalera-desplegable-boto"
        aria-expanded={obert}
        aria-controls={id}
        aria-current={actiu ? "page" : undefined}
        onClick={(event) => {
          // Amb cursor, el hover ja l'ha obert: el clic el manté obert.
          const ambCursor = ultimPunter.current === "mouse" && event.detail > 0;
          setObert((valor) => (ambCursor ? true : !valor));
        }}
      >
        {etiqueta}
        <Xevro />
      </button>
      <ul id={id} className="capcalera-desplegable-llista">
        {items.map((item) => (
          <li key={item.filtre}>
            <NavLink
              to={item.to}
              filtre={item.filtre}
              onNavigate={() => {
                setObert(false);
                onNavigate();
              }}
            >
              {item.etiqueta}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader() {
  const [menuObert, setMenuObert] = useState(false);
  const { screen, filtre } = useNavigation();
  const { totalArticles, commutarCalaix } = useCart();
  // La Botiga i la fitxa serveixen Flors i Nadal: la secció activa la decideix
  // la categoria del filtre (o la del producte, a la fitxa).
  const idCategoria =
    screen === "fitxa" ? (getProducteById(filtre)?.categoria ?? null) : filtre;
  const seccioActiva: SeccioMenu | undefined =
    (screen === "botiga" || screen === "fitxa") &&
    getCategoria(idCategoria)?.seccio === "nadal"
      ? "nadal"
      : SECCIO_PER_PANTALLA[screen];

  function tancaTot() {
    setMenuObert(false);
  }

  function aria(seccio: SeccioMenu) {
    return seccioActiva === seccio ? ("page" as const) : undefined;
  }

  return (
    <header className={`site-header${menuObert ? " menu-obert" : ""}`}>
      <div className="capcalera-fila">
        <button
          type="button"
          className="menu-mobil"
          aria-expanded={menuObert}
          aria-controls="menu-principal"
          aria-label={menuObert ? "Tancar el menú" : "Obrir el menú"}
          onClick={() => setMenuObert((obert) => !obert)}
        >
          <span />
          <span />
          <span />
        </button>

        <NavLink to="inici" className="marca-nom" onNavigate={tancaTot}>
          <Image
            src="/assets/logo.jpg"
            alt="Nunu Flowers"
            width={96}
            height={96}
            priority
          />
        </NavLink>

        <div className="capcalera-eines">
          {/* Només català de moment: l'idioma castellà no està confirmat
              (brief.md §5). El selector ja hi és perquè la capçalera sigui
              la de la referència; activar un idioma és afegir-lo aquí. */}
          <label className="capcalera-idioma">
            <span className="visualment-ocult">Idioma</span>
            <select defaultValue="ca" aria-label="Idioma">
              <option value="ca">Català</option>
              <option value="es" disabled>
                Español (aviat)
              </option>
            </select>
            <Xevro />
          </label>
          <NavLink
            to="seguiment"
            className="capcalera-icona"
            aria-label="Seguiment de la comanda"
            onNavigate={tancaTot}
          >
            <IconaUsuari />
          </NavLink>
          <button
            type="button"
            id="boto-cistella"
            className="capcalera-icona"
            onClick={commutarCalaix}
            aria-label={
              totalArticles > 0
                ? `Cistella, ${totalArticles} ${totalArticles === 1 ? "article" : "articles"}`
                : "Cistella"
            }
          >
            <IconaCistella />
            {totalArticles > 0 && (
              <span className="capcalera-comptador" aria-hidden="true">
                {totalArticles}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav id="menu-principal" className="capcalera-nav" aria-label="Principal">
        <NavLink
          to="inici"
          aria-current={aria("inici")}
          onNavigate={tancaTot}
        >
          Inici
        </NavLink>
        <Desplegable
          id="menu-flors"
          etiqueta="Flors"
          actiu={seccioActiva === "flors"}
          onNavigate={tancaTot}
          items={CATEGORIES_FLORS.map((categoria) => ({
            etiqueta: categoria.etiqueta,
            to: "botiga",
            filtre: categoria.id,
          }))}
        />
        <Desplegable
          id="menu-nadal"
          etiqueta="Nadal"
          actiu={seccioActiva === "nadal"}
          onNavigate={tancaTot}
          items={CATEGORIES_NADAL.map((categoria) => ({
            etiqueta: categoria.etiqueta,
            to: "botiga",
            filtre: categoria.id,
          }))}
        />
        <Desplegable
          id="menu-ocasions"
          etiqueta="Ocasions"
          actiu={seccioActiva === "ocasions"}
          onNavigate={tancaTot}
          items={OCASIONS.map((ocasio) => ({
            etiqueta: ocasio.nom,
            to: "projectes",
            filtre: ocasio.id,
          }))}
        />
        <NavLink
          to="fires"
          aria-current={aria("fires")}
          onNavigate={tancaTot}
        >
          Fires
        </NavLink>
        <NavLink
          to="contacte"
          aria-current={aria("contacte")}
          onNavigate={tancaTot}
        >
          Contacte
        </NavLink>
      </nav>
    </header>
  );
}
