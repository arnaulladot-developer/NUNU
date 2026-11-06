/**
 * Contingut d'exemple del prototip. Cap d'aquestes dades és real: preus,
 * composicions i fotografies són exemples facilitats o proposats mentre
 * la clienta confirma el catàleg definitiu (metode-de-disseny.md §7).
 * Substituir aquest fitxer és l'únic canvi necessari per posar-hi el
 * catàleg real — cap component en depèn de valors concrets.
 */

/**
 * Categories de la botiga. `seccio` diu a quin desplegable del menú
 * pertanyen; `etiqueta` és el text curt del menú (dins del desplegable el
 * context ja el dóna el nom de la secció) i `nom` és el títol de la pàgina.
 * `buit` completa la frase "Encara no tenim ___ a la botiga" quan la
 * categoria no té productes (no es pot derivar de `nom` posant-lo en
 * minúscules perquè "Nadal" duu majúscula).
 */
export const CATEGORIES = [
  { id: "frescos", seccio: "flors", etiqueta: "Rams frescos", nom: "Rams frescos", buit: "rams frescos" },
  { id: "secs", seccio: "flors", etiqueta: "Rams secs i preservats", nom: "Rams secs i preservats", buit: "rams secs i preservats" },
  { id: "centres", seccio: "flors", etiqueta: "Centres", nom: "Centres", buit: "centres" },
  { id: "nadal-rams", seccio: "nadal", etiqueta: "Rams", nom: "Rams de Nadal", buit: "rams de Nadal" },
  { id: "nadal-corones", seccio: "nadal", etiqueta: "Corones", nom: "Corones de Nadal", buit: "corones de Nadal" },
  { id: "nadal-centres", seccio: "nadal", etiqueta: "Centres", nom: "Centres de Nadal", buit: "centres de Nadal" },
] as const;

export type CategoriaId = (typeof CATEGORIES)[number]["id"];
export type SeccioBotiga = (typeof CATEGORIES)[number]["seccio"];

export const CATEGORIES_FLORS = CATEGORIES.filter(
  (categoria) => categoria.seccio === "flors",
);
export const CATEGORIES_NADAL = CATEGORIES.filter(
  (categoria) => categoria.seccio === "nadal",
);

export function getCategoria(id: string | null) {
  return CATEGORIES.find((categoria) => categoria.id === id);
}

export interface Producte {
  id: string;
  nom: string;
  categoria: CategoriaId;
  composicio: string;
  preu: number;
  foto: string;
}

export const PRODUCTES: Producte[] = [
  {
    id: "vesc",
    nom: "Vesc",
    categoria: "secs",
    composicio: "Lagurus ovatus, Limonium sinuatum",
    preu: 38,
    foto: "/assets/client/foto-02991.jpg",
  },
  {
    id: "bruma",
    nom: "Bruma",
    categoria: "secs",
    composicio: "Helichrysum, Nigella damascena",
    preu: 32,
    foto: "/assets/client/foto-03000.jpg",
  },
  {
    id: "ambre",
    nom: "Ambre",
    categoria: "secs",
    composicio: "Phalaris, Achillea millefolium",
    preu: 45,
    foto: "/assets/client/foto-02994.jpg",
  },
  {
    id: "terra",
    nom: "Terra",
    categoria: "secs",
    composicio: "Gypsophila paniculata, Craspedia",
    preu: 29,
    foto: "/assets/client/foto-03003.jpg",
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

/** Seccions del desplegable "Ocasions" del menú. */
export const OCASIONS = [
  { id: "casaments", nom: "Casaments" },
  { id: "esdeveniments", nom: "Esdeveniments" },
] as const;

export type OcasioId = (typeof OCASIONS)[number]["id"];

export function getOcasio(id: string | null) {
  return OCASIONS.find((ocasio) => ocasio.id === id);
}

export interface ProjecteResum {
  id: string;
  titol: string;
  ocasio: OcasioId;
  categoria: string;
  data: string;
  foto: string;
  /** `true` si la foto és de la clienta i correspon al projecte; `false` si és d'exemple. */
  fotoReal: boolean;
}

/**
 * Els dos esdeveniments tenen foto real de la Núria; els títols només
 * descriuen el que es veu a la foto i la data és pendent. El casament és
 * un exemple mentre no hi hagi fotos de casaments.
 */
export const PROJECTES: ProjecteResum[] = [
  {
    id: "can-ferrer",
    ocasio: "casaments",
    titol: "Casament a can Ferrer",
    categoria: "Casament",
    data: "maig 2026",
    foto: "/assets/client/foto-02997.jpg",
    fotoReal: false,
  },
  {
    id: "taula-clavells",
    ocasio: "esdeveniments",
    titol: "Centre de taula amb clavells i eucaliptus",
    categoria: "Esdeveniment",
    data: "data pendent",
    foto: "/assets/client/esdeveniments-1.jpg",
    fotoReal: true,
  },
  {
    id: "taula-gerros",
    ocasio: "esdeveniments",
    titol: "Gerros petits amb clavells a la taula",
    categoria: "Esdeveniment",
    data: "data pendent",
    foto: "/assets/client/esdeveniments-2.jpg",
    fotoReal: true,
  },
];

/**
 * Fires i mercats on serà Nunu Flowers. Està buit a propòsit: la Núria
 * facilitarà les fires reals i es van afegint aquí, una entrada per fira
 * (el més proper primer). Amb la llista buida, la pantalla Fires mostra
 * un missatge honest en comptes de fires inventades.
 */
export interface Fira {
  id: string;
  nom: string;
  lloc: string;
  /** Text lliure ("12 i 13 d'abril 2027"): evita fer-se un lio amb zones horàries. */
  dates: string;
  foto?: string;
  descripcio?: string;
}

export const FIRES: Fira[] = [];

/**
 * Dades de contacte reals de la Núria. El telèfon el va facilitar ella
 * (5/11/2026). El correu i l'Instagram són els d'abans i estan PENDENTS
 * DE CONFIRMAR: el correu era inventat a la maqueta (design-system.md
 * §7.12) i cal saber quin domini propi tindrà de veritat.
 */
export const CONTACTE = {
  telefon: "+34 652 02 01 99",
  telefonHref: "tel:+34652020199",
  whatsappHref: "https://wa.me/34652020199",
  correu: "hola@nunuflowers.com",
  instagram: "@nunu__flowers",
  instagramHref: "https://instagram.com/nunu__flowers",
} as const;
