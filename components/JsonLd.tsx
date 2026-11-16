/**
 * Dades estructurades (schema.org) en un `<script>` JSON-LD. El `<` s'escapa
 * perquè cap text de les dades pugui tancar l'etiqueta (recomanació de la
 * guia de JSON-LD de Next.js).
 */
export function JsonLd({ dades }: { dades: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dades).replace(/</g, "\\u003c"),
      }}
    />
  );
}
