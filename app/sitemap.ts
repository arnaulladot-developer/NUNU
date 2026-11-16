import type { MetadataRoute } from "next";
import { CATEGORIES, OCASIONS, PRODUCTES } from "@/lib/data";
import { rutaCategoria, rutaOcasio, rutaProducte } from "@/lib/routes";
import { productesDeCategoria } from "@/lib/seo";
import { urlAbsoluta } from "@/lib/site";

/**
 * Totes les pàgines indexables. Les categories sense productes queden fora
 * (la seva pàgina és noindex); seguiment i panell intern no hi són mai.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const rutes = [
    "/",
    "/flors",
    ...CATEGORIES.filter((c) => productesDeCategoria(c.id).length > 0).map((c) =>
      rutaCategoria(c.id),
    ),
    ...PRODUCTES.map((p) => rutaProducte(p.id)),
    "/ocasions",
    ...OCASIONS.map((o) => rutaOcasio(o.id)),
    "/fires",
    "/contacte",
  ];

  return rutes.map((ruta) => ({ url: urlAbsoluta(ruta) }));
}
