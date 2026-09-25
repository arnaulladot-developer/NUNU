"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackLink } from "@/components/BackLink";
import { Carousel, type CarouselImage } from "@/components/Carousel";

const FOTOS_PROJECTE: CarouselImage[] = [
  {
    src: "/assets/foto-4.jpg",
    alt: "Fotografia d'exemple del projecte, vista 1",
    badge: "Foto d'exemple — pendent de confirmar",
  },
  { src: "/assets/foto-2.jpg", alt: "Fotografia d'exemple del projecte, vista 2" },
  { src: "/assets/foto-5.jpg", alt: "Fotografia d'exemple del projecte, vista 3" },
];

/**
 * Tots els projectes de la graella porten a aquest mateix detall d'exemple
 * (mateixa decisió que a Fitxa) fins que hi hagi contingut real per
 * projecte.
 */
export function ProjecteDetall() {
  return (
    <section>
      <SiteHeader />
      <div className="projecte-detall-hero">
        <Carousel
          images={FOTOS_PROJECTE}
          ariaLabel="Fotos del projecte"
          sizes="100vw"
          gran
        />
      </div>
      <div className="contenidor-estret projecte-detall-cos">
        <BackLink to="projectes">Tots els esdeveniments</BackLink>
        <p className="etiqueta-nota">Casament · maig 2026</p>
        <h1>Casament a can Ferrer</h1>
        <p className="projecte-descripcio">
          La Clara i en Pol volien un ram de núvia i una decoració de taules
          que aguantessin tot el cap de setmana sense aigua ni manteniment —
          la masia és a mitja hora del poble més proper, i cap flor fresca
          hauria arribat sencera al diumenge. Vam compondre el ram amb
          estàtice, lagurus i espigues de blat, i vint-i-quatre centres de
          taula amb la mateixa paleta, tots preparats amb tres setmanes
          d&apos;antelació i transportats ja muntats. El diumenge tot feia el
          mateix aspecte que el divendres, que era exactament el que ens
          havien demanat.
        </p>
      </div>
      <SiteFooter />
    </section>
  );
}
