import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF primer, WebP de reserva: menys bytes per foto, i els bytes són el
    // que gasta els crèdits del host.
    formats: ["image/avif", "image/webp"],
    // Les fotos del catàleg no canvien de contingut sota el mateix nom: si la
    // Núria en facilita una de nova, s'ha de desar amb un nom de fitxer nou,
    // perquè no hi ha manera d'invalidar la memòria cau d'imatges.
    minimumCacheTTL: 2678400,
    // Una sola qualitat: evita que es generin variants de més.
    qualities: [70],
    // Sense els salts de 2048 i 3840 px, que només servirien a pantalles 4K.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
