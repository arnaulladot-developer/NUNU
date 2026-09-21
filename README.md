# Nunu Flowers — prototip web

Prototip navegable de la botiga Nunu Flowers, convertit de la maqueta HTML
de revisió a un projecte Next.js perquè es pugui publicar amb una URL
pròpia i compartir-la amb la clienta.

**Què és i què no és.** Aquest projecte és el prototip de disseny —
contingut i fotografies d'exemple, sense backend, sense pagaments i sense
seguiment real de comandes (els formularis de Contacte i Seguiment són
demostracions purament de client). No és encara el lloc de producció
descrit a `arquitectura.md` (ADR-001): quan arribi aquesta fase, cada
pantalla es converteix en una ruta real de l'App Router amb metadades i
dades estructurades pròpies, es connecta Stripe/Bizum, i es dona d'alta
la base de dades del catàleg i les comandes.

## Instal·lació

```bash
npm install
```

## Desenvolupament local

```bash
npm run dev
```

Obre http://localhost:3000

## Comprovació abans de publicar

```bash
npm run lint
npm run build
```

`npm run build` fa la comprovació de tipus de TypeScript en mode estricte
i el build de producció; ha d'acabar sense errors abans de desplegar.

## Estructura

```
app/
  layout.tsx        Metadades, fonts (next/font) i CSS global
  globals.css        Tots els tokens i estils, portats de design-system.md
  page.tsx           Punt d'entrada: commuta entre les 7 pantalles
components/
  SiteHeader.tsx      Capçalera flotant (comuna a totes les pantalles)
  SiteFooter.tsx      Peu de pàgina (variant "inici" i variant simple)
  Carousel.tsx        Carrusel reutilitzable (fitxa de producte i projecte)
  NavLink.tsx         Enllaç intern entre pantalles
  BackLink.tsx        Botó de tornar enrere (§7.13 design-system.md)
  ArrowLabel.tsx       Etiqueta amb fletxa animada
  screens/            Les 7 pantalles (Inici, Botiga, Fitxa, Projectes,
                       ProjecteDetall, Contacte, Seguiment)
context/
  navigation.tsx      Estat de quina pantalla està activa
hooks/
  useScrollThreshold.ts  Mostra/amaga la capçalera a Inici en fer scroll
  useHeroParallax.ts     Parallax del text del hero
lib/
  types.ts            Tipus compartits
  data.ts             Contingut d'exemple (productes i projectes)
public/assets/         Fotografies i logotip d'exemple
```

## Desplegament a Vercel

```bash
npx vercel          # desplegament de prova
npx vercel --prod    # desplegament de producció
```

Cal haver fet `vercel login` (o exportar `VERCEL_TOKEN`) abans amb el
compte de Vercel on s'ha de publicar.

## Pendent abans de la versió pública real

- Fotografies definitives (ara marcades com "Foto d'exemple").
- Catàleg complet i preus confirmats (`lib/data.ts`).
- Textos legals: NIF, condicions de venda i dret de desistiment.
- Enrutament real per pantalla (SEO tècnic complet — `seo.md`).
- Treure `robots: { index: false }` de `app/layout.tsx` quan es publiqui
  la versió definitiva (ara mateix el prototip no s'ha d'indexar).
