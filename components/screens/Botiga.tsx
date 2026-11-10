"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";
import { ProductCard } from "@/components/ProductCard";
import { useNavigation } from "@/context/navigation";
import { PRODUCTES, getCategoria } from "@/lib/data";

export function Botiga() {
  const { filtre } = useNavigation();
  const categoria = getCategoria(filtre);
  // Sense filtre, la pàgina "Flors" mostra les flors; Nadal té el seu menú.
  const productes = PRODUCTES.filter((producte) =>
    categoria
      ? producte.categoria === categoria.id
      : getCategoria(producte.categoria)?.seccio === "flors",
  );

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
          </div>
        )}
      </div>
      <SiteFooter />
    </section>
  );
}
