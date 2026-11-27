import "server-only";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { entornServidor } from "@/lib/env";
import * as schema from "./schema";

export type BaseDeDades = NodePgDatabase<typeof schema>;

interface Connexio {
  pool: Pool;
  db: BaseDeDades;
}

// Es desa a `globalThis` perquè la recàrrega en calent del servidor de
// desenvolupament no obri un grup de connexions nou a cada canvi de fitxer.
const global = globalThis as typeof globalThis & { __nunuConnexio?: Connexio };

/**
 * Base de dades de l'aplicació. Es crea la primera vegada que es demana, no
 * en importar el mòdul, perquè `next build` no necessiti la cadena de connexió.
 *
 * El grup és petit a propòsit (2) i tanca les connexions ocioses als 10 s:
 * Neon ja agrupa les connexions per darrere (`-pooler`) i una funció
 * serverless viu poc; un grup gran per sobre n'esgotaria els límits.
 */
export function baseDeDades(): BaseDeDades {
  if (!global.__nunuConnexio) {
    const pool = new Pool({
      connectionString: entornServidor().DATABASE_URL,
      max: 2,
      idleTimeoutMillis: 10_000,
    });
    // Sense aquest receptor, un error d'una connexió ociosa tomba el procés.
    pool.on("error", (error) => {
      console.error("Error al grup de connexions de Postgres:", error.message);
    });
    global.__nunuConnexio = { pool, db: drizzle(pool, { schema }) };
  }
  return global.__nunuConnexio.db;
}
