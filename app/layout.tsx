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
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nunu Flowers — Rams de flor seca fets a mà",
  description:
    "Rams de flor seca compostos a mà al Penedès, i projectes a mida per a casaments i esdeveniments. Botiga en línia, sense local físic.",
  // Prototip de revisió amb la clienta — encara no és el lloc definitiu.
  // Treure aquest bloc quan es publiqui la versió real (vegeu resposta).
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
