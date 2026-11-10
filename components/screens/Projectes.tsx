"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { useNavigation } from "@/context/navigation";
import {
  CONTACTE,
  FOTOS_ESDEVENIMENTS,
  OCASIONS,
  TEXTOS_OCASIONS,
  getOcasio,
  type OcasioId,
} from "@/lib/data";

const BOTO_PER_OCASIO: Record<OcasioId, string> = {
  casaments: "Explica'ns la teva idea",
  esdeveniments: "Explica'ns el teu esdeveniment",
};

function SeccioOcasio({ id, nom, titolPrincipal }: { id: OcasioId; nom: string; titolPrincipal: boolean }) {
  const Titol = titolPrincipal ? "h1" : "h2";
  return (
    <div className="ocasio">
      <div className="pagina-cap">
        <Titol>{nom}</Titol>
        {TEXTOS_OCASIONS[id].map((paragraf) => (
          <p key={paragraf}>{paragraf}</p>
        ))}
      </div>

      {id === "esdeveniments" && (
        <div className="projectes-graella">
          {FOTOS_ESDEVENIMENTS.map((foto) => (
            <figure key={foto.id} className="projecte-item">
              <div className="placeholder">
                <Image
                  src={foto.foto}
                  alt={foto.titol}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="etiqueta">
                <h3>{foto.titol}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="ocasio-contacte">
        <NavLink to="contacte" className="boto boto-principal">
          {BOTO_PER_OCASIO[id]}
        </NavLink>
        <p>
          O escriu-nos directament: WhatsApp{" "}
          <a href={CONTACTE.whatsappHref}>{CONTACTE.telefon}</a> · correu{" "}
          <a href={`mailto:${CONTACTE.correu}`}>{CONTACTE.correu}</a>
        </p>
      </div>
    </div>
  );
}

export function Projectes() {
  const { filtre } = useNavigation();
  const ocasio = getOcasio(filtre);
  const seccions = ocasio ? [ocasio] : OCASIONS;

  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        {seccions.map((seccio) => (
          <SeccioOcasio
            key={seccio.id}
            id={seccio.id}
            nom={seccio.nom}
            titolPrincipal={seccions.length === 1}
          />
        ))}
      </div>
      <SiteFooter />
    </section>
  );
}
