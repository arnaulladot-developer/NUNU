import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";

export const metadata: Metadata = {
  title: "Pàgina no trobada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section>
      <SiteHeader />
      <div className="contenidor">
        <div className="estat-buit">
          <h1>No trobem aquesta pàgina</h1>
          <p>L&apos;adreça pot estar mal escrita o la pàgina ja no existeix.</p>
          <NavLink to="botiga" className="boto boto-principal">
            Anar a la botiga
          </NavLink>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}
