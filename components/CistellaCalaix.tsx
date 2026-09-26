"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavLink } from "@/components/NavLink";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/context/cart";
import { useBotiga } from "@/context/botiga";
import { getProducteById } from "@/lib/data";

/**
 * Calaix lateral de la cistella (ADR-008, arquitectura.md): substitueix la
 * pantalla `Cistella` que hi havia abans. Es munta un únic cop a
 * `app/page.tsx`, per sobre de qualsevol pantalla activa, i el seu estat
 * obert/tancat viu a `context/cart.tsx` — així es pot obrir des del botó
 * flotant de `SiteHeader.tsx` sense navegar-hi ni perdre la pantalla on
 * l'usuari estava.
 *
 * Demostració purament de client (mateix criteri que Contacte i Seguiment):
 * en confirmar la comanda no hi ha encara pagament ni backend real —
 * pendent de Stripe/Bizum quan es passi a producció (ADR-004,
 * arquitectura.md). El contingut es guarda a `localStorage`
 * (context/cart.tsx) perquè no es perdi en recarregar.
 */
export function CistellaCalaix() {
  const {
    articles,
    actualitzarQuantitat,
    actualitzarComentari,
    eliminar,
    buidar,
    totalArticles,
    totalPreu,
    calaixObert,
    tancarCalaix,
  } = useCart();
  const { esExhaurit } = useBotiga();
  // Un ram es pot exhaurir (ADR-014) quan ja és a la cistella d'algú: cal
  // aturar-ho abans de confirmar, no només a la botiga.
  const articlesExhaurits = articles.filter((article) => esExhaurit(article.productId));
  const [comandaConfirmada, setComandaConfirmada] = useState(false);
  const panellRef = useRef<HTMLDivElement | null>(null);
  const tancarBtnRef = useRef<HTMLButtonElement | null>(null);

  // Bloqueja l'scroll de fons i mou el focus al botó de tancar mentre el
  // calaix està obert; en tancar-se, torna el focus al botó que l'ha obert
  // (WCAG 2.2 — 2.4.3 ordre de focus, 2.1.2 sense trampa de teclat).
  useEffect(() => {
    if (!calaixObert) return;
    const cosAbans = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    tancarBtnRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") tancarCalaix();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = cosAbans;
      window.removeEventListener("keydown", handleKeyDown);
      document.getElementById("boto-cistella")?.focus();
    };
  }, [calaixObert, tancarCalaix]);

  function handleFinalitzar() {
    if (articlesExhaurits.length > 0) return;
    setComandaConfirmada(true);
    buidar();
    if (panellRef.current) panellRef.current.scrollTop = 0;
  }

  function handleTancar() {
    tancarCalaix();
    // Deixa preparat un calaix buit la propera vegada que s'obri, en lloc
    // de mostrar la confirmació de la comanda anterior.
    window.setTimeout(() => setComandaConfirmada(false), 300);
  }

  return (
    <>
      <div
        className={`calaix-fons${calaixObert ? " calaix-fons--visible" : ""}`}
        onClick={handleTancar}
        aria-hidden="true"
      />
      <aside
        className={`calaix-cistella${calaixObert ? " calaix-cistella--obert" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Cistella"
        aria-hidden={!calaixObert}
        ref={panellRef}
      >
        <div className="calaix-capcalera">
          <h2>{comandaConfirmada ? "Comanda registrada" : "La teva cistella"}</h2>
          <button
            type="button"
            className="calaix-tancar"
            aria-label="Tancar la cistella"
            onClick={handleTancar}
            ref={tancarBtnRef}
            tabIndex={calaixObert ? 0 : -1}
          >
            ✕
          </button>
        </div>

        {comandaConfirmada ? (
          <div className="calaix-cos calaix-confirmacio">
            <p>
              <strong>Gràcies per la teva comanda.</strong>
            </p>
            <p>
              La Núria la revisa avui mateix i et confirma per correu el
              termini d&apos;enviament exacte.
            </p>
            <p>Qualsevol dubte, escriu-nos per WhatsApp: +34 611 22 33 44.</p>
            <NavLink
              to="botiga"
              className="boto boto-principal"
              onNavigate={handleTancar}
              tabIndex={calaixObert ? 0 : -1}
            >
              Continuar comprant
            </NavLink>
          </div>
        ) : articles.length === 0 ? (
          <div className="calaix-cos calaix-buit">
            <p>Encara no hi has afegit cap ram.</p>
            <NavLink
              to="botiga"
              className="boto boto-principal"
              onNavigate={handleTancar}
              tabIndex={calaixObert ? 0 : -1}
            >
              Anar als rams
            </NavLink>
          </div>
        ) : (
          <>
            <div className="calaix-cos">
              <ul className="calaix-llista">
                {articles.map((article) => {
                  const producte = getProducteById(article.productId);
                  if (!producte) return null;
                  return (
                    <li className="calaix-article" key={article.productId}>
                      <div className="calaix-article-foto placeholder">
                        <Image
                          src={producte.foto}
                          alt="Fotografia d'exemple de producte"
                          fill
                          sizes="64px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="calaix-article-info">
                        <div className="calaix-article-capcalera">
                          <p className="producte-nom">
                            {producte.nom}
                            {esExhaurit(article.productId) && (
                              <span className="calaix-exhaurit">Exhaurit</span>
                            )}
                          </p>
                          <button
                            type="button"
                            className="calaix-eliminar"
                            aria-label={`Eliminar ${producte.nom} de la cistella`}
                            onClick={() => eliminar(article.productId)}
                            tabIndex={calaixObert ? 0 : -1}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="calaix-article-camp">
                          <QuantityStepper
                            id={`calaix-quantitat-${article.productId}`}
                            value={article.quantitat}
                            onChange={(quantitat) =>
                              actualitzarQuantitat(article.productId, quantitat)
                            }
                          />
                          <span className="calaix-article-preu">
                            {(producte.preu * article.quantitat).toFixed(2)} €
                          </span>
                        </div>
                        <div className="camp calaix-article-comentari">
                          <label htmlFor={`calaix-comentari-${article.productId}`}>
                            Comentari (opcional)
                          </label>
                          <input
                            type="text"
                            id={`calaix-comentari-${article.productId}`}
                            placeholder="Per exemple, sense targeta de regal"
                            maxLength={140}
                            value={article.comentari}
                            onChange={(event) =>
                              actualitzarComentari(article.productId, event.target.value)
                            }
                            tabIndex={calaixObert ? 0 : -1}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="calaix-resum">
              <div className="calaix-resum-linia">
                <span>{totalArticles === 1 ? "1 article" : `${totalArticles} articles`}</span>
                <span>{totalPreu.toFixed(2)} €</span>
              </div>
              <div className="calaix-resum-linia calaix-resum-total">
                <span>Total</span>
                <span>{totalPreu.toFixed(2)} €</span>
              </div>
              {articlesExhaurits.length > 0 && (
                <p className="calaix-avis">
                  {articlesExhaurits.length === 1
                    ? "Un dels rams s'ha exhaurit mentre era a la cistella."
                    : "Alguns rams s'han exhaurit mentre eren a la cistella."}{" "}
                  Treu-lo de la cistella per poder finalitzar la comanda.
                </p>
              )}
              <p className="calaix-nota">
                Enviament gratuït a partir de 45 €; per sota, 4,90 €. Es
                calcula en confirmar la comanda.
              </p>
              <button
                type="button"
                className="boto boto-principal"
                style={{ width: "100%" }}
                onClick={handleFinalitzar}
                disabled={articlesExhaurits.length > 0}
                tabIndex={calaixObert ? 0 : -1}
              >
                Finalitzar comanda
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
