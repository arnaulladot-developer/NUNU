"use client";

import { useState } from "react";
import Image from "next/image";
import { NavLink } from "@/components/NavLink";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { useCart } from "@/context/cart";
import type { ScreenId } from "@/lib/types";

const ENLLAÇOS: { to: ScreenId; etiqueta: string }[] = [
  { to: "botiga", etiqueta: "Botiga" },
  { to: "projectes", etiqueta: "Projectes" },
  { to: "contacte", etiqueta: "Contacte" },
  { to: "seguiment", etiqueta: "Seguiment" },
];

const LLINDAR_REVEAL = 40;

interface SiteHeaderProps {
  /** Nomes a Inici: comença invisible sobre la foto a pantalla completa
   * i apareix en baixar "una mica" (design-system.md §5.7). */
  revealOnScroll?: boolean;
}

export function SiteHeader({ revealOnScroll = false }: SiteHeaderProps) {
  const [menuObert, setMenuObert] = useState(false);
  const haBaixat = useScrollThreshold(LLINDAR_REVEAL);
  const navVisible = revealOnScroll ? haBaixat : true;
  const { totalArticles } = useCart();

  const classes = [
    "site-header",
    revealOnScroll && "header--reveal",
    navVisible && "nav-visible",
    menuObert && "menu-obert",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <NavLink to="inici" className="marca-nom">
        <Image
          src="/assets/logo.jpg"
          alt="Nunu Flowers"
          width={72}
          height={72}
        />
      </NavLink>
      <nav>
        {ENLLAÇOS.map((enllaç) => (
          <NavLink
            key={enllaç.to}
            to={enllaç.to}
            onNavigate={() => setMenuObert(false)}
          >
            {enllaç.etiqueta}
          </NavLink>
        ))}
        <NavLink
          to="cistella"
          className="site-header-cistella"
          onNavigate={() => setMenuObert(false)}
          aria-label={
            totalArticles > 0
              ? `Cistella, ${totalArticles} ${totalArticles === 1 ? "article" : "articles"}`
              : "Cistella"
          }
        >
          <span aria-hidden="true">Cistella</span>
          {totalArticles > 0 && (
            <span className="cistella-comptador" aria-hidden="true">
              {totalArticles}
            </span>
          )}
        </NavLink>
      </nav>
      <button
        type="button"
        className="menu-mobil"
        aria-expanded={menuObert}
        aria-label="Obrir el menú"
        onClick={() => setMenuObert((obert) => !obert)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
