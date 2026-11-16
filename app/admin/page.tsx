import { AdminAcces } from "@/components/screens/AdminAcces";
import { metadataPrivada } from "@/lib/seo";

export const metadata = metadataPrivada("Panell intern", "/admin");

export default function Page() {
  return <AdminAcces />;
}
