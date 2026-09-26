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

/**
 * Estats pels quals passa una comanda. Són exactament els quatre que ja
 * mostra la línia de temps pública de Seguiment, més la cancel·lació, que
 * no hi apareix perquè no és un pas del camí sinó una sortida.
 */
export const ESTATS_COMANDA = [
  "Comprat",
  "Tramitat",
  "Enviat",
  "Arribat",
  "Cancel·lada",
] as const;

export type EstatComanda = (typeof ESTATS_COMANDA)[number];

export interface Comanda {
  id: string;
  data: string;
  client: string;
  correu: string;
  telefon: string;
  adreca: string;
  productId: string;
  quantitat: number;
  total: number;
  estat: EstatComanda;
  comentari: string;
}

/**
 * Comandes de mostra per al panell de la propietària. Com la resta de
 * `lib/data.ts`, són inventades: noms, adreces i telèfons no corresponen a
 * cap persona real. Quan hi hagi backend (ADR-004), aquesta llista se
 * substitueix per la consulta a la base de dades i prou.
 */
export const COMANDES_EXEMPLE: Comanda[] = [
  {
    id: "NF-7QXT2M9K",
    data: "17 de setembre de 2026",
    client: "Marta Ribas",
    correu: "marta.ribas@exemple.cat",
    telefon: "+34 600 11 22 33",
    adreca: "Carrer de la Font 14, 08720 Vilafranca del Penedès",
    productId: "vesc",
    quantitat: 1,
    total: 38,
    estat: "Enviat",
    comentari: "Sense targeta de regal.",
  },
  {
    id: "NF-3BD8K1LP",
    data: "18 de setembre de 2026",
    client: "Jordi Sala",
    correu: "jordi.sala@exemple.cat",
    telefon: "+34 600 44 55 66",
    adreca: "Avinguda Catalunya 3, 3r 2a, 08800 Vilanova i la Geltrú",
    productId: "ambre",
    quantitat: 2,
    total: 90,
    estat: "Tramitat",
    comentari: "És per a un aniversari, va per al dia 24.",
  },
  {
    id: "NF-9WM4T6RS",
    data: "19 de setembre de 2026",
    client: "Laia Puig",
    correu: "laia.puig@exemple.cat",
    telefon: "+34 600 77 88 99",
    adreca: "Passeig del Mar 52, 08870 Sitges",
    productId: "bruma",
    quantitat: 1,
    total: 32,
    estat: "Comprat",
    comentari: "",
  },
  {
    id: "NF-5CJ2N7VE",
    data: "20 de setembre de 2026",
    client: "Pau Esteve",
    correu: "pau.esteve@exemple.cat",
    telefon: "+34 600 12 34 56",
    adreca: "Carrer Major 88, 08770 Sant Sadurní d'Anoia",
    productId: "terra",
    quantitat: 3,
    total: 87,
    estat: "Comprat",
    comentari: "Si pot ser, embolicat per separat.",
  },
];

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
