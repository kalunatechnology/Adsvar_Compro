import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/brand";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/favicon.ico",
          "/favicon-48x48.png",
          "/favicon-96x96.png",
          "/apple-touch-icon.png",
          "/icon.svg",
          "/icon-192x192.png",
          "/icon-512x512.png",
          "/og-image.png",
          "/portfolio/*",
          "/b76c10e5d4a63b7890a5463e71524f8b.txt",
        ],
        disallow: ["/api/*", "/_next/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/*"],
      },
      {
        userAgent: "Googlebot-Favicon",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: [
          "/",
          "/favicon.ico",
          "/favicon-48x48.png",
          "/favicon-96x96.png",
          "/apple-touch-icon.png",
          "/icon.svg",
          "/icon-192x192.png",
          "/icon-512x512.png",
          "/og-image.png",
          "/portfolio/*",
          "/extracted/*",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
