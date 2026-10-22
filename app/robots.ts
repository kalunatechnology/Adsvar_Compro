import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const origin = process.env.PUBLIC_ORIGIN_DOMAIN
    ? `https://${process.env.PUBLIC_ORIGIN_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
    : "https://adsvar-compro.vercel.app";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

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
        ],
        disallow: ["/api/*", "/_next/*", "/crm*", "/crm/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/*", "/crm*", "/crm/*"],
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
          "/extracted/*",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/*", "/crm*", "/crm/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
