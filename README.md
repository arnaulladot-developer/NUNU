# Nunu Flowers — web

Botiga en línia de Nunu Flowers (rams i centres de flor seca, preservada i
fresca, productes de Nadal i encàrrecs per a casaments i esdeveniments), feta
amb Next.js 16 (App Router), TypeScript estricte i CSS propi.

**Estat.** El contingut (catàleg, mides i preus, textos d'Ocasions, Fires i
fotografies) és el real de la Núria (document del 10/11/2026). Encara **no és
una botiga operativa**: no hi ha pagament, ni base de dades, ni comandes reals
(els formularis de Contacte i Seguiment són demostracions de client i la
cistella es guarda a `localStorage`). L'estat detallat i les decisions són a
`arquitectura.md` i `brief.md` del projecte de Claude «PAGINES WEB».

## Instal·lació

```bash
npm install
```

## Desenvolupament local

```bash
npm run dev
```

Obre http://localhost:3000. Next.js 16 té canvis respecte a versions anteriors:
llegeix la guia corresponent de `node_modules/next/dist/docs/` abans d'escriure
codi nou (vegeu `AGENTS.md`).

## Comprovació abans de publicar

```bash
npx tsc --noEmit
npm run lint
npm run build
```

`npm run build` ha d'acabar sense errors i ha de generar totes les rutes
(`/`, `/flors/*`, `/nadal/*`, `/producte/*`, `/ocasions/*`, `/fires`,
`/contacte`, `/seguiment`, `/admin`, `/robots.txt` i `/sitemap.xml`).

## Rutes i SEO

Cada pantalla té la seva URL real, generada estàticament (ADR-020):

| Ruta | Pàgina |
|---|---|
| `/` | Inici |
| `/flors`, `/flors/[frescos\|secs\|centres]` | Botiga de flors |
| `/nadal/[rams\|corones\|centres]` | Botiga de Nadal (`/nadal` redirigeix a `/nadal/rams`) |
| `/producte/[id]` | Fitxa de producte (id = `id` a `lib/data.ts`) |
| `/ocasions`, `/ocasions/[casaments\|esdeveniments]` | Ocasions |
| `/fires`, `/contacte` | Fires i Contacte |
| `/seguiment`, `/admin` | Utilitat interna: **sempre `noindex`** |

- `lib/routes.ts` és l'única font de veritat de les URLs.
- `lib/seo.ts` genera títol, descripció, canònica, Open Graph i dades
  estructurades (Organization, Product, BreadcrumbList) de cada pàgina.
- `app/sitemap.ts` i `app/robots.ts` es generen sols a partir de `lib/data.ts`.

### Variables d'entorn

| Variable | Per a què | Per defecte |
|---|---|---|
| `INDEXABLE` | `true` permet que els cercadors indexin el lloc. Qualsevol altre valor (o cap) el deixa `noindex` i amb `Disallow: /` a `robots.txt`. | no definida (no indexable) |
| `SITE_URL` | Adreça pública sense barra final (canòniques, sitemap, Open Graph). | `https://nunu-flowers-web.vercel.app` |

Es llegeixen en temps de build: després de canviar-les cal tornar a desplegar.

## Estructura

```
app/
  layout.tsx            Metadades globals, fonts, Organization JSON-LD i <Providers>
  globals.css           Tokens i estils
  page.tsx              Inici
  flors/, nadal/        Botiga per categoria (generateStaticParams)
  producte/[id]/        Fitxa de producte
  ocasions/, fires/, contacte/, seguiment/, admin/
  sitemap.ts, robots.ts, not-found.tsx
components/
  Providers.tsx         Navegació, estoc, cistella i calaix (munta al layout)
  SiteHeader.tsx, SiteFooter.tsx, NavLink.tsx (next/link), BackLink.tsx
  ProductCard.tsx, ProductImage.tsx, Carousel.tsx, QuantityStepper.tsx
  CistellaCalaix.tsx    Calaix lateral de la cistella (ADR-008)
  JsonLd.tsx            <script> JSON-LD amb escapament de `<`
  pages/                Peces de pàgina compartides entre rutes
  screens/              Una pantalla per component (reben el producte, la
                        categoria o l'ocasió per props des de la ruta)
context/
  navigation.tsx        Pantalla activa derivada de la URL; goTo() fa router.push
  cart.tsx              Cistella per producte + mida (`localStorage`, clau v2)
  botiga.tsx            Estoc i sessió del panell intern (demostració)
lib/
  data.ts               Catàleg, categories, fires, textos d'ocasions i contacte
  routes.ts             Pantalla/filtre <-> ruta real
  seo.ts, site.ts       Metadades, JSON-LD i configuració d'entorn
  types.ts              Tipus compartits
public/assets/          Fotografies (`catalog/`, `client/`), logotip i icones
```

## Desplegament a Vercel

```bash
npx vercel          # desplegament de prova
npx vercel --prod   # desplegament de producció
```

Cal haver fet `vercel login` (o exportar `VERCEL_TOKEN`) amb el compte on
s'ha de publicar.

### Llançament

1. Domini propi apuntant a Vercel.
2. A Vercel: `SITE_URL=https://<domini>` i `INDEXABLE=true`; tornar a desplegar.
3. Comprovar `https://<domini>/robots.txt` i que una fitxa mostra
   `<meta name="robots" content="index, follow">`.
4. Enviar `https://<domini>/sitemap.xml` a Google Search Console.

## Pendent abans de la versió pública

- Productes que falten (la Núria els afegirà quan arribi el material).
- Textos legals: política de privacitat, condicions de venda i dret de
  desistiment; NIF.
- Pagament: decisió pendent (efectiu + Bizum o passarel·la); ADR-004.
- Correu i Instagram reals (`CONTACTE` a `lib/data.ts` encara no estan confirmats).
- Domini propi i `INDEXABLE=true` (vegeu Llançament).
