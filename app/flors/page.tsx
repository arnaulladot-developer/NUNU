import { Botiga } from "@/components/screens/Botiga";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdMiga, metadataFlors } from "@/lib/seo";

export const metadata = metadataFlors();

export default function Page() {
  return (
    <>
      <JsonLd
        dades={jsonLdMiga([
          { nom: "Inici", ruta: "/" },
          { nom: "Flors", ruta: "/flors" },
        ])}
      />
      <Botiga />
    </>
  );
}
