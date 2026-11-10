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

/** Una mida d'un producte: cada mida té el seu propi preu. */
export interface Mida {
  id: string;
  /** Lletra o nom curt que veu el client: "S", "M", "L" o "Única". */
  etiqueta: string;
  detall: string;
  preu: number;
}

export interface FotoProducte {
  src: string;
  alt: string;
}

export interface Producte {
  id: string;
  nom: string;
  categoria: CategoriaId;
  /** Una línia per a la targeta de la botiga. */
  resum: string;
  descripcio: string[];
  caracteristiques: string[];
  mides: [Mida, ...Mida[]];
  /** Aclariment que va sota el selector de mida (p. ex. la llargada). */
  notaMides?: string;
  /** Buit mentre la Núria no n'hagi facilitat cap: la botiga ensenya "Foto pendent". */
  fotos: FotoProducte[];
}

const MIDES_RAM: [Mida, ...Mida[]] = [
  { id: "S", etiqueta: "S", detall: "Petit · 15 cm de diàmetre", preu: 15 },
  { id: "M", etiqueta: "M", detall: "Mitjà · 20 cm de diàmetre", preu: 20 },
  { id: "L", etiqueta: "L", detall: "Gran · 25 cm de diàmetre", preu: 25 },
];

const LLARGADA_RAM = "Llargada aproximada: 30–40 cm.";

const VARIACIONS_RAM =
  "Elaborat artesanalment, cada ram és únic i pot presentar petites variacions respecte a la fotografia.";

/**
 * Catàleg real, tal com el va escriure la Núria al document de textos
 * (10/11/2026). Els preus i les mides són els del document. Falten
 * productes: la Núria acabarà de preparar-los quan li arribi el material
 * (1-2 setmanes) i vol publicar a principis de desembre.
 */
