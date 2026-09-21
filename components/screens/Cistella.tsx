"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/context/cart";
import { getProducteById } from "@/lib/data";

/**
 * Demostració purament de client (mateix criteri que Contacte i Seguiment):
 * en confirmar la comanda no hi ha encara pagament ni backend real —
 * pendent de Stripe/Bizum quan es passi a producció (ADR-002,
 * arquitectura.md). El contingut de la cistella es guarda a
 * `localStorage` (context/cart.tsx) perquè no es perdi en recarregar.
 */
export function Cistella() {
  const { articles, actualitzarQuantitat, actualitzarComentari, eliminar, buidar, totalArticles, totalPreu } =
    useCart();
  const [comandaConfirmada, setComandaConfirmada] = useState(false);

  function handleFinalitzar() {
    setComandaConfirmada(true);
    buidar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (comandaConfirmada) {
    return (
      <section>
        <SiteHeader />
        <div className="contenidor-estret">
          <div className="pagina-cap">
            <h1>Comanda registrada</h1>
          </div>
          <div className="seguiment-detall" style={{ marginBottom: "3rem" }}>
            <p>
              <strong>Gràcies per la teva comanda.</strong>
            </p>
            <p>
              La Núria la revisa avui mateix i et confirma per correu el
              termini d&apos;enviament exacte.
            </p>
            <p>Qualsevol dubte, escriu-nos per WhatsApp: +34 611 22 33 44.</p>
          </div>
          <NavLink to="botiga" className="boto boto-principal">
            Continuar comprant
          </NavLink>
        </div>
        <SiteFooter />
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section>
        <SiteHeader />
        <div className="contenidor-estret">
          <div className="pagina-cap">
            <h1>La teva cistella</h1>
            <p>Encara no hi has afegit cap ram.</p>
          </div>
          <div className="cistella-buida-foto placeholder">
            <Image
              src="/assets/foto-2.jpg"
              alt="Fotografia d'exemple de l'espai de treball de Nunu Flowers"
              fill
              sizes="(max-width: 640px) 80vw, 320px"
              style={{ objectFit: "cover" }}
            />
            <span className="badge-exemple">Foto d&apos;exemple</span>
          </div>
          <NavLink to="botiga" className="boto boto-principal">
            Anar a la botiga
          </NavLink>
        </div>
        <SiteFooter />
      </section>
    );
  }

  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>La teva cistella</h1>
          <p>Revisa les quantitats i afegeix-hi qualsevol indicació abans de finalitzar la comanda.</p>
        </div>

        <ul className="cistella-llista">
          {articles.map((article) => {
            const producte = getProducteById(article.productId);
            if (!producte) return null;
            return (
              <li className="cistella-article" key={article.productId}>
                <div className="cistella-article-foto placeholder">
                  <Image
                    src={producte.foto}
                    alt="Fotografia d'exemple de producte"
                    fill
                    sizes="96px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="cistella-article-info">
                  <p className="producte-nom">{producte.nom}</p>
                  <p className="producte-composicio">{producte.composicio}</p>
                  <div className="camp cistella-article-comentari">
                    <label htmlFor={`comentari-${article.productId}`}>
                      Comentari (opcional)
                    </label>
                    <input
                      type="text"
                      id={`comentari-${article.productId}`}
                      placeholder="Per exemple, sense targeta de regal"
                      maxLength={140}
                      value={article.comentari}
                      onChange={(event) =>
                        actualitzarComentari(article.productId, event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="cistella-article-quantitat">
                  <span className="cistella-etiqueta-mobil">Quantitat</span>
                  <QuantityStepper
                    id={`quantitat-${article.productId}`}
                    value={article.quantitat}
                    onChange={(quantitat) => actualitzarQuantitat(article.productId, quantitat)}
                  />
                </div>

                <div className="cistella-article-preu">
                  {(producte.preu * article.quantitat).toFixed(2)} €
                </div>

                <button
                  type="button"
                  className="cistella-eliminar"
                  aria-label={`Eliminar ${producte.nom} de la cistella`}
                  onClick={() => eliminar(article.productId)}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>

        <div className="cistella-resum">
          <div className="cistella-resum-linia">
            <span>{totalArticles === 1 ? "1 article" : `${totalArticles} articles`}</span>
            <span>{totalPreu.toFixed(2)} €</span>
          </div>
          <div className="cistella-resum-linia cistella-resum-total">
            <span>Total</span>
            <span>{totalPreu.toFixed(2)} €</span>
          </div>
          <p className="contacte-nota" style={{ margin: "0 0 1.25rem" }}>
            Enviament gratuït a partir de 45 €; per sota, 4,90 €. Es calcula
            en confirmar la comanda.
          </p>
          <button
            type="button"
            className="boto boto-principal"
            style={{ width: "100%" }}
            onClick={handleFinalitzar}
          >
            Finalitzar comanda
          </button>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
