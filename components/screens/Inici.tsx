"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { ArrowLabel } from "@/components/ArrowLabel";
import { useHeroParallax } from "@/hooks/useHeroParallax";

export function Inici() {
  const heroRef = useHeroParallax<HTMLDivElement>();

  return (
    <section>
      <SiteHeader revealOnScroll />

      <div className="hero">
        <div className="placeholder">
          <Image
            src="/assets/foto-5.jpg"
            alt="Fotografia d'exemple facilitada pel client — ram sobre esglaons de pedra"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "70% 45%" }}
            priority
          />
        </div>
        <span className="badge-exemple">Foto d&apos;exemple — pendent de confirmar</span>
        <div className="hero-contingut" ref={heroRef}>
          <h1>Nunu Flowers</h1>
          <p>
            Rams de flor seca compostos a mà, i projectes a mida per a
            casaments i esdeveniments.
          </p>
          <div className="botons">
            <NavLink to="botiga" className="boto boto-principal">
              Veure la botiga
            </NavLink>
            <NavLink to="contacte" className="boto boto-secundari sobre-clar">
              Demanar un encàrrec
            </NavLink>
          </div>
        </div>
      </div>

      <div className="hero-panel">
        <div className="contenidor">
          <section className="inici-seccio">
            <h2>Dues maneres de començar</h2>
            <p className="inici-seccio-intro">
              Tria un ram ja compost de la col·lecció, o explica&apos;ns el
              projecte i preparem un encàrrec fet a mida.
            </p>
            <div className="inici-graella-dos">
              <NavLink to="botiga" className="inici-bloc">
                <div className="placeholder">
                  <Image
                    src="/assets/foto-3.jpg"
                    alt="Fotografia d'exemple — ram de la col·lecció"
                    fill
                    sizes="(max-width: 720px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="badge-exemple">Foto d&apos;exemple</span>
                </div>
                <h3>La col·lecció</h3>
                <p>
                  Vint composicions, cadascuna documentada com una pàgina
                  d&apos;un quadern de flors premsades: espècie a espècie.
                </p>
                <ArrowLabel>Veure tots els rams</ArrowLabel>
              </NavLink>
              <NavLink to="projectes" className="inici-bloc">
                <div className="placeholder">
                  <Image
                    src="/assets/foto-4.jpg"
                    alt="Fotografia d'exemple — projecte de casament"
                    fill
                    sizes="(max-width: 720px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="badge-exemple">Foto d&apos;exemple</span>
                </div>
                <h3>Encàrrecs i esdeveniments</h3>
                <p>
                  Casaments, decoració i projectes a mida. Es parla abans de
                  compondre.
                </p>
                <ArrowLabel>Veure projectes</ArrowLabel>
              </NavLink>
            </div>
          </section>

          <section className="inici-historia">
            <p className="inici-historia-destacat">
              &ldquo;Vaig començar amb flor seca perquè volia regalar alguna
              cosa que no s&apos;apagués al cap de tres dies.&rdquo;
            </p>
            <p className="inici-historia-cos">
              La Núria va créixer envoltada d&apos;hivernacles al Penedès, i
              quan va decidir dedicar-s&apos;hi ho va fer al revés del que
              havia après: en comptes de flor fresca que dura una setmana,
              composa rams de flor seca que es queden anys sencers a casa.
              Cada peça surt de les seves mans, espècie a espècie, pensada
              per regalar-se, penjar-se o mirar-se sense pressa — i per no
              haver-se de tornar a comprar l&apos;any que ve.
            </p>
          </section>
        </div>

        <SiteFooter variant="inici" />
      </div>
    </section>
  );
}
