"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { ArrowLabel } from "@/components/ArrowLabel";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTES } from "@/lib/data";

export function Botiga() {
  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>Botiga</h1>
          <p>
            Rams de flor seca. Enviem a tota la península en 24-48h
            laborables; Balears i Canàries, 3-5 dies.
          </p>
        </div>
        <div className="productes-graella">
          {PRODUCTES.map((producte) => (
            <ProductCard key={producte.id} producte={producte} />
          ))}
          <NavLink to="botiga" className="producte-targeta producte-targeta-cta">
            <p>
              Fins a vint rams en total
              <br />
              (nombre real segons el catàleg del client)
            </p>
            <ArrowLabel>Veure&apos;ls tots</ArrowLabel>
          </NavLink>
        </div>
        <p
          style={{
            textAlign: "center",
            color: "var(--pedra)",
            fontSize: ".85rem",
            padding: "1.5rem 0",
          }}
        >
          Fotografies d&apos;exemple, pendents de confirmar quina va a cada
          producte.
        </p>
      </div>
      <SiteFooter />
    </section>
  );
}
