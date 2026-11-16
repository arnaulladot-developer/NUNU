import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaCategoria } from "@/components/pages/PaginaCategoria";
import { CATEGORIES_FLORS } from "@/lib/data";
import { trobaCategoriaPerRuta } from "@/lib/routes";
import { metadataCategoria } from "@/lib/seo";

type Props = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES_FLORS.map((categoria) => ({ categoria: categoria.slug }));
}

async function carregaCategoria(params: Props["params"]) {
  const { categoria } = await params;
  const trobada = trobaCategoriaPerRuta("flors", categoria);
  if (!trobada) notFound();
  return trobada;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataCategoria((await carregaCategoria(params)).id);
}

export default async function Page({ params }: Props) {
  return <PaginaCategoria id={(await carregaCategoria(params)).id} />;
}
