import type { Metadata } from "next";

// Fonts autoallotjades amb Fontsource (paquets npm), no `next/font/google`:
// aquest entorn de build no té sortida de xarxa cap a fonts.googleapis.com,
// i més important, autoallotjar evita que el navegador de cada visitant
// faci una petició a un domini de Google en carregar la pàgina — el motiu
// pel qual diverses autoritats de protecció de dades de la UE han
// considerat Google Fonts incompatible amb l'RGPD quan es serveix sense
// consentiment previ. Zero peticions de tercers, zero banner de cookies
// per aquest motiu.
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { jsonLdOrganitzacio } from "@/lib/seo";
import { IMATGE_PER_DEFECTE, INDEXABLE, NOM_LLOC, SITE_URL } from "@/lib/site";

const DESCRIPCIO =
  "Rams de flor seca compostos a mà al Penedès, i projectes a mida per a casaments i esdeveniments. Botiga en línia, sense local físic.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nunu Flowers — Rams de flor seca fets a mà",
    template: `%s | ${NOM_LLOC}`,
  },
  description: DESCRIPCIO,
  openGraph: {
    type: "website",
    siteName: NOM_LLOC,
    locale: "ca_ES",
    title: "Nunu Flowers — Rams de flor seca fets a mà",
    description: DESCRIPCIO,
    images: [{ url: IMATGE_PER_DEFECTE }],
  },
  twitter: { card: "summary_large_image", images: [IMATGE_PER_DEFECTE] },
  // Mentre no es publiqui (INDEXABLE=true, lib/site.ts) tot el lloc és noindex.
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>
        <JsonLd dades={jsonLdOrganitzacio()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
