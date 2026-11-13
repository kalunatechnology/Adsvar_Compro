import type { Metadata } from "next";
import { pricingRepo } from "@/lib/repositories/pricing";
import SectionPageJsonLd from "@/components/seo/SectionPageJsonLd";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND } from "@/lib/seo/brand";
import PackagesPageClient from "@/components/pages/PackagesPageClient";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Transparent monthly ad management packages from Starter to Scaling with zero hidden fees and no long-term lock-in by Adsvar Digital.",
  keywords: [
    "Adsvar pricing",
    "ad agency monthly pricing",
    "Meta ads management cost",
    "Google Ads agency retainer",
    "TikTok shop marketing packages",
    "transparent performance marketing price",
    "jasa kelola iklan bulanan",
  ],
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Pricing & Advertising Packages | Adsvar",
    description:
      "Transparent monthly ad management packages from Starter to Scaling with zero hidden fees and no long-term lock-in.",
    url: "/packages",
    locale: "en_US",
  },
  twitter: {
    title: "Pricing & Advertising Packages | Adsvar",
    description:
      "Transparent monthly ad management packages from Starter to Scaling with zero hidden fees and no long-term lock-in.",
  },
};

export default function PackagesPage() {
  const pricingPlans = pricingRepo.list();

  const packagesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BRAND.url}/packages#package-list`,
    name: "Adsvar Monthly Advertising Packages",
    itemListElement: pricingPlans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        "@id": `${BRAND.url}/packages#plan-${plan.id}`,
        name: plan.name,
        price: plan.priceMonthly,
        priceCurrency: "IDR",
        description: plan.description || `Adsvar ${plan.name} performance management package`,
        seller: {
          "@id": `${BRAND.url}/#organization`,
        },
      },
    })),
  };

  return (
    <>
      <SectionPageJsonLd section="packages" />
      <JsonLd id="packages-catalog-schema" data={packagesCatalogSchema} />
      <PackagesPageClient initialPlans={pricingPlans} />
    </>
  );
}

