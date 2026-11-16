/**
 * Configuració del lloc que depèn de l'entorn.
 *
 * `SITE_URL` és l'adreça pública sense barra final. Mentre no hi hagi domini
 * propi (brief.md §5), cau a l'adreça de Vercel.
 *
 * `INDEXABLE` és l'interruptor de la publicació: amb qualsevol valor que no
 * sigui exactament "true", el lloc diu als cercadors que no l'indexin
 * (meta robots + robots.txt). Es posa a "true" a Vercel el dia del llançament,
 * un cop hi ha domini, contingut complet i textos legals; no cal tocar codi.
 */
export const SITE_URL = (
  process.env.SITE_URL ?? "https://nunu-flowers-web.vercel.app"
).replace(/\/+$/, "");

export const INDEXABLE = process.env.INDEXABLE === "true";

export const NOM_LLOC = "Nunu Flowers";

/** Imatge que es mostra en compartir una pàgina que no en té de pròpia. */
export const IMATGE_PER_DEFECTE = "/assets/catalog/inici.jpg";

export function urlAbsoluta(ruta: string): string {
  return `${SITE_URL}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;
}
