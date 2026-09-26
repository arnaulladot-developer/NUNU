"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavLink } from "@/components/NavLink";
import { useCart } from "@/context/cart";
import { useBotiga } from "@/context/botiga";
import type { Producte } from "@/lib/data";

const DURADA_CONFIRMACIO_MS = 1600;

interface ProductCardProps {
  producte: Producte;
}

/**
 * Targeta de producte de la Botiga: la imatge, el nom i el preu porten a la
 * fitxa (mateix comportament d'abans); "Afegir a la cistella" és un botó
 * independent perquè no es pot clavar un element interactiu dins d'un
 * enllaç (`<button>` dins de `<a>` no és HTML vàlid ni accessible).
 */
export function ProductCard({ producte }: ProductCardProps) {
  const { afegir } = useCart();
  const { esExhaurit } = useBotiga();
  const exhaurit = esExhaurit(producte.id);
  const [confirmat, setConfirmat] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleAfegir() {
    if (exhaurit) return;
    afegir(producte.id, 1);
    setConfirmat(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setConfirmat(false), DURADA_CONFIRMACIO_MS);
  }

  return (
    <div className={`producte-targeta${exhaurit ? " producte-targeta--exhaurit" : ""}`}>
      <NavLink to="fitxa" className="producte-targeta-link">
        <div className="placeholder">
          <Image
            src={producte.foto}
            alt="Fotografia d'exemple de producte"
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <span className="badge-exemple">Foto d&apos;exemple</span>
          {exhaurit && <span className="badge-exhaurit">Exhaurit</span>}
        </div>
        <p className="producte-nom">{producte.nom}</p>
        <p className="producte-composicio">{producte.composicio}</p>
        <div className="producte-preu">{producte.preu} €</div>
      </NavLink>
      <button
        type="button"
        className="boto boto-principal producte-afegir"
        onClick={handleAfegir}
        disabled={exhaurit}
      >
        {exhaurit ? "Exhaurit" : confirmat ? "Afegit ✓" : "Afegir a la cistella"}
      </button>
    </div>
  );
}
