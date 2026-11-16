"use client";

import { Admin } from "@/components/screens/Admin";
import { Seguiment } from "@/components/screens/Seguiment";
import { useBotiga } from "@/context/botiga";

/**
 * Sense sessió oberta no es pinta el panell (ADR-014). No és una mesura de
 * seguretat -- la comprovació és al navegador -- sinó la garantia que
 * recarregar la pàgina no hi deixi ningú a dins.
 */
export function AdminAcces() {
  const { sessioAdmin } = useBotiga();
  return sessioAdmin ? <Admin /> : <Seguiment />;
}
