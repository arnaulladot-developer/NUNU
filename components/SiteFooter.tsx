import Image from "next/image";
import { NavLink } from "@/components/NavLink";
import { CONTACTE } from "@/lib/data";

interface SiteFooterProps {
  /** "inici" fa servir la graella a tres columnes; la resta, la barra simple. */
  variant?: "simple" | "inici";
}

export function SiteFooter({ variant = "simple" }: SiteFooterProps) {
  if (variant === "inici") {
    return (
      <footer className="site-footer site-footer--inici">
        <div className="contenidor site-footer-graella">
          <div className="site-footer-marca">
            <NavLink to="inici" className="marca-nom">
              <Image
                src="/assets/logo.jpg"
                alt="Nunu Flowers"
                width={44}
                height={44}
              />
            </NavLink>
            <p>Flor seca composta a mà al Penedès.</p>
          </div>
          <nav className="site-footer-nav" aria-label="Peu de pàgina">
            <NavLink to="botiga">Flors</NavLink>
            <NavLink to="projectes">Ocasions</NavLink>
            <NavLink to="fires">Fires</NavLink>
            <NavLink to="contacte">Contacte</NavLink>
            <NavLink to="seguiment">Seguiment de la comanda</NavLink>
          </nav>
          <div className="site-footer-contacte">
            <a href={`mailto:${CONTACTE.correu}`}>{CONTACTE.correu}</a>
            <a href={CONTACTE.telefonHref}>{CONTACTE.telefon}</a>
            <a
              href={CONTACTE.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram {CONTACTE.instagram}
            </a>
          </div>
        </div>
        <div className="contenidor site-footer-legal">
          <span>© Nunu Flowers — Núria Roura Ortega</span>
          <span>
            Núria Roura Ortega · NIF pendent d&apos;alta fiscal · Condicions
            de venda i dret de desistiment pendents de publicar
          </span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <span>© Nunu Flowers — Núria Roura Ortega</span>
      <span>
        {CONTACTE.correu} · {CONTACTE.telefon} · Instagram {CONTACTE.instagram}
      </span>
    </footer>
  );
}
