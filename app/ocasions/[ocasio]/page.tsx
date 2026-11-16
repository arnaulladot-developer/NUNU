import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Projectes } from "@/components/screens/Projectes";
import { JsonLd } from "@/components/JsonLd";
import { OCASIONS, getOcasio } from "@/lib/data";
import { rutaOcasio } from "@/lib/routes";
import { jsonLdMiga, metadataOcasio } from "@/lib/seo";

type Props = { params: Promise<{ ocasio: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return OCASIONS.map((ocasio) => ({ ocasio: ocasio.id }));
}

async function carregaOcasio(params: Props["params"]) {
  const { ocasio } = await params;
  const trobada = getOcasio(ocasio);
  if (!trobada) notFound();
  return trobada;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ocasio = await carregaOcasio(params);
  return metadataOcasio(ocasio.id, ocasio.nom);
}

export default async function Page({ params }: Props) {
  const ocasio = await carregaOcasio(params);
  return (
    <>
      <JsonLd
        dades={jsonLdMiga([
          { nom: "Inici", ruta: "/" },
          { nom: ocasio.nom, ruta: rutaOcasio(ocasio.id) },
        ])}
      />
      <Projectes ocasioId={ocasio.id} />
    </>
  );
}
