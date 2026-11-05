"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACTE, FIRES } from "@/lib/data";

export function Fires() {
  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>Fires</h1>
          <p>Les fires i els mercats on trobaràs Nunu Flowers.</p>
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
          <div className="projectes-graella">
            {FIRES.map((fira) => (
              <article key={fira.id} className="projecte-item">
                {fira.foto && (
                  <div className="placeholder">
                    <Image
                      src={fira.foto}
                      alt={`Fotografia de la fira ${fira.nom}`}
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="etiqueta">
                  <h3>{fira.nom}</h3>
                  <span>
                    {fira.lloc} · {fira.dates}
                  </span>
                  {fira.descripcio && <p>{fira.descripcio}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </section>
  );
}
