"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACTE, FIRES, FOTOS_FIRES } from "@/lib/data";

export function Fires() {
  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>Fires</h1>
          <p>
            Vols venir a veure les nostres creacions en directe? Ens trobaràs
            ben aviat a les properes fires i mercats de temporada:
          </p>
        </div>

        {FIRES.length === 0 ? (
          <div className="estat-buit">
            <h2>Encara no hi ha cap fira publicada</h2>
            <p>
              Quan tinguem les properes dates, les trobaràs aquí. Mentrestant,
              segueix-nos a Instagram i t&apos;avisem a les històries.
            </p>
            <a
              className="boto boto-principal"
              href={CONTACTE.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Seguir a Instagram
            </a>
          </div>
        ) : (
          <ul className="fires-llista">
            {FIRES.map((fira) => (
              <li key={fira.id} className="fira">
                <p className="fira-data">{fira.dates}</p>
                <h2 className="fira-nom">{fira.nom}</h2>
                <p className="fira-horari">{fira.horari}</p>
              </li>
            ))}
          </ul>
        )}

        <p className="fires-tancament">
          Passa a saludar-nos, descobreix les nostres corones i centres de
          Nadal en persona i capta tot el caliu de la temporada!
        </p>

        <div className="fires-fotos">
          {FOTOS_FIRES.map((foto) => (
            <div className="placeholder" key={foto.src}>
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
