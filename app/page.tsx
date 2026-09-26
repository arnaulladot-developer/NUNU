"use client";

import { NavigationProvider, useNavigation } from "@/context/navigation";
import { CartProvider } from "@/context/cart";
import { BotigaProvider, useBotiga } from "@/context/botiga";
import { Inici } from "@/components/screens/Inici";
import { Botiga } from "@/components/screens/Botiga";
import { Fitxa } from "@/components/screens/Fitxa";
import { Projectes } from "@/components/screens/Projectes";
import { ProjecteDetall } from "@/components/screens/ProjecteDetall";
import { Contacte } from "@/components/screens/Contacte";
import { Seguiment } from "@/components/screens/Seguiment";
import { Admin } from "@/components/screens/Admin";
import { CistellaCalaix } from "@/components/CistellaCalaix";

/**
 * Nomes es munta la pantalla activa (a diferència de la maqueta HTML
 * original, que mantenia les set amagades amb `display:none`): menys DOM
 * i menys imatges carregades d'entrada, que ajuda directament l'LCP.
 */
function ScreenRouter() {
  const { screen } = useNavigation();
  const { sessioAdmin } = useBotiga();

  switch (screen) {
    case "inici":
      return <Inici />;
    case "botiga":
      return <Botiga />;
    case "fitxa":
      return <Fitxa />;
    case "projectes":
      return <Projectes />;
    case "projecte-detall":
      return <ProjecteDetall />;
    case "contacte":
      return <Contacte />;
    case "seguiment":
      return <Seguiment />;
    case "admin":
      // Sense sessió oberta no es pinta el panell (ADR-014). No és una
      // mesura de seguretat -- la comprovació és al navegador -- sinó la
      // garantia que recarregar la pàgina no hi deixi ningú a dins.
      return sessioAdmin ? <Admin /> : <Seguiment />;
    default:
      return <Inici />;
  }
}

/**
 * La cistella ja no és un cas d'aquest switch (ADR-008, arquitectura.md):
 * es munta sempre, per sobre de la pantalla activa, i el seu propi estat
 * obert/tancat (context/cart.tsx) decideix si es veu.
 */
export default function Page() {
  return (
    <NavigationProvider>
      <BotigaProvider>
        <CartProvider>
          <ScreenRouter />
          <CistellaCalaix />
        </CartProvider>
      </BotigaProvider>
    </NavigationProvider>
  );
}
