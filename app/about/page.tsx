import type { Metadata } from "next";
import { statsRepo } from "@/lib/repositories/stats";
import SectionPageJsonLd from "@/components/seo/SectionPageJsonLd";
import AboutPageClient from "@/components/pages/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Performance marketing agency combining ruthless analytical media buying with high-volume creative production in Jakarta.",
  keywords: [
    "About Adsvar",
    "Adsvar Digital Agency",
    "performance agency Jakarta",
    "creative production engine team",
    "Menara Rajawali Jakarta performance agency",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Performance marketing agency combining ruthless analytical media buying with high-volume creative production in Jakarta.",
    url: "/about",
    locale: "en_US",
  },
  twitter: {
    title: "About Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Performance marketing agency combining ruthless analytical media buying with high-volume creative production in Jakarta.",
  },
};

export default function AboutPage() {
  const stats = statsRepo.list();

  return (
    <>
      <SectionPageJsonLd section="about" />
      <AboutPageClient initialStats={stats} />
    </>
  );
}
