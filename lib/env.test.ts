import { describe, expect, it } from "vitest";
import { ErrorEntorn, llegeixEntorn } from "./env";

const AGRUPADA =
  "postgresql://usuari:secret-de-prova@ep-cool-rain-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";
const DIRECTA =
  "postgresql://usuari:secret-de-prova@ep-cool-rain-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require";

function missatgeDeError(font: Record<string, string | undefined>): string {
  try {
    llegeixEntorn(font);
  } catch (error) {
    expect(error).toBeInstanceOf(ErrorEntorn);
    return (error as Error).message;
  }
  throw new Error("S'esperava un error d'entorn i no n'hi ha hagut cap.");
}

describe("llegeixEntorn", () => {
  it("accepta l'adreça agrupada de Neon", () => {
    expect(llegeixEntorn({ DATABASE_URL: AGRUPADA }).DATABASE_URL).toBe(AGRUPADA);
  });

  it("accepta un Postgres local sense «-pooler»", () => {
    const local = "postgres://nunu:nunu@localhost:5432/nunu";
    expect(llegeixEntorn({ DATABASE_URL: local }).DATABASE_URL).toBe(local);
  });

  it("rebutja l'adreça directa de Neon i explica per què", () => {
    expect(missatgeDeError({ DATABASE_URL: DIRECTA })).toContain("agrupada");
  });

  it("diu que falta la variable", () => {
    const missatge = missatgeDeError({});
    expect(missatge).toContain("DATABASE_URL");
    expect(missatge).toContain("Falta");
  });

  it("rebutja un protocol que no és Postgres", () => {
    expect(missatgeDeError({ DATABASE_URL: "https://exemple.cat/db" })).toContain(
      "postgres",
    );
  });

  it("no repeteix mai la contrasenya als missatges", () => {
    expect(missatgeDeError({ DATABASE_URL: DIRECTA })).not.toContain("secret-de-prova");
    expect(missatgeDeError({ DATABASE_URL: "no-es-una-url-secret-de-prova" })).not.toContain(
      "secret-de-prova",
    );
  });
});
