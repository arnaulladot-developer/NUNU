/**
 * Contingut d'exemple del prototip. Cap d'aquestes dades és real: preus,
 * composicions i fotografies són exemples facilitats o proposats mentre
 * la clienta confirma el catàleg definitiu (metode-de-disseny.md §7).
 * Substituir aquest fitxer és l'únic canvi necessari per posar-hi el
 * catàleg real — cap component en depèn de valors concrets.
 */

export interface Producte {
  id: string;
  nom: string;
  composicio: string;
  preu: number;
  foto: string;
}

export const PRODUCTES: Producte[] = [
  {
    id: "vesc",
    nom: "Vesc",
    composicio: "Lagurus ovatus, Limonium sinuatum",
    preu: 38,
    foto: "/assets/foto-1.jpg",
  },
  {
    id: "bruma",
    nom: "Bruma",
    composicio: "Helichrysum, Nigella damascena",
    preu: 32,
    foto: "/assets/foto-3.jpg",
  },
  {
    id: "ambre",
    nom: "Ambre",
    composicio: "Phalaris, Achillea millefolium",
    preu: 45,
    foto: "/assets/foto-4.jpg",
  },
  {
    id: "terra",
    nom: "Terra",
    composicio: "Gypsophila paniculata, Craspedia",
    preu: 29,
    foto: "/assets/foto-5.jpg",
  },
];

/** Cerca un producte pel seu identificador; `undefined` si no existeix. */
export function getProducteById(id: string): Producte | undefined {
  return PRODUCTES.find((producte) => producte.id === id);
}

export interface ProjecteResum {
  id: string;
  titol: string;
  categoria: string;
  data: string;
  foto: string;
}

export const PROJECTES: ProjecteResum[] = [
  {
    id: "can-ferrer",
    titol: "Casament a can Ferrer",
    categoria: "Casament",
    data: "maig 2026",
    foto: "/assets/foto-4.jpg",
  },
  {
    id: "sopar-compromis",
    titol: "Decoració per a un sopar de compromís",
    categoria: "Decoració d'espai",
    data: "abril 2026",
    foto: "/assets/foto-2.jpg",
  },
  {
    id: "aparador-tardor",
    titol: "Aparador de tardor",
    categoria: "Aparador comercial",
    data: "octubre 2025",
    foto: "/assets/foto-1.jpg",
  },
  {
    id: "sopar-nadal",
    titol: "Sopar de Nadal d'empresa",
    categoria: "Esdeveniment d'empresa",
    data: "desembre 2025",
    foto: "/assets/foto-5.jpg",
  },
];
