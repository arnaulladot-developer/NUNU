# Nunu Flowers — prototip web

Prototip navegable de la botiga Nunu Flowers, convertit de la maqueta HTML
de revisió a un projecte Next.js perquè es pugui publicar amb una URL
pròpia i compartir-la amb la clienta.

**Què és i què no és.** Aquest projecte és el prototip de disseny —
contingut i fotografies d'exemple, sense backend, sense pagaments i sense
seguiment real de comandes (els formularis de Contacte i Seguiment són
demostracions purament de client; la Cistella persisteix a `localStorage`
del navegador, sense servidor). No és encara el lloc de producció descrit
a `arquitectura.md`: totes les pantalles viuen sota una única ruta de
l'App Router i commuten per JavaScript de client (`context/navigation.tsx`),
sense URL pròpia per pantalla — límit conegut i documentat a l'ADR-002, que
cal resoldre abans de fer SEO real o d'indexar el lloc. Quan arribi la fase
de producció, cada pantalla es converteix en una ruta real amb metadades i
dades estructurades pròpies, es connecta Stripe i/o Bizum (ADR-004,
bloquejat per la situació fiscal de la clienta), i es dona d'alta la base
de dades del catàleg i les comandes.

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
  layout.tsx          Metadades, fonts (next/font) i CSS global
  globals.css         Tots els tokens i estils, portats de design-system.md
  page.tsx            Punt d'entrada: commuta entre les 7 pantalles i munta
                      el calaix de cistella (ADR-008)
components/
  SiteHeader.tsx        Capçalera flotant (comuna a totes les pantalles),
                        amb el botó flotant de la cistella com a germà seu
  SiteFooter.tsx        Peu de pàgina (variant "inici" i variant simple)
  Carousel.tsx          Carrusel reutilitzable (fitxa de producte i projecte)
  NavLink.tsx           Enllaç intern entre pantalles
  BackLink.tsx          Botó de tornar enrere (§7.13 design-system.md)
  ArrowLabel.tsx        Etiqueta amb fletxa animada
  ProductCard.tsx       Targeta de producte ("Rams"), amb botó propi
                        d'"Afegir a la cistella" independent del clic de
                        navegació a la fitxa
  QuantityStepper.tsx   Selector de quantitat (+/-) reutilitzat a la Fitxa
                        de producte i al calaix de cistella
  CistellaCalaix.tsx    Calaix lateral global de la cistella (ADR-008) —
                        no és una pantalla de `screens/`, es munta un cop
                        a `app/page.tsx` i se superposa a qualsevol pantalla
  screens/              Les 7 pantalles: Inici, Botiga ("Rams"), Fitxa,
                        Projectes ("Esdeveniments"), ProjecteDetall,
                        Contacte i Seguiment
context/
  navigation.tsx      Estat de quina pantalla està activa
  cart.tsx            Estat del carret (articles, quantitats, comentaris)
                      i del calaix (obert/tancat), persistit a
                      `localStorage` — sense backend (ADR-003, ADR-008)
hooks/
  useScrollThreshold.ts  Mostra/amaga la capçalera a Inici en fer scroll
  useHeroParallax.ts     Parallax del text del hero
lib/
  types.ts            Tipus compartits
  data.ts             Contingut d'exemple (productes i projectes)
public/assets/         Fotografies, logotip d'exemple i icona de cistella
                      (`icona-cistella.png`, recolorida per CSS amb
                      `mask-image`)
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
- Enrutament real per pantalla — revertir ADR-002 (`arquitectura.md`):
  necessari abans de qualsevol treball seriós de SEO (`seo.md`).
- Passarel·la de pagament real (Stripe i/o Bizum) a `context/cart.tsx` i
  `CistellaCalaix.tsx` — bloquejat per la situació fiscal de la clienta
  (ADR-004).
- Treure `robots: { index: false }` de `app/layout.tsx` quan es publiqui
  la versió definitiva (ara mateix el prototip no s'ha d'indexar).
