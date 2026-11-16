import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fitxa } from "@/components/screens/Fitxa";
import { JsonLd } from "@/components/JsonLd";
import { PRODUCTES, getCategoria, getProducteById } from "@/lib/data";
import { rutaCategoria, rutaProducte } from "@/lib/routes";
import { jsonLdMiga, jsonLdProducte, metadataProducte } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTES.map((producte) => ({ id: producte.id }));
}

async function carregaProducte(params: Props["params"]) {
  const { id } = await params;
  const producte = getProducteById(id);
  if (!producte) notFound();
  return producte;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataProducte(await carregaProducte(params));
}

export default async function Page({ params }: Props) {
  const producte = await carregaProducte(params);
  const categoria = getCategoria(producte.categoria);
  return (
    <>
      <JsonLd dades={jsonLdProducte(producte)} />
      <JsonLd
        dades={jsonLdMiga([
          { nom: "Inici", ruta: "/" },
          { nom: categoria?.nom ?? "Flors", ruta: rutaCategoria(producte.categoria) },
          { nom: producte.nom, ruta: rutaProducte(producte.id) },
        ])}
      />
      <Fitxa key={producte.id} producte={producte} />
    </>
  );
}