export const PRODUCTES: Producte[] = [
  {
    id: "ram-terra",
    nom: "Ram Terra",
    categoria: "secs",
    resum: "Flors seques en tons ocres, mostassa, taronges i bordeus.",
    descripcio: [
      "Un ram ple de calidesa, personalitat i bellesa natural.",
      "Una combinació de flors seques i elements naturals en tons ocres, mostassa, taronges i bordeus, que creen una composició rica en textures, colors i contrastos.",
      "És una composició alegre i original, perfecta per decorar qualsevol espai o per fer un regal especial. Tot i que els seus colors ens poden recordar la tardor, és un ram per gaudir durant tot l'any.",
      "Cada ram està elaborat artesanalment i és únic, per això pot presentar petites variacions respecte a la fotografia.",
    ],
    caracteristiques: [
      "Flors seques i elements naturals.",
      "Tons càlids i terrosos.",
      "Elaboració artesanal.",
      "No necessita aigua ni manteniment habitual.",
      "Cada composició pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/terra-1.jpg", alt: "Ram Terra: flors seques en tons ocres, taronges i bordeus, embolicat en paper kraft" },
      { src: "/assets/catalog/terra-2.jpg", alt: "Ram Terra vist de prop, amb flors grogues, taronges i bordeus" },
    ],
  },
  {
    id: "ram-gerd",
    nom: "Ram Gerd",
    categoria: "secs",
    resum: "Flors seques en rosa, fúcsia, bordeus i crema.",
    descripcio: [
      "Un ram de flors seques que combina diferents tonalitats de rosa, fúcsia, bordeus i crema, amb petits tocs verds i grocs.",
      "Una composició amb molta textura i varietat de flors, que li dona un aspecte natural i silvestre. És ideal per decorar qualsevol espai o per regalar en una ocasió especial.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició de flors seques i elements naturals.",
      "Tons rosats, bordeus, crema i verds.",
      "Elaboració artesanal.",
      "No necessita aigua.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/gerd-1.jpg", alt: "Ram Gerd: flors seques rosa, fúcsia i bordeus sobre paper estampat de flors" },
      { src: "/assets/catalog/gerd-2.jpg", alt: "Ram Gerd vist des de dalt, amb cues de conill rosa i flors fúcsia" },
    ],
  },
  {
    id: "ram-neu",
    nom: "Ram Neu",
    categoria: "secs",
    resum: "Flors seques en tonalitats blanques, crema i naturals.",
    descripcio: [
      "Un ram de flors seques en tonalitats blanques, crema i naturals, amb diferents tipus de flors que combinen formes i textures.",
      "És un ram delicat i senzill, ideal per decorar qualsevol espai, donar un toc especial a casa o fer un regal bonic. Els seus tons neutres fan que sigui fàcil de combinar amb qualsevol estil de decoració i perfecte per regalar en qualsevol època de l'any.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició de flors seques i elements naturals.",
      "Tonalitats blanques, crema i naturals.",
      "Elaboració artesanal.",
      "No necessita aigua.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/neu-1.jpg", alt: "Ram Neu: flors seques blanques i crema embolicades en paper amb dibuixos de flors" },
    ],
  },
  {
    id: "ram-mediterrani",
    nom: "Ram Mediterrani",
    categoria: "secs",
    resum: "Flors seques i espigues de blat en blanc i verd.",
    descripcio: [
      "Un ram de flors seques amb un estil natural i mediterrani, que combina espigues de blat amb diferents flors en tonalitats blanques i verdes.",
      "Una composició de colors suaus i elements naturals que li donen un toc rústic i elegant. És ideal per decorar qualsevol espai, donar calidesa a casa o fer un regal especial.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició de flors seques i espigues de blat.",
      "Tonalitats blanques, verdes i naturals.",
      "Elaboració artesanal.",
      "No necessita aigua.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/mediterrani-1.jpg", alt: "Ram Mediterrani: espigues de blat i flors blanques i verdes" },
      { src: "/assets/catalog/mediterrani-2.jpg", alt: "Ram Mediterrani vist de prop, amb margarides blanques i espigues" },
    ],
  },
  {
    id: "ram-floresta",
    nom: "Ram Floresta",
    categoria: "secs",
    resum: "Flors seques en tonalitats liles, verdes i blanques.",
    descripcio: [
      "Un ram de flors seques amb un estil campestre i silvestre, que combina diferents flors en tonalitats liles, verdes i blanques.",
      "Una composició amb molta varietat de flors i textures, que recorda els camps florits i li dona un toc natural i delicat. És ideal per decorar qualsevol espai o per fer un regal especial.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició de flors seques i elements naturals.",
      "Tonalitats liles, verdes i blanques.",
      "Elaboració artesanal.",
      "No necessita aigua.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/floresta-1.jpg", alt: "Ram Floresta: hortènsia lila amb flors seques verdes i blanques" },
      { src: "/assets/catalog/floresta-2.jpg", alt: "Ram Floresta vist des de dalt, amb flors lila, taronges i verdes" },
    ],
  },
  {
    id: "ram-lluna",
    nom: "Ram Lluna",
    categoria: "secs",
    resum: "Ram de flors seques protagonitzat pel lunàrium.",
    descripcio: [
      "Un ram de flors seques protagonitzat pel lunàrium, una flor molt especial per la forma dels seus petits discs i el seu color tan característic.",
      "És una composició delicada i original, ideal per decorar qualsevol racó de casa o per fer un regal diferent. La seva forma i textura li donen molta personalitat i el converteixen en un ram que no passa desapercebut.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició amb lunàrium.",
      "Flors seques i elements naturals.",
      "Elaboració artesanal.",
      "No necessita aigua.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/lluna-1.jpg", alt: "Ram Lluna: lunàrium sec amb els seus discs translúcids" },
      { src: "/assets/catalog/lluna-2.jpg", alt: "Detall dels discs de lunàrium del Ram Lluna" },
    ],
  },
  {
    id: "ram-rustic",
    nom: "Ram rústic",
    categoria: "frescos",
    resum: "Ram fresc de limonium lila i blanc amb eucaliptus.",
    descripcio: [
      "Un ram fresc de limonium en tonalitats liles i blanques, acompanyat d'eucaliptus, que combina senzillesa i naturalitat.",
      "És un ram ideal per regalar o decorar qualsevol espai. A més, té l'avantatge que es pot deixar assecar i conservar durant molt de temps, mantenint la seva bellesa i donant-li una segona vida com a ram sec.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Ram de flor fresca.",
      "Limonium lila i blanc amb eucaliptus.",
      "Elaboració artesanal.",
      "Ideal per deixar assecar i conservar com a ram sec.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/rustic-1.jpg", alt: "Ram rústic: limonium lila i blanc amb eucaliptus" },
      { src: "/assets/catalog/rustic-2.jpg", alt: "Ram rústic amb eucaliptus i limonium en un dia de sol" },
      { src: "/assets/catalog/rustic-3.jpg", alt: "Detall del limonium lila i blanc del ram rústic" },
    ],
  },
  {
    id: "ram-coto",
    nom: "Ram Cotó",
    categoria: "nadal-rams",
    resum: "Taronges, flors de cotó i grèvol per a Nadal.",
    descripcio: [
      "Un ram especial per a l'època de Nadal, que combina taronges amb flors de cotó i grèvol, creant una composició molt natural i plena d'encant.",
      "És ideal per decorar la casa durant les festes, donar un toc nadalenc a qualsevol espai o fer un regal especial. Una combinació de colors i elements naturals que transmet tota la calidesa d'aquestes dates.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició amb taronges, flors de cotó i grèvol.",
      "Elements naturals i de temporada.",
      "Elaboració artesanal.",
      "Ideal per decorar durant les festes de Nadal.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat dels elements.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/coto-1.jpg", alt: "Ram Cotó: taronja deshidratada, flors de cotó, grèvol i pinyes" },
      { src: "/assets/catalog/coto-2.jpg", alt: "Ram Cotó embolicat en paper kraft amb flors de cotó i grèvol" },
    ],
  },
  {
    id: "ram-bosc",
    nom: "Ram Bosc",
    categoria: "nadal-rams",
    resum: "Flors seques i elements naturals amb pinyes.",
    descripcio: [
      "Un ram de flors seques i elements naturals amb pinyes, inspirat en els paisatges del bosc.",
      "Una composició amb un estil rústic i natural, ideal per decorar qualsevol racó de casa o per donar un toc càlid i acollidor a un espai. Les pinyes li aporten un encant especial i el converteixen en una bona opció per a qui busca una decoració diferent i amb elements de la natura.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició amb pinyes i elements naturals.",
      "Estil rústic i silvestre.",
      "Elaboració artesanal.",
      "No necessita aigua si està compost de flor seca.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat dels elements.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/bosc-1.jpg", alt: "Ram Bosc: pinyes, grèvol i flors de cotó amb llaç de quadres" },
      { src: "/assets/catalog/bosc-2.jpg", alt: "Ram Bosc embolicat en paper kraft amb llaç de quadres vermells" },
      { src: "/assets/catalog/bosc-3.jpg", alt: "Ram Bosc amb pinyes, grèvol i flors de cotó" },
    ],
  },
  {
    id: "ram-caliu",
    nom: "Ram Caliu",
    categoria: "nadal-rams",
    resum: "Hortènsies vermelles i taronges amb elements naturals.",
    descripcio: [
      "Un ram de flors que combina hortènsies vermelles i taronges amb elements naturals, creant una composició molt especial i plena de color.",
      "És un ram amb un aire nadalenc, ideal per decorar la casa durant les festes, donar un toc de color a qualsevol racó o fer un regal especial. Els seus tons vermells i taronges li donen molta personalitat i calidesa.",
      VARIACIONS_RAM,
    ],
    caracteristiques: [
      "Composició amb hortènsies vermelles i taronges.",
      "Elements naturals.",
      "Elaboració artesanal.",
      "Cada ram és únic i pot presentar petites variacions segons la disponibilitat de les flors.",
    ],
    mides: MIDES_RAM,
    notaMides: LLARGADA_RAM,
    fotos: [
      { src: "/assets/catalog/caliu-1.jpg", alt: "Ram Caliu: hortènsia vermella, rodanxa de taronja i eucaliptus" },
      { src: "/assets/catalog/caliu-2.jpg", alt: "Ram Caliu amb hortènsia bordeus i eucaliptus sostingut a la mà" },
    ],
  },
  {
    id: "corona-alsacia",
    nom: "Corona Alsàcia",
    categoria: "nadal-corones",
    resum: "Avet, taronja deshidratada, pinyes i llaç de quadres.",
    descripcio: [
      "Inspirada en l'atmosfera única dels mercats d'artesania d'Alsàcia, on el fred s'omple de llum, textures i aromes acollidores. Aquesta corona està elaborada sobre una base d'avet i verds naturals, decorada amb rodanxes de taronja deshidratada, pinyes, fruits vermells i espècies com la canyella i l'anís estrellat. El seu vestit central és un llaç de cotó de quadres vermells i blancs, un gest al teixit tradicional que aporta un acabat càlid i inconfusible.",
      "Una peça plena d'aroma i detalls artesanals, ideal per penjar a la porta de benvinguda o per presidir la decoració interior durant les festes.",
      "Elaborada artesanalment, cada corona és única i pot presentar petites variacions respecte a la fotografia segons la disponibilitat dels elements naturals.",
    ],
    caracteristiques: [
      "Base d'avet i verdor natural de temporada.",
      "Elements decoratius: taronja deshidratada, pinyes, fruits vermells i espècies aromàtiques.",
      "Acabat amb llaç de cotó a quadres estil tradicional.",
      "Elaboració 100% artesanal.",
    ],
    mides: [
      { id: "S", etiqueta: "S", detall: "20 cm de diàmetre", preu: 15 },
      { id: "M", etiqueta: "M", detall: "25 cm de diàmetre", preu: 25 },
      { id: "L", etiqueta: "L", detall: "35 cm de diàmetre", preu: 35 },
    ],
    fotos: [
      { src: "/assets/catalog/corona-alsacia-1.jpg", alt: "Corona Alsàcia: avet i verds naturals amb llaç de quadres vermells, taronja deshidratada, pinyes, fruits vermells i canyella" },
    ],
  },
  {
    id: "centre-alsacia",
    nom: "Centre Alsàcia",
    categoria: "nadal-centres",
    resum: "Centre de taula amb avet, taronja deshidratada i llaç de quadres.",
    descripcio: [
      "Inspirat en l'atmosfera acollidora i artesanal dels mercats de Nadal d'Alsàcia. Aquest centre de taula combina una base densa d'avet i verds naturals amb rodanxes de taronja deshidratada, pinyes, fruits vermells i espècies aromàtiques com la canyella i l'anís estrellat. L'acabat el corona un elegant llaç de cotó de quadres vermells i blancs, aportant el toc just de tradició i llum per presidir les teves celebracions.",
      "Una composició pensada per omplir la taula de textura, color i una fragància natural inconfusible durant totes les festes.",
      "Elaborat artesanalment, cada centre és únic i pot presentar petites variacions respecte a la fotografia segons la disponibilitat dels elements naturals.",
    ],
    caracteristiques: [
      "Base d'avet i verdor natural de temporada.",
      "Elements decoratius: taronja deshidratada, pinyes, fruits vermells i espècies aromàtiques.",
      "Acabat amb llaç de cotó a quadres d'estil tradicional.",
      "Dissenyat com a centre de taula.",
      "Elaboració 100% artesanal.",
    ],
    mides: [{ id: "unica", etiqueta: "Única", detall: "Mida única", preu: 35 }],
    fotos: [
      { src: "/assets/catalog/centre-alsacia-1.jpg", alt: "Centre Alsàcia: cistell amb avet, pinyes, hortènsies seques i llaç de quadres" },
      { src: "/assets/catalog/centre-alsacia-2.jpg", alt: "Detall de les rodanxes de taronja deshidratada i l'avet del Centre Alsàcia" },
      { src: "/assets/catalog/centre-alsacia-3.jpg", alt: "Centre Alsàcia vist de prop: hortènsia seca, pinyes, taronja deshidratada i llaç de quadres sobre una cistella" },
    ],
  },
];

