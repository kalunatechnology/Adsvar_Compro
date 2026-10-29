import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/crm`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
