import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.PUBLIC_ORIGIN_DOMAIN
    ? `https://${process.env.PUBLIC_ORIGIN_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
    : "https://adsvar-compro.vercel.app";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
  const now = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
