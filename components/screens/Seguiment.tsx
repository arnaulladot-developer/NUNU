"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useNavigation } from "@/context/navigation";
import { useBotiga } from "@/context/botiga";

/** Credencials de demostració del panell intern (ADR-014). No són cap
 * mesura de seguretat: viuen al codi que s'envia al navegador i qualsevol
 * les pot llegir. Serveixen per ensenyar el panell a la clienta i prou —
 * abans de producció, autenticació real al servidor. */
const CORREU_PROPIETARIA = "hola@nunuflowers.com";
const CLAU_PROPIETARIA = "nunu-flowers";

/**
 * Demostració purament de client, sense backend real (mateix criteri que
 * el formulari de Contacte): en enviar el formulari de cerca s'amaga i
 * apareix un resultat ja preparat. L'excepció és la combinació de
 * credencials de la propietària, que porta al panell intern (ADR-014).
 */
export function Seguiment() {
  const [mostraResultat, setMostraResultat] = useState(false);
  const [comanda, setComanda] = useState("");
  const [correu, setCorreu] = useState("");
  const { goTo } = useNavigation();
  const { obrirSessioAdmin } = useBotiga();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const esPropietaria =
      correu.trim().toLowerCase() === CORREU_PROPIETARIA &&
      comanda.trim().toLowerCase() === CLAU_PROPIETARIA;

    if (esPropietaria) {
      obrirSessioAdmin();
      goTo("admin");
      return;
    }

    setMostraResultat(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleTornar() {
    setMostraResultat(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section>
      <SiteHeader />

      {!mostraResultat && (
        <div className="contenidor">
          <div className="seguiment-cerca">
            <div className="seguiment-cerca-graella">
              <div className="seguiment-cerca-foto placeholder">
                <Image
                  src="/assets/foto-seguiment.jpg"
                  alt="Fotografia d'exemple — preparació d'una comanda"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="badge-exemple">
                  Foto d&apos;exemple — pendent de confirmar
                </span>
              </div>
              <div className="seguiment-cerca-info">
                <p className="num-comanda">Seguiment de comanda</p>
                <h1>Consulta l&apos;estat del teu ram</h1>
                <p className="seguiment-intro">
                  Introdueix el número de comanda que et vam enviar per
                  correu i l&apos;adreça electrònica amb què vas comprar.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="camp">
                    <label htmlFor="seg-comanda">Número de comanda</label>
                    <input
                      type="text"
                      id="seg-comanda"
                      name="seg-comanda"
                      placeholder="Per exemple, NF-8K2P91Q"
                      value={comanda}
                      onChange={(event) => setComanda(event.target.value)}
                      required
                    />
                  </div>
                  <div className="camp">
                    <label htmlFor="seg-correu">
                      Correu electrònic de la comanda
                    </label>
                    <input
                      type="email"
                      id="seg-correu"
                      name="seg-correu"
                      placeholder="nom@exemple.cat"
                      value={correu}
                      onChange={(event) => setCorreu(event.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="boto boto-principal"
                    style={{ width: "100%" }}
                  >
                    Veure l&apos;estat
                  </button>
                </form>
                <p className="contacte-nota">
                  El número de comanda surt al correu de confirmació — mai
                  és el número de la comanda anterior més u, perquè no es
                  pugui endevinar. Si no el trobes, escriu-nos per WhatsApp:
                  +34 611 22 33 44.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostraResultat && (
        <div className="contenidor-estret">
          <div className="seguiment">
            <button
              type="button"
              className="enllac-fletxa enllac-fletxa--enrere seguiment-nova-cerca"
              onClick={handleTornar}
            >
              <span className="fletxa" aria-hidden="true" />
              Fer una altra cerca
            </button>
            <div className="seguiment-cap">
              <p className="num-comanda">Comanda #NF-7QXT2M9K</p>
              <h1>El teu ram està en camí</h1>
            </div>

            <div className="estats">
              <div className="estat fet">
                <div className="punt" />
                <span>Comprat</span>
              </div>
              <div className="estat fet">
                <div className="punt" />
                <span>Tramitat</span>
              </div>
              <div className="estat actual">
                <div className="punt" />
                <span>Enviat</span>
              </div>
              <div className="estat">
                <div className="punt" />
                <span>Arribat</span>
              </div>
            </div>

            <div className="seguiment-detall">
              <p>
                <strong>Vesc</strong> · 38 €
              </p>
              <p>
                Enviat el 17 de setembre amb GLS. Arribada estimada: 2-3 dies
                laborables.
              </p>
              <p>Qualsevol dubte, escriu-nos per WhatsApp: +34 611 22 33 44.</p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </section>
  );
}
