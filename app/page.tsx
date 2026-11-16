import type { Metadata } from "next";
import { Inici } from "@/components/screens/Inici";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Inici />;
}
