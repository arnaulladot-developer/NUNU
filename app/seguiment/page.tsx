import { Seguiment } from "@/components/screens/Seguiment";
import { metadataPrivada } from "@/lib/seo";

export const metadata = metadataPrivada("Seguiment de la comanda", "/seguiment");

export default function Page() {
  return <Seguiment />;
}
