import type { Metadata } from "next";
import SectionPageJsonLd from "@/components/seo/SectionPageJsonLd";
import ConsultationPageClient from "@/components/pages/ConsultationPageClient";

export const metadata: Metadata = {
  title: "Free Ads Audit & Strategy Consultation",
  description:
    "Get an in-depth ad account audit, waste spend analysis, and customized 90-day growth roadmap from our senior media buyers at Adsvar.",
  keywords: [
    "free ads audit",
    "ad account audit Jakarta",
    "meta ads waste spend audit",
    "free performance marketing consultation",
    "growth strategy session",
    "audit iklan gratis",
  ],
  alternates: {
    canonical: "/consultation",
  },
  openGraph: {
    title: "Free Ads Audit & Strategy Consultation | Adsvar",
    description:
      "Get an in-depth ad account audit, waste spend analysis, and customized 90-day growth roadmap from our senior media buyers.",
    url: "/consultation",
    locale: "en_US",
  },
  twitter: {
    title: "Free Ads Audit & Strategy Consultation | Adsvar",
    description:
      "Get an in-depth ad account audit, waste spend analysis, and customized 90-day growth roadmap from our senior media buyers.",
  },
};

export default function ConsultationPage() {
  return (
    <>
      <SectionPageJsonLd section="consultation" />
      <ConsultationPageClient />
    </>
  );
}
