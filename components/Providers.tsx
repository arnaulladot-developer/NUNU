"use client";

import type { ReactNode } from "react";
import { NavigationProvider } from "@/context/navigation";
import { CartProvider } from "@/context/cart";
import { BotigaProvider } from "@/context/botiga";
import { CistellaCalaix } from "@/components/CistellaCalaix";

/**
 * Estat de client compartit per totes les pàgines. Viu al layout, així la
 * cistella i el seu calaix sobreviuen a la navegació entre pàgines (ADR-008:
 * el calaix es munta una sola vegada, per sobre de la pàgina activa).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <NavigationProvider>
      <BotigaProvider>
        <CartProvider>
          {children}
          <CistellaCalaix />
        </CartProvider>
      </BotigaProvider>
    </NavigationProvider>
  );
}
