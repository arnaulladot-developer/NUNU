import { redirect } from "next/navigation";
import { rutaCategoria } from "@/lib/routes";

/** "Nadal" és un desplegable del menú, no una pàgina: porta als rams de Nadal. */
export default function Page() {
  redirect(rutaCategoria("nadal-rams"));
}
