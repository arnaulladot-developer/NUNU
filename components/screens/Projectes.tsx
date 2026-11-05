"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { useNavigation } from "@/context/navigation";
import { PROJECTES, getOcasio } from "@/lib/data";

const BOTO_PER_OCASIO = {
  casaments: "Explica'ns el teu casament",
  esdeveniments: "Explica'ns el teu esdeveniment",
} as const;

export function Projectes() {
  const { filtre } = useNavigation();
  const ocasio = getOcasio(filtre);
  const projectes = ocasio
    ? PROJECTES.filter((projecte) => projecte.ocasio === ocasio.id)
    : PROJECTES;

  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>{ocasio ? ocasio.nom : "Ocasions"}</h1>
          <p className="text-pendent">
            Text d&apos;aquesta secció pendent: la Núria el facilitarà
            (document de Word).
          </p>
        </div>
        <div className="projectes-graella">
          {projectes.map((projecte) => (
            <NavLink
              key={projecte.id}
              to="projecte-detall"
              className="projecte-item"
            >
              <div className="placeholder">
                <Image
                  src={projecte.foto}
                  alt={
                    projecte.fotoReal
                      ? projecte.titol
                      : `Fotografia d'exemple — ${projecte.titol}`
                  }
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
            {ocasio ? BOTO_PER_OCASIO[ocasio.id] : "Explica'ns la teva ocasió"}
          </NavLink>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
