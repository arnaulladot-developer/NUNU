import { Projectes } from "@/components/screens/Projectes";
import { metadataOcasions } from "@/lib/seo";

export const metadata = metadataOcasions();

export default function Page() {
  return <Projectes />;
}
