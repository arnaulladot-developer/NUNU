import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
// Import relatiu i no «@/…»: drizzle-kit carrega aquest fitxer pel seu compte
// i no resol els àlies de tsconfig.
import { ESTATS_COMANDA } from "../data";

/**
 * Esquema de la base de dades (ADR-021, nunu-arquitectura-produccio.md).
 *
 * Els imports es desen en cèntims (enters): Stripe treballa en cèntims i els
 * decimals de coma flotant no s'han d'usar per a diners.
 *
 * Dos estats separats a propòsit. `estatPagament` diu si Stripe ha confirmat
 * el cobrament; `estat` és el pas de la preparació i l'enviament que veu la
 * Núria. Una comanda nova és «pendent» fins que el webhook de Stripe en
 * confirma el pagament; el panell només ha d'ensenyar les pagades.
 *
 * Punts oberts:
 * - Les taules d'usuaris i sessions de Better Auth les genera la seva eina
 *   (pas 6 del pla) i s'afegiran en una migració a part.
 * - Quant de temps es conserven les comandes no s'ha decidit. L'esborrat als
 *   20 dies que va demanar la Núria no és compatible amb l'obligació de
 *   guardar els registres comptables i fiscals; ho ha de resoldre el gestor
 *   abans de fer cap esborrat automàtic.
 */

export const ESTATS_PAGAMENT = [
  "pendent",
  "pagat",
  "caducat",
  "reemborsat",
] as const;

export type EstatPagament = (typeof ESTATS_PAGAMENT)[number];

export const estatComandaEnum = pgEnum("estat_comanda", ESTATS_COMANDA);
export const estatPagamentEnum = pgEnum("estat_pagament", ESTATS_PAGAMENT);

const ambZona = { withTimezone: true } as const;

export const comandes = pgTable(
  "comandes",
  {
    /** Número de comanda que veu el client, p. ex. «NF-7QXT2M9K». */
    id: text("id").primaryKey(),
    creadaEl: timestamp("creada_el", ambZona).notNull().defaultNow(),
    estat: estatComandaEnum("estat").notNull().default("Comprat"),
    estatPagament: estatPagamentEnum("estat_pagament").notNull().default("pendent"),
    pagatEl: timestamp("pagat_el", ambZona),

    client: text("client").notNull(),
    correu: text("correu").notNull(),
    telefon: text("telefon").notNull(),
    adreca: text("adreca").notNull(),

    importProductesCents: integer("import_productes_cents").notNull(),
    importEnviamentCents: integer("import_enviament_cents").notNull(),
    importTotalCents: integer("import_total_cents").notNull(),

    stripeSessioId: text("stripe_sessio_id"),
    stripePagamentId: text("stripe_pagament_id"),
  },
  (taula) => [
    // Postgres permet diversos NULL en un índex únic: les comandes encara
    // sense sessió de Stripe no s'estorben.
    uniqueIndex("comandes_stripe_sessio_uq").on(taula.stripeSessioId),
    index("comandes_pagament_creada_idx").on(taula.estatPagament, taula.creadaEl),
    check(
      "comandes_imports_ck",
      sql`${taula.importProductesCents} >= 0
        and ${taula.importEnviamentCents} >= 0
        and ${taula.importTotalCents} = ${taula.importProductesCents} + ${taula.importEnviamentCents}`,
    ),
  ],
);

/**
 * Línies d'una comanda. El nom, la mida i el preu són una còpia del catàleg en
 * el moment de la compra: canviar un preu a `lib/data.ts` no ha de reescriure
 * comandes ja fetes.
 */
export const comandaArticles = pgTable(
  "comanda_articles",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    comandaId: text("comanda_id")
      .notNull()
      .references(() => comandes.id, { onDelete: "cascade" }),
    productId: text("product_id").notNull(),
    midaId: text("mida_id").notNull(),
    nomProducte: text("nom_producte").notNull(),
    etiquetaMida: text("etiqueta_mida").notNull(),
    preuUnitatCents: integer("preu_unitat_cents").notNull(),
    quantitat: integer("quantitat").notNull(),
    comentari: text("comentari").notNull().default(""),
  },
  (taula) => [
    // La cistella identifica cada línia per producte + mida (ADR-018).
    uniqueIndex("comanda_articles_linia_uq").on(
      taula.comandaId,
      taula.productId,
      taula.midaId,
    ),
    check(
      "comanda_articles_valors_ck",
      sql`${taula.quantitat} > 0 and ${taula.preuUnitatCents} >= 0`,
    ),
  ],
);

/** Rams que la Núria ha marcat com a exhaurits (substitueix el `localStorage` de l'ADR-014). */
export const ramsExhaurits = pgTable("rams_exhaurits", {
  productId: text("product_id").primaryKey(),
  marcatEl: timestamp("marcat_el", ambZona).notNull().defaultNow(),
});

/**
 * Esdeveniments de Stripe ja processats. Stripe pot reenviar el mateix avís;
 * inserir-ne l'identificador abans de processar-lo (i ignorar el conflicte)
 * fa que el webhook sigui idempotent.
 */
export const stripeEsdeveniments = pgTable("stripe_esdeveniments", {
  id: text("id").primaryKey(),
  tipus: text("tipus").notNull(),
  rebutEl: timestamp("rebut_el", ambZona).notNull().defaultNow(),
});

export const comandesRelacions = relations(comandes, ({ many }) => ({
  articles: many(comandaArticles),
}));

export const comandaArticlesRelacions = relations(comandaArticles, ({ one }) => ({
  comanda: one(comandes, {
    fields: [comandaArticles.comandaId],
    references: [comandes.id],
  }),
}));

export type ComandaFila = typeof comandes.$inferSelect;
export type NovaComandaFila = typeof comandes.$inferInsert;
export type ArticleFila = typeof comandaArticles.$inferSelect;
export type NouArticleFila = typeof comandaArticles.$inferInsert;
