"use client";

import { NavLink } from "@/components/NavLink";
import { ProductImage } from "@/components/ProductImage";
import { useBotiga } from "@/context/botiga";
import { preuDesDe, type Producte } from "@/lib/data";

interface ProductCardProps {
  producte: Producte;
}

/**
 * Targeta de producte de la Botiga: tota la targeta porta a la fitxa del
 * producte, on es tria la mida i s'afegeix a la cistella. No hi ha botó
 * d'afegir directe perquè cada producte té preu segons la mida.
 */
export function ProductCard({ producte }: ProductCardProps) {
  const { esExhaurit } = useBotiga();
  const exhaurit = esExhaurit(producte.id);
  const mesDUnaMida = producte.mides.length > 1;

  return (
    <div className={`producte-targeta${exhaurit ? " producte-targeta--exhaurit" : ""}`}>
      <NavLink to="fitxa" filtre={producte.id} className="producte-targeta-link">
        <div className="placeholder">
          <ProductImage
            producte={producte}
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
          {exhaurit && <span className="badge-exhaurit">Exhaurit</span>}
        </div>
        <p className="producte-nom">{producte.nom}</p>
        <p className="producte-composicio">{producte.resum}</p>
        <div className="producte-preu">
          {mesDUnaMida ? "Des de " : ""}
          {preuDesDe(producte)} €
        </div>
      </NavLink>
      <NavLink
        to="fitxa"
        filtre={producte.id}
        className="boto boto-principal producte-afegir"
      >
        {mesDUnaMida ? "Triar mida" : "Veure el producte"}
      </NavLink>
    </div>
  );
}
