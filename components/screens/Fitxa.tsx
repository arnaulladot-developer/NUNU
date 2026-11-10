"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackLink } from "@/components/BackLink";
import { NavLink } from "@/components/NavLink";
import { Carousel } from "@/components/Carousel";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/context/cart";
import { useBotiga } from "@/context/botiga";
import { useNavigation } from "@/context/navigation";
import {
  CONTACTE,
  getCategoria,
  getProducteById,
  type Producte,
} from "@/lib/data";

/** Fitxa d'un producte; el producte el decideix el filtre de navegació. */
export function Fitxa() {
  const { filtre } = useNavigation();
  const producte = getProducteById(filtre);

  if (!producte) {
    return (
      <section>
        <SiteHeader />
        <div className="contenidor">
          <div className="estat-buit">
            <h1>No trobem aquest producte</h1>
            <p>Potser ja no és a la botiga. Mira què tenim ara mateix.</p>
            <NavLink to="botiga" className="boto boto-principal">
              Anar a la botiga
            </NavLink>
          </div>
        </div>
        <SiteFooter />
      </section>
    );
  }

  // `key` reinicia la mida i la quantitat en passar d'un producte a un altre.
  return <FitxaProducte key={producte.id} producte={producte} />;
}

function FitxaProducte({ producte }: { producte: Producte }) {
  const { afegir } = useCart();
  const { esExhaurit } = useBotiga();
  const exhaurit = esExhaurit(producte.id);
  const categoria = getCategoria(producte.categoria);
  const [midaId, setMidaId] = useState(producte.mides[0].id);
  const [quantitat, setQuantitat] = useState(1);
  const [confirmat, setConfirmat] = useState(false);
  const mida = producte.mides.find((m) => m.id === midaId) ?? producte.mides[0];
  const mesDUnaMida = producte.mides.length > 1;

  function handleAfegir() {
    if (exhaurit) return;
    afegir(producte.id, mida.id, quantitat);
    setConfirmat(true);
    window.setTimeout(() => setConfirmat(false), 1800);
  }

  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <BackLink to="botiga" filtre={categoria?.id} className="pagina-tornar">
          Tornar a la botiga
        </BackLink>
        <div className="fitxa">
          <div className="fitxa-foto">
            {producte.fotos.length > 0 ? (
              <Carousel
                images={producte.fotos}
                ariaLabel={`Fotos de ${producte.nom}`}
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            ) : (
              <div className="fitxa-foto-pendent placeholder">
                <span className="foto-pendent">Foto pendent</span>
              </div>
            )}
          </div>
          <div className="fitxa-info">
            <p className="etiqueta-nota">
              Fet per encàrrec · S&apos;envia en 2-3 dies laborables
            </p>
            <h1>{producte.nom}</h1>
            <p className="fitxa-preu">{mida.preu} €</p>

            {producte.descripcio.map((paragraf) => (
              <p className="fitxa-descripcio" key={paragraf}>
                {paragraf}
              </p>
            ))}

            <fieldset className="fitxa-mides">
              <legend>{mesDUnaMida ? "Tria la teva mida" : "Mida"}</legend>
              <div className="mides-llista">
                {producte.mides.map((opcio) => (
                  <label
                    key={opcio.id}
                    className={`mida-opcio${opcio.id === mida.id ? " mida-opcio--activa" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`mida-${producte.id}`}
                      value={opcio.id}
                      checked={opcio.id === mida.id}
                      onChange={() => setMidaId(opcio.id)}
                      disabled={!mesDUnaMida}
                    />
                    <span className="mida-etiqueta">{opcio.etiqueta}</span>
                    <span className="mida-detall">{opcio.detall}</span>
                    <span className="mida-preu">{opcio.preu} €</span>
                  </label>
                ))}
              </div>
              {producte.notaMides && <p className="mides-nota">{producte.notaMides}</p>}
            </fieldset>

            <div className="fitxa-bloc">
              <h2>Característiques</h2>
              <ul className="caracteristiques-llista">
                {producte.caracteristiques.map((caracteristica) => (
                  <li key={caracteristica}>{caracteristica}</li>
                ))}
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
            {exhaurit && (
              <p className="fitxa-exhaurit">
                Aquest producte està exhaurit ara mateix. Escriu-nos per WhatsApp
                ({CONTACTE.telefon}) i et direm quan el tornarem a tenir.
              </p>
            )}
            <div className="fitxa-quantitat">
              <label htmlFor="fitxa-quantitat">Quantitat</label>
              <QuantityStepper id="fitxa-quantitat" value={quantitat} onChange={setQuantitat} />
            </div>
            <button
              type="button"
              className="boto boto-principal"
              style={{ width: "100%" }}
              onClick={handleAfegir}
              disabled={exhaurit}
            >
              {exhaurit
                ? "Exhaurit"
                : confirmat
                  ? "Afegit a la cistella ✓"
                  : "Afegir a la cistella"}
            </button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