/** Cerca un producte pel seu identificador; `undefined` si no existeix. */
export function getProducteById(id: string | null): Producte | undefined {
  return PRODUCTES.find((producte) => producte.id === id);
}

/** Cerca una mida d'un producte; `undefined` si no existeix. */
export function getMida(producte: Producte, midaId: string): Mida | undefined {
  return producte.mides.find((mida) => mida.id === midaId);
}

/** Preu més baix del producte (el "des de" de la botiga). */
export function preuDesDe(producte: Producte): number {
  return Math.min(...producte.mides.map((mida) => mida.preu));
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
  midaId: string;
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
    productId: "ram-terra",
    midaId: "M",
    quantitat: 1,
    total: 20,
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
    productId: "ram-gerd",
    midaId: "L",
    quantitat: 2,
    total: 50,
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
    productId: "ram-neu",
    midaId: "S",
    quantitat: 1,
    total: 15,
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
    productId: "ram-mediterrani",
    midaId: "M",
    quantitat: 3,
    total: 60,
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

/** Foto real d'un esdeveniment de la Núria. Els títols només descriuen el que es veu. */
export interface FotoEsdeveniment {
  id: string;
  titol: string;
  foto: string;
}

export const FOTOS_ESDEVENIMENTS: FotoEsdeveniment[] = [
  {
    id: "taula-clavells",
    titol: "Centre de taula amb clavells i eucaliptus",
    foto: "/assets/client/esdeveniments-1.jpg",
  },
  {
    id: "taula-gerros",
    titol: "Gerros petits amb clavells a la taula",
    foto: "/assets/client/esdeveniments-2.jpg",
  },
];

/** Text de les pàgines d'Ocasions, tal com el va escriure la Núria (10/11/2026). */
export const TEXTOS_OCASIONS: Record<OcasioId, string[]> = {
  casaments: [
    "A Nunu Flowers transformem les vostres idees en una decoració floral única i inoblidable per al vostre gran dia. Des del ram de núvia fins a l'atmosfera del banquet, dissenyem cada element de manera 100% artesanal per fer realitat tot el que imagineu.",
    "Si ho teniu al cap, ho fem realitat. Expliqueu-nos la vostra idea!",
  ],
  esdeveniments: [
    "Des d'aniversaris i festes privades fins a dinars i sopars especials. Dissenyem arranjaments florals a mida per crear l'atmosfera perfecta en qualsevol celebració.",
    "Cuidem cada detall de manera artesanal per transformar la teva taula o espai en un entorn inoblidable.",
    "Explica'ns el teu esdeveniment i en farem una peça única!",
  ],
};

/**
 * Fires i mercats on serà Nunu Flowers, el més proper primer. Les dues
 * primeres línies del document de la Núria no donen el lloc: només el nom.
 * Quan acabi una fira, es treu d'aquí.
 */
export interface Fira {
  id: string;
  nom: string;
  /** Text lliure ("5, 6 i 7 de desembre"): evita fer-se un lio amb zones horàries. */
  dates: string;
  horari: string;
}

export const FIRES: Fira[] = [
  {
    id: "els-angels",
    nom: "Els Àngels",
    dates: "28 de novembre de 2026",
    horari: "De 10:00 a 15:00 h",
  },
  {
    id: "can-panxut",
    nom: "Fira de Can Panxut",
    dates: "29 de novembre de 2026",
    horari: "De 10:00 a 18:00 h",
  },
  {
    id: "nadal-olot",
    nom: "Fira de Nadal d'Olot",
    dates: "5, 6 i 7 de desembre de 2026",
    horari: "De 10:00 a 20:00 h",
  },
];

/** Dues fotos de la Núria a una parada de fira (no són d'una fira concreta). */
export const FOTOS_FIRES = [
  {
    src: "/assets/catalog/fires-1.jpg",
    alt: "La Núria preparant la seva parada de flors en una fira",
  },
  {
    src: "/assets/catalog/fires-2.jpg",
    alt: "Parada de Nunu Flowers amb rams i cistells en una fira",
  },
] as const;

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
