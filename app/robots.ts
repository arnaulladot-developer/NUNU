import type { MetadataRoute } from "next";
import { INDEXABLE, urlAbsoluta } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/seguiment"] },
    sitemap: urlAbsoluta("/sitemap.xml"),
  };
}
