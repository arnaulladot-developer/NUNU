"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { ArrowLabel } from "@/components/ArrowLabel";
import { ProductCard } from "@/components/ProductCard";
import { useNavigation } from "@/context/navigation";
import { PRODUCTES, getCategoria } from "@/lib/data";

export function Botiga() {
  const { filtre } = useNavigation();
  const categoria = getCategoria(filtre);
  const productes = categoria
    ? PRODUCTES.filter((producte) => producte.categoria === categoria.id)
    : PRODUCTES;

  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="pagina-cap">
          <h1>{categoria ? categoria.nom : "Flors"}</h1>
          <p>
            Enviem a tota la península en 24-48h laborables; Balears i
            Canàries, 3-5 dies.
          </p>
        </div>

        {productes.length === 0 ? (
          <div className="estat-buit">
            <h2>Encara no tenim {categoria?.buit} a la botiga</h2>
            <p>
              Estem preparant aquesta secció. Si en vols un per a una data
              concreta, escriu-nos i ho mirem.
            </p>
            <NavLink to="contacte" className="boto boto-principal">
              Escriure a la Núria
            </NavLink>
          </div>
        ) : (
          <div className="productes-graella">
            {productes.map((producte) => (
              <ProductCard key={producte.id} producte={producte} />
            ))}
            {!categoria && (
              <NavLink
                to="botiga"
                className="producte-targeta producte-targeta-cta"
              >
                <p>
                  Fins a vint rams en total
                  <br />
                  (nombre real segons el catàleg del client)
                </p>
                <ArrowLabel>Veure&apos;ls tots</ArrowLabel>
              </NavLink>
            )}
          </div>
        )}

        {productes.length > 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--pedra)",
              fontSize: ".85rem",
              padding: "1.5rem 0",
            }}
          >
            Fotografies d&apos;exemple, pendents de confirmar quina va a cada
            producte.
          </p>
        )}
      </div>
      <SiteFooter />
    </section>
  );
}
