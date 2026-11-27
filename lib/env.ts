import { z } from "zod";

/**
 * Variables d'entorn del servidor, validades amb Zod (ADR-021,
 * nunu-arquitectura-produccio.md).
 *
 * Es validen quan es demanen (`entornServidor()`), no en importar el mòdul:
 * si es validessin a l'import, `next build` fallaria en un host on encara no
 * s'han posat les claus, tot i que les pàgines estàtiques no les necessiten.
 *
 * Els missatges d'error diuen quina variable falla i per què, però no en
 * repeteixen mai el valor: una cadena de connexió duu la contrasenya i no ha
 * d'acabar als registres.
 *
 * Punt d'extensió: les claus de Stripe, de Resend i el secret de Better Auth
 * s'afegeixen aquí quan es construeixin els passos que les fan servir.
 */

/**
 * L'adreça agrupada de Neon duu `-pooler` a la primera part del nom.
 * Zod executa aquesta comprovació encara que la validació d'URL ja hagi
 * fallat; si no és una URL, ja s'ha denunciat i aquí no hi ha res a dir.
 */
function esAdrecaAgrupadaOForaDeNeon(valor: string): boolean {
  if (!URL.canParse(valor)) return true;
  const { hostname } = new URL(valor);
  if (!hostname.endsWith(".neon.tech")) return true;
  return hostname.split(".")[0]?.endsWith("-pooler") === true;
}

const esquemaServidor = z.object({
  DATABASE_URL: z
    .url({
      protocol: /^postgres(ql)?$/,
      error: (problema) =>
        problema.input === undefined
          ? "Falta la variable. Ha de ser la cadena de connexió agrupada de Neon."
          : "No és una adreça postgres:// o postgresql:// vàlida.",
    })
    .refine(esAdrecaAgrupadaOForaDeNeon, {
      error:
        "És l'adreça directa de Neon. L'aplicació ha d'usar l'adreça agrupada (el nom del servidor duu «-pooler»); la directa és només per a les migracions (DATABASE_URL_UNPOOLED).",
    }),
});

export type EntornServidor = z.infer<typeof esquemaServidor>;

export class ErrorEntorn extends Error {
  constructor(missatge: string) {
    super(missatge);
    this.name = "ErrorEntorn";
  }
}

/** Valida un conjunt de variables. Separada de `process.env` perquè es pugui provar. */
export function llegeixEntorn(
  font: Readonly<Record<string, string | undefined>>,
): EntornServidor {
  const resultat = esquemaServidor.safeParse(font);
  if (resultat.success) return resultat.data;

  const detalls = resultat.error.issues
    .map((problema) => `- ${problema.path.join(".")}: ${problema.message}`)
    .join("\n");
  throw new ErrorEntorn(
    `La configuració d'entorn no és vàlida:\n${detalls}\nRevisa les variables a .env.local o al panell del host.`,
  );
}

let memoitzat: EntornServidor | undefined;

export function entornServidor(): EntornServidor {
  memoitzat ??= llegeixEntorn(process.env);
  return memoitzat;
}
