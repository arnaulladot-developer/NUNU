import { Botiga } from "@/components/screens/Botiga";
import { JsonLd } from "@/components/JsonLd";
import { getCategoria, type CategoriaId } from "@/lib/data";
import { rutaCategoria } from "@/lib/routes";
import { jsonLdMiga } from "@/lib/seo";

/** Pàgina de categoria compartida per `/flors/[categoria]` i `/nadal/[categoria]`. */
export function PaginaCategoria({ id }: { id: CategoriaId }) {
  const categoria = getCategoria(id);
  return (
    <>
      <JsonLd
        dades={jsonLdMiga([
          { nom: "Inici", ruta: "/" },
          { nom: categoria?.nom ?? "Flors", ruta: rutaCategoria(id) },
        ])}
      />
      <Botiga categoriaId={id} />
    </>
  );
}
