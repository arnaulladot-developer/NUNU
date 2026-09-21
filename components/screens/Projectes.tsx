"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { PROJECTES } from "@/lib/data";

export function Projectes() {
  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>Projectes</h1>
          <p>
            Casaments, esdeveniments i decoració. Feina real feta a mida —
            no és un catàleg de compra directa.
          </p>
        </div>
        <div className="projectes-graella">
          {PROJECTES.map((projecte) => (
            <NavLink
              key={projecte.id}
              to="projecte-detall"
              className="projecte-item"
            >
              <div className="placeholder">
                <Image
                  src={projecte.foto}
                  alt={`Fotografia d'exemple — ${projecte.titol}`}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="etiqueta">
                <h3>{projecte.titol}</h3>
                <span>
                  {projecte.categoria} · {projecte.data}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
        <div style={{ textAlign: "center", margin: "3rem 0" }}>
          <NavLink to="contacte" className="boto boto-principal">
            Explica&apos;ns el teu projecte
          </NavLink>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
