import type { Metadata } from "next";
import {
  CONTACTE,
  FIRES,
  PRODUCTES,
  getCategoria,
  preuDesDe,
  type CategoriaId,
  type OcasioId,
  type Producte,
} from "@/lib/data";
import { rutaCategoria, rutaOcasio, rutaProducte } from "@/lib/routes";
import { IMATGE_PER_DEFECTE, NOM_LLOC, SITE_URL, urlAbsoluta } from "@/lib/site";

interface DadesPagina {
  /** Títol de la pàgina sense el nom del lloc; el layout hi afegeix el sufix. */
  titol: string;
  descripcio: string;
  ruta: string;
  imatge?: string;
  /** `false` força `noindex` encara que el lloc ja estigui publicat. */
  indexable?: boolean;
}

/**
 * Metadades d'una pàgina: títol, descripció, canònica, Open Graph i Twitter.
 * Open Graph i Twitter es tornen a donar sencers perquè en una pàgina
 * substitueixen els del layout en lloc de fusionar-s'hi.
 */
export function metadataPagina({
  titol,
  descripcio,
  ruta,
  imatge = IMATGE_PER_DEFECTE,
  indexable = true,
}: DadesPagina): Metadata {
  const titolComplet = `${titol} | ${NOM_LLOC}`;
  return {
    title: titol,
    description: descripcio,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      siteName: NOM_LLOC,
      locale: "ca_ES",
      title: titolComplet,
      description: descripcio,
      url: ruta,
      images: [{ url: imatge }],
    },
    twitter: {
      card: "summary_large_image",
      title: titolComplet,
      description: descripcio,
      images: [imatge],
    },
    ...(indexable ? {} : { robots: { index: false, follow: false } }),
  };
}

const ENVIAMENT = "Enviament a tota la península en 24-48 h laborables.";

export function productesDeCategoria(id: CategoriaId): Producte[] {
  return PRODUCTES.filter((producte) => producte.categoria === id);
}

export function metadataFlors(): Metadata {
  return metadataPagina({
    titol: "Flors fetes a mà al Penedès",
    descripcio: `Rams de flor seca, preservada i fresca compostos a mà per Nunu Flowers. ${ENVIAMENT}`,
    ruta: "/flors",
  });
}

/** Una categoria sense productes és una pàgina buida: no s'ha d'indexar. */
export function metadataCategoria(id: CategoriaId): Metadata {
  const categoria = getCategoria(id);
  if (!categoria) return {};
  return metadataPagina({
    titol: categoria.nom,
    descripcio: `${categoria.nom}: composicions artesanals de Nunu Flowers, fetes a mà al Penedès. ${ENVIAMENT}`,
    ruta: rutaCategoria(id),
    imatge: productesDeCategoria(id)[0]?.fotos[0]?.src,
    indexable: productesDeCategoria(id).length > 0,
  });
}

export function metadataProducte(producte: Producte): Metadata {
  const desDe = preuDesDe(producte);
  const mesDUnaMida = producte.mides.length > 1;
  return metadataPagina({
    titol: producte.nom,
    descripcio: `${producte.resum} ${mesDUnaMida ? "Des de" : "Preu:"} ${desDe} € · Fet a mà per Nunu Flowers.`,
    ruta: rutaProducte(producte.id),
    imatge: producte.fotos[0]?.src,
  });
}

const DESCRIPCIO_OCASIO: Record<OcasioId, string> = {
  casaments:
    "Decoració floral artesanal per a casaments, del ram de núvia a l'atmosfera del banquet. Explica'ns la teva idea.",
  esdeveniments:
    "Arranjaments florals a mida per a aniversaris, festes privades, dinars i sopars especials. Explica'ns el teu esdeveniment.",
};

export function metadataOcasio(id: OcasioId, nom: string): Metadata {
  return metadataPagina({
    titol: nom,
    descripcio: DESCRIPCIO_OCASIO[id],
    ruta: rutaOcasio(id),
  });
}

export function metadataOcasions(): Metadata {
  return metadataPagina({
    titol: "Casaments i esdeveniments",
    descripcio:
      "Decoració floral artesanal a mida per a casaments, aniversaris, festes privades i dinars i sopars especials.",
    ruta: "/ocasions",
  });
}

export function metadataFires(): Metadata {
  const noms = FIRES.map((fira) => fira.nom).join(", ");
  return metadataPagina({
    titol: "Fires i mercats",
    descripcio: FIRES.length
      ? `Vine a veure les creacions de Nunu Flowers en directe: ${noms}.`
      : "Les properes fires i mercats on trobar Nunu Flowers.",
    ruta: "/fires",
  });
}

export function metadataContacte(): Metadata {
  return metadataPagina({
    titol: "Contacte",
    descripcio:
      "Escriu a la Núria per WhatsApp o amb el formulari per fer un encàrrec a mida o resoldre qualsevol dubte.",
    ruta: "/contacte",
  });
}

/** Pantalles d'utilitat (seguiment, panell intern): mai s'han d'indexar. */
export function metadataPrivada(titol: string, ruta: string): Metadata {
  return metadataPagina({
    titol,
    descripcio: "Pàgina d'ús intern de Nunu Flowers.",
    ruta,
    indexable: false,
  });
}

type Json = Record<string, unknown>;

export function jsonLdOrganitzacio(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NOM_LLOC,
    url: SITE_URL,
    logo: urlAbsoluta("/assets/logo.jpg"),
    telephone: CONTACTE.telefon.replace(/\s/g, ""),
  };
}

/**
 * Dades estructurades d'un producte. No s'hi declara `availability`: els
 * productes són fets per encàrrec i l'estoc es decideix al navegador
 * (context/botiga.tsx), de manera que cap valor seria cert al servidor.
 */
export function jsonLdProducte(producte: Producte): Json {
  const preus = producte.mides.map((mida) => mida.preu);
  const url = urlAbsoluta(rutaProducte(producte.id));
  const oferta: Json =
    preus.length > 1
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: Math.min(...preus),
          highPrice: Math.max(...preus),
          offerCount: preus.length,
          url,
        }
      : { "@type": "Offer", priceCurrency: "EUR", price: preus[0], url };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producte.nom,
    description: producte.descripcio.join(" "),
    ...(producte.fotos.length > 0
      ? { image: producte.fotos.map((foto) => urlAbsoluta(foto.src)) }
      : {}),
    brand: { "@type": "Brand", name: NOM_LLOC },
    category: getCategoria(producte.categoria)?.nom,
    url,
    offers: oferta,
  };
}

export function jsonLdMiga(elements: { nom: string; ruta: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((element, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: element.nom,
      item: urlAbsoluta(element.ruta),
    })),
  };
}
