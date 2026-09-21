"use client";

import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Formulari de demostració: sense backend real encara (ADR pendent per a
 * la fase de producció), però amb `preventDefault` perquè enviar-lo no
 * recarregui la pàgina — la maqueta HTML original no ho evitava, i en un
 * desplegament real això buidava l'estat de tota la SPA (bug corregit
 * aquí, vegeu la resposta de la conversió).
 */
export function Contacte() {
  const [enviat, setEnviat] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviat(true);
  }

  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>Explica&apos;ns el teu projecte</h1>
          <p>
            Casament, esdeveniment o decoració. Amb aquestes dades, la Núria
            et respon ja amb una proposta concreta — sense els tres missatges
            d&apos;anada i tornada d&apos;avui.
          </p>
        </div>
        <div className="contacte-graella">
          {enviat ? (
            <div className="seguiment-detall">
              <p>
                <strong>Sol·licitud registrada.</strong>
              </p>
              <p>
                Gràcies! La Núria revisa els encàrrecs cada dia i et respon
                al correu que ens has deixat en menys de 24 hores laborables.
              </p>
              <p>Qualsevol dubte mentrestant, escriu-nos per WhatsApp: +34 611 22 33 44.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="camp">
                <label htmlFor="tipus">Tipus d&apos;acte</label>
                <select id="tipus" name="tipus" defaultValue="Casament">
                  <option>Casament</option>
                  <option>Esdeveniment d&apos;empresa</option>
                  <option>Decoració</option>
                  <option>Altres</option>
                </select>
              </div>
              <div className="camp">
                <label htmlFor="data-acte">Data prevista</label>
                <input type="date" id="data-acte" name="data-acte" />
              </div>
              <div className="camp">
                <label htmlFor="lloc">Lloc</label>
                <input
                  type="text"
                  id="lloc"
                  name="lloc"
                  placeholder="Ciutat o espai"
                />
              </div>
              <div className="camp">
                <label htmlFor="detalls">Explica&apos;ns-ho una mica més</label>
                <textarea
                  id="detalls"
                  name="detalls"
                  rows={4}
                  placeholder="Nombre de convidats, estil, pressupost aproximat…"
                />
              </div>
              <div className="camp">
                <label htmlFor="contacte-email">El teu correu</label>
                <input
                  type="email"
                  id="contacte-email"
                  name="contacte-email"
                  placeholder="nom@exemple.cat"
                  required
                />
              </div>
              <button
                type="submit"
                className="boto boto-principal sobre-clar"
                style={{ border: "1px solid var(--accent)", width: "100%" }}
              >
                Enviar la petició
              </button>
            </form>
          )}
          <div className="contacte-info">
            <h2>També ens trobes a</h2>
            <dl>
              <dt>WhatsApp</dt>
              <dd>+34 611 22 33 44</dd>
              <dt>Correu</dt>
              <dd>hola@nunuflowers.com</dd>
              <dt>Instagram</dt>
              <dd>@nunu__flowers</dd>
            </dl>
            <p className="contacte-nota">
              Botiga exclusivament en línia — sense local físic. Enviem a tot
              arreu on arribi el transportista.
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
