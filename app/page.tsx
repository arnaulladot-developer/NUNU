"use client";

import { NavigationProvider, useNavigation } from "@/context/navigation";
import { CartProvider } from "@/context/cart";
import { Inici } from "@/components/screens/Inici";
import { Botiga } from "@/components/screens/Botiga";
import { Fitxa } from "@/components/screens/Fitxa";
import { Projectes } from "@/components/screens/Projectes";
import { ProjecteDetall } from "@/components/screens/ProjecteDetall";
import { Contacte } from "@/components/screens/Contacte";
import { Seguiment } from "@/components/screens/Seguiment";
import { Cistella } from "@/components/screens/Cistella";

/**
 * Nomes es munta la pantalla activa (a diferència de la maqueta HTML
 * original, que mantenia les set amagades amb `display:none`): menys DOM
 * i menys imatges carregades d'entrada, que ajuda directament l'LCP.
 */
function ScreenRouter() {
  const { screen } = useNavigation();

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
    case "cistella":
      return <Cistella />;
    default:
      return <Inici />;
  }
}

export default function Page() {
  return (
    <NavigationProvider>
      <CartProvider>
        <ScreenRouter />
      </CartProvider>
    </NavigationProvider>
  );
}
