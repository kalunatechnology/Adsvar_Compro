import type { Metadata } from "next";
import { servicesRepo } from "@/lib/repositories/services";
import { pricingRepo } from "@/lib/repositories/pricing";
import SectionPageJsonLd from "@/components/seo/SectionPageJsonLd";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND } from "@/lib/seo/brand";
import ServicesPageClient from "@/components/pages/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-funnel paid advertising on Meta, Google, TikTok, GMV Max, and Shopee with a built-in creative production engine by Adsvar in Jakarta.",
  keywords: [
    "Adsvar services",
    "Meta Ads management",
    "Google Ads agency",
    "TikTok Shop GMV Max agency",
    "Shopee Ads management",
    "paid advertising services Jakarta",
    "direct response creative agency",
    "performance marketing agency Indonesia",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Performance Ads & Creative Services | Adsvar",
    description:
      "Full-funnel paid advertising on Meta, Google, TikTok, GMV Max, and Shopee with a built-in creative production engine.",
    url: "/services",
    locale: "en_US",
  },
  twitter: {
    title: "Performance Ads & Creative Services | Adsvar",
    description:
      "Full-funnel paid advertising on Meta, Google, TikTok, GMV Max, and Shopee with a built-in creative production engine.",
  },
};

export default function ServicesPage() {
  const services = servicesRepo.list();
  const pricingPlans = pricingRepo.list();

  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BRAND.url}/services#service-list`,
    name: "Adsvar Performance Advertising Capabilities",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${BRAND.url}/services#service-${service.slug || service.id}`,
        name: service.name,
        description: service.description,
        provider: {
          "@id": `${BRAND.url}/#organization`,
        },
        areaServed: ["ID", "Global"],
      },
    })),
  };

  return (
    <>
      <SectionPageJsonLd section="services" />
      <JsonLd id="services-catalog-schema" data={serviceCatalogSchema} />
      <ServicesPageClient initialServices={services} initialPlans={pricingPlans} />
    </>
  );
}
