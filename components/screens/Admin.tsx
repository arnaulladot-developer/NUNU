"use client";

import Image from "next/image";
import { useNavigation } from "@/context/navigation";
import { useBotiga } from "@/context/botiga";
import {
  ESTATS_COMANDA,
  PRODUCTES,
  getProducteById,
  type EstatComanda,
} from "@/lib/data";

/** Només els estats que compten com a feina pendent per a la propietària. */
const ESTATS_PENDENTS: EstatComanda[] = ["Comprat", "Tramitat"];

/**
 * Panell intern de la propietària (ADR-014, arquitectura.md): comandes
 * rebudes, canvi d'estat i control de quins rams estan exhaurits.
 *
 * És una demostració, no una zona privada de debò: la comprovació de
 * credencials viu al navegador (Seguiment.tsx) i qualsevol pot llegir-la al
 * codi que se li envia. Abans de producció cal autenticació al servidor.
 * Per això el panell ho diu obertament a dalt de tot, en lloc de fer veure
 * que és segur.
 */
export function Admin() {
  const { goTo } = useNavigation();
  const { comandes, canviarEstat, exhaurits, esExhaurit, commutarExhaurit, tancarSessioAdmin } =
    useBotiga();

  const pendents = comandes.filter((comanda) =>
    ESTATS_PENDENTS.includes(comanda.estat),
  ).length;
  const enviades = comandes.filter((comanda) => comanda.estat === "Enviat").length;

  function handleSortir() {
    tancarSessioAdmin();
    goTo("seguiment");
  }

  return (
    <section>
      <header className="admin-barra">
        <div className="admin-barra-marca">
          <Image
            src="/assets/logo.jpg"
            alt=""
            width={72}
            height={72}
            className="admin-barra-logo"
          />
          <div>
            <p className="admin-barra-titol">Zona privada</p>
            <p className="admin-barra-subtitol">Nunu Flowers</p>
          </div>
        </div>
        {/* `sobre-clar` és obligatori aquí: el botó secundari base porta text
            i vora en color paper perquè està pensat per anar sobre una foto,
            i sobre el fons clar del panell quedaria invisible. */}
        <button
          type="button"
          className="boto boto-secundari sobre-clar"
          onClick={handleSortir}
        >
          Sortir
        </button>
      </header>

      <div className="contenidor admin">
        <p className="admin-avis">
          <strong>Demostració.</strong> Aquesta zona encara no està protegida
          de debò: la contrasenya viu al navegador i qualsevol la pot llegir.
          Abans de posar la web en marxa cal connectar-hi autenticació real al
          servidor. Els canvis que facis aquí es guarden només en aquest
          navegador.
        </p>

        <div className="admin-resum">
          <div className="admin-xifra">
            <span className="admin-xifra-valor">{comandes.length}</span>
            <span className="admin-xifra-etiqueta">Comandes</span>
          </div>
          <div className="admin-xifra">
            <span className="admin-xifra-valor">{pendents}</span>
            <span className="admin-xifra-etiqueta">Per preparar</span>
          </div>
          <div className="admin-xifra">
            <span className="admin-xifra-valor">{enviades}</span>
            <span className="admin-xifra-etiqueta">En camí</span>
          </div>
          <div className="admin-xifra">
            <span className="admin-xifra-valor">{exhaurits.length}</span>
            <span className="admin-xifra-etiqueta">Rams exhaurits</span>
          </div>
        </div>

        <section className="admin-seccio">
          <div className="admin-seccio-cap">
            <h2>Comandes</h2>
            <p>Canvia l&apos;estat i el client el veurà a Seguiment de comanda.</p>
          </div>

          <div className="admin-comandes">
            {comandes.map((comanda) => {
              const producte = getProducteById(comanda.productId);
              const estatClasse = comanda.estat
                .toLowerCase()
                .replace("·", "")
                .replace(/[^a-z]/g, "");
              return (
                <article key={comanda.id} className="admin-comanda">
                  <div className="admin-comanda-cap">
                    <div>
                      <p className="admin-comanda-id">{comanda.id}</p>
                      <p className="admin-comanda-data">{comanda.data}</p>
                    </div>
                    <span className={`admin-estat admin-estat--${estatClasse}`}>
                      {comanda.estat}
                    </span>
                  </div>

                  <div className="admin-comanda-cos">
                    <div className="admin-comanda-bloc">
                      <p className="admin-etiqueta">Client</p>
                      <p>{comanda.client}</p>
                      <p className="admin-suau">{comanda.correu}</p>
                      <p className="admin-suau">{comanda.telefon}</p>
                    </div>
                    <div className="admin-comanda-bloc">
                      <p className="admin-etiqueta">Enviament</p>
                      <p>{comanda.adreca}</p>
                    </div>
                    <div className="admin-comanda-bloc">
                      <p className="admin-etiqueta">Comanda</p>
                      <p>
                        {producte ? producte.nom : comanda.productId} ×{" "}
                        {comanda.quantitat}
                      </p>
                      <p className="admin-total">{comanda.total} €</p>
                    </div>
                  </div>

                  {comanda.comentari && (
                    <p className="admin-comentari">
                      <span className="admin-etiqueta">Nota del client</span>
                      {comanda.comentari}
                    </p>
                  )}

                  <div className="admin-comanda-accions">
                    <label htmlFor={`estat-${comanda.id}`}>Estat</label>
                    <select
                      id={`estat-${comanda.id}`}
                      value={comanda.estat}
                      onChange={(event) =>
                        canviarEstat(comanda.id, event.target.value as EstatComanda)
                      }
                    >
                      {ESTATS_COMANDA.map((estat) => (
                        <option key={estat} value={estat}>
                          {estat}
                        </option>
                      ))}
                    </select>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="admin-seccio">
          <div className="admin-seccio-cap">
            <h2>Estoc</h2>
            <p>
              Marca un ram com a exhaurit i deixarà d&apos;acceptar comandes a
              la botiga fins que el tornis a activar.
            </p>
          </div>

          <div className="admin-estoc">
            {PRODUCTES.map((producte) => {
              const fora = esExhaurit(producte.id);
              return (
                <article
                  key={producte.id}
                  className={`admin-ram${fora ? " admin-ram--exhaurit" : ""}`}
                >
                  <div className="admin-ram-foto">
                    <Image
                      src={producte.foto}
                      alt=""
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="admin-ram-info">
                    <p className="admin-ram-nom">{producte.nom}</p>
                    <p className="admin-suau">{producte.preu} €</p>
                    <p className={`admin-ram-estat${fora ? " admin-ram-estat--fora" : ""}`}>
                      {fora ? "Exhaurit" : "A la venda"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`boto ${
                      fora ? "boto-principal" : "boto-secundari sobre-clar"
                    } admin-ram-boto`}
                    onClick={() => commutarExhaurit(producte.id)}
                  >
                    {fora ? "Tornar a vendre" : "Marcar exhaurit"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
