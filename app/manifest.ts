import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adsvar | Creative Digital Agency & Production Studio",
    short_name: "Adsvar",
    description:
      "Scale brand Anda bersama Adsvar. Agensi kreatif dan studio produksi digital spesialis strategi konten AI, video reels berkinerja tinggi, arsitektur brand premium, dan akuisisi audiens terukur.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080C",
    theme_color: "#FF5500",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
