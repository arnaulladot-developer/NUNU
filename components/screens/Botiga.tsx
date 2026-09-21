"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { ArrowLabel } from "@/components/ArrowLabel";
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
            <NavLink key={producte.id} to="fitxa" className="producte-targeta">
              <div className="placeholder">
                <Image
                  src={producte.foto}
                  alt="Fotografia d'exemple de producte"
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="badge-exemple">Foto d&apos;exemple</span>
              </div>
              <p className="producte-nom">{producte.nom}</p>
              <p className="producte-composicio">{producte.composicio}</p>
              <div className="producte-preu">{producte.preu} €</div>
            </NavLink>
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
