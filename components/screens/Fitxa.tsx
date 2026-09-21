"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackLink } from "@/components/BackLink";
import { Carousel, type CarouselImage } from "@/components/Carousel";

const FOTOS_FITXA: CarouselImage[] = [
  {
    src: "/assets/foto-3.jpg",
    alt: "Fotografia d'exemple de producte, vista 1",
    badge: "Foto d'exemple — pendent de confirmar",
  },
  { src: "/assets/foto-4.jpg", alt: "Fotografia d'exemple de producte, vista 2" },
  { src: "/assets/foto-5.jpg", alt: "Fotografia d'exemple de producte, vista 3" },
];

/**
 * De moment tots els productes de la Botiga porten a aquesta mateixa fitxa
 * d'exemple (decisió explícita del client mentre es prepara el catàleg
 * real) — no hi ha encara una fitxa per producte.
 */
export function Fitxa() {
  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <BackLink to="botiga" className="pagina-tornar">
          Tornar a la botiga
        </BackLink>
        <div className="fitxa">
          <div className="fitxa-foto">
            <Carousel
              images={FOTOS_FITXA}
              ariaLabel="Fotos del producte"
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>
          <div className="fitxa-info">
            <p className="etiqueta-nota">
              Fet per encàrrec · S&apos;envia en 2-3 dies laborables
            </p>
            <h1>Vesc</h1>
            <p className="fitxa-preu">38 €</p>
            <div className="fitxa-bloc">
              <h2>Composició</h2>
              <ul className="composicio-llista">
                <li>
                  <span>
                    <em>Lagurus ovatus</em>
                  </span>{" "}
                  <span>cua de conill</span>
                </li>
                <li>
                  <span>
                    <em>Limonium sinuatum</em>
                  </span>{" "}
                  <span>estàtice</span>
                </li>
                <li>
                  <span>
                    <em>Craspedia globosa</em>
                  </span>{" "}
                  <span>botó d&apos;or</span>
                </li>
                <li>
                  <span>
                    <em>Gypsophila paniculata</em>
                  </span>{" "}
                  <span>paniculata</span>
                </li>
              </ul>
            </div>
            <div className="fitxa-bloc">
              <h2>Enviament</h2>
              <p style={{ margin: 0, color: "var(--pedra)", fontSize: ".9rem" }}>
                Península: 24-48h laborables un cop preparat. Balears i
                Canàries: 3-5 dies. Enviament gratuït a partir de 45 €; per
                sota, 4,90 €.
              </p>
            </div>
            <a
              className="boto boto-principal"
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              Afegir al cistell
            </a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
