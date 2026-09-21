/**
 * Identificador de cada pantalla del prototip. El prototip és una única
 * pàgina que commuta de "pantalla" en memòria (com feia la maqueta HTML
 * original amb `data-va-a`) — no és encara enrutament real per URL.
 * Quan el projecte passi a producció (ADR-001, arquitectura.md), cada
 * valor d'aquest tipus es converteix en una ruta real de l'App Router
 * (per exemple `/botiga`, `/producte/[slug]`), amb metadades i dades
 * estructurades pròpies — imprescindible per al SEO tècnic que exigeix
 * seo.md i que una SPA d'una sola pàgina no pot oferir.
 */
export type ScreenId =
  | "inici"
  | "botiga"
  | "fitxa"
  | "projectes"
  | "projecte-detall"
  | "contacte"
  | "seguiment";
