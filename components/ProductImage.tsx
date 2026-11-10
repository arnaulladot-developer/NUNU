import Image from "next/image";
import type { Producte } from "@/lib/data";

interface ProductImageProps {
  producte: Producte;
  sizes: string;
  /** Alt buit per a imatges decoratives (quan el nom ja és al costat). */
  decoratiu?: boolean;
}

/**
 * Primera foto d'un producte, per omplir el seu contenidor (que ha de tenir
 * `position: relative`). Si la Núria encara no n'ha facilitat cap, mostra
 * "Foto pendent" en comptes d'una foto d'un altre producte.
 */
export function ProductImage({ producte, sizes, decoratiu = false }: ProductImageProps) {
  const foto = producte.fotos[0];
  if (!foto) {
    return <span className="foto-pendent">Foto pendent</span>;
  }
  return (
    <Image
      src={foto.src}
      alt={decoratiu ? "" : foto.alt}
      fill
      sizes={sizes}
      style={{ objectFit: "cover" }}
    />
  );
}
