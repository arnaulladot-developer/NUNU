"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { useHeroParallax } from "@/hooks/useHeroParallax";

export function Inici() {
  const heroRef = useHeroParallax<HTMLDivElement>();

  return (
    <section>
      <SiteHeader />

      <div className="hero">
        <div className="placeholder">
          <Image
            src="/assets/client/foto-02996.jpg"
            alt="Ram sec de la Núria amb clavells rosa i vermells, cues de conill i espigues"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="hero-contingut" ref={heroRef}>
          <h1>Taller floral</h1>
          <p className="hero-lema">
            Flors fetes amb amor, pensades per fer especial cada moment.
          </p>
          <div className="botons">
            <NavLink to="botiga" className="boto boto-principal">
              Descobreix les meves flors
            </NavLink>
          </div>
        </div>
      </div>

      <div className="hero-panel">
        <div className="contenidor">
          <section className="inici-mi" aria-labelledby="inici-mi-titol">
            <h2 id="inici-mi-titol">Una mica de mi</h2>
            <p className="inici-mi-salutacio">Hola! Soc la Núria.</p>
            <p>
              El que va començar com una afició pel món de les flors s’ha
              convertit avui en la meva feina. M’encanta poder expressar-me a
              través d’elles, deixar volar la imaginació i donar vida a la meva
              creativitat en cada creació.
            </p>
            <p>
              Però el que més m’agrada és poder formar part dels vostres
              moments especials, dels dies més importants de les vostres vides
              i d’aquelles ocasions en què regaleu flors per expressar alguna
              cosa bonica. Em fa molta il·lusió sentir que, d’alguna manera,
              també en formo part. <span aria-hidden="true">❤️</span>
            </p>
          </section>
        </div>

        <SiteFooter variant="inici" />
      </div>
    </section>
  );
}
