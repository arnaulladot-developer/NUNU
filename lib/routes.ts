import {
  CATEGORIES,
  OCASIONS,
  getCategoria,
  getOcasio,
  getProducteById,
  type CategoriaId,
  type SeccioBotiga,
} from "@/lib/data";
import type { ScreenId } from "@/lib/types";

/**
 * Única font de veritat de les URLs del lloc. Els components continuen
 * parlant en "pantalla + filtre" (`NavLink`, `useNavigation`); aquest mòdul
 * tradueix aquest parell a una ruta real i a l'inrevés. Afegir una pantalla
 * nova vol dir tocar només aquest fitxer i crear-ne la `page.tsx`.
 */

export interface Destinacio {
  screen: ScreenId;
  filtre: string | null;
}

export function rutaCategoria(id: string | null | undefined): string {
  const categoria = getCategoria(id ?? null);
  return categoria ? `/${categoria.seccio}/${categoria.slug}` : "/flors";
}

export function rutaProducte(id: string): string {
  return `/producte/${id}`;
}

export function rutaOcasio(id?: string | null): string {
  const ocasio = getOcasio(id ?? null);
  return ocasio ? `/ocasions/${ocasio.id}` : "/ocasions";
}

/** Ruta real d'una pantalla; un filtre desconegut cau a la pantalla sencera. */
export function rutaPer(screen: ScreenId, filtre?: string | null): string {
  switch (screen) {
    case "inici":
      return "/";
    case "botiga":
      return rutaCategoria(filtre);
    case "fitxa":
      return getProducteById(filtre ?? null) ? rutaProducte(filtre as string) : "/flors";
    case "projectes":
      return rutaOcasio(filtre);
    case "fires":
      return "/fires";
    case "contacte":
      return "/contacte";
    case "seguiment":
      return "/seguiment";
    case "admin":
      return "/admin";
  }
}

/** Busca una categoria a partir dels dos trams de la URL (`/flors/secs`). */
export function trobaCategoriaPerRuta(seccio: SeccioBotiga, slug: string) {
  return CATEGORIES.find(
    (categoria) => categoria.seccio === seccio && categoria.slug === slug,
  );
}

export function categoriaPerRuta(
  seccio: SeccioBotiga,
  slug: string,
): CategoriaId | null {
  return trobaCategoriaPerRuta(seccio, slug)?.id ?? null;
}

/** Pantalla i filtre que corresponen a una ruta; qualsevol altra cosa és Inici. */
export function parseRuta(pathname: string): Destinacio {
  const [primer, segon] = pathname.split("/").filter(Boolean);

  switch (primer) {
    case "flors":
    case "nadal": {
      const id = segon ? categoriaPerRuta(primer, segon) : null;
      return { screen: "botiga", filtre: id };
    }
    case "producte":
      return {
        screen: "fitxa",
        filtre: getProducteById(segon ?? null) ? (segon as string) : null,
      };
    case "ocasions": {
      const ocasio = OCASIONS.find((o) => o.id === segon);
      return { screen: "projectes", filtre: ocasio?.id ?? null };
    }
    case "fires":
      return { screen: "fires", filtre: null };
    case "contacte":
      return { screen: "contacte", filtre: null };
    case "seguiment":
      return { screen: "seguiment", filtre: null };
    case "admin":
      return { screen: "admin", filtre: null };
    default:
      return { screen: "inici", filtre: null };
  }
}
