import { defineConfig } from "drizzle-kit";

// drizzle-kit no llegeix .env.local per si sol (Next.js sí). Si el fitxer no
// existeix, les variables han de venir de l'entorn.
try {
  process.loadEnvFile(".env.local");
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
}

/**
 * Les migracions van per l'adreça DIRECTA de Neon (sense «-pooler»): l'agrupada
 * no admet funcions de sessió que algunes migracions necessiten. L'aplicació
 * fa servir l'agrupada (DATABASE_URL, lib/env.ts).
 *
 * `npm run db:generate` només escriu SQL a `drizzle/` i no necessita cap
 * connexió. `npm run db:migrate` sí que en necessita una i aplica el SQL: no
 * s'executa sense l'aprovació de qui porta el projecte.
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL_UNPOOLED ?? "" },
});
