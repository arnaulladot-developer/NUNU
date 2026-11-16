import { Fires } from "@/components/screens/Fires";
import { metadataFires } from "@/lib/seo";

export const metadata = metadataFires();

export default function Page() {
  return <Fires />;
}
