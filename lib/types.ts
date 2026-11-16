/**
 * Identificador de cada pantalla. Les pantalles tenen ruta real (ADR-020,
 * arquitectura.md); `lib/routes.ts` fa la correspondència entre aquest tipus
 * i la URL, i és l'únic lloc que la coneix.
 */
export type ScreenId =
  | "inici"
  | "botiga"
  | "fitxa"
  | "projectes"
  | "contacte"
  | "fires"
  | "seguiment"
  /** Panell intern de la propietària (ADR-014). No surt a cap menú: només
   * s'hi arriba introduint les credencials de demostració al formulari de
   * Seguiment. No és una pantalla pública i no s'indexa mai (`/admin`). */
  | "admin";
