import type { Metadata } from "next";
import { projectsRepo } from "@/lib/repositories/projects";
import SectionPageJsonLd from "@/components/seo/SectionPageJsonLd";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND } from "@/lib/seo/brand";
import PortfolioPageClient from "@/components/pages/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Explore verified client track records, real revenue scaling, and high-converting creative case studies across top brands by Adsvar.",
  keywords: [
    "Adsvar portfolio",
    "performance ads case studies",
    "PorTres Padel Arena",
    "SIRNAS Padel Jawa Tengah",
    "Acintya Kebaya",
    "e-commerce ROAS case studies Indonesia",
    "creative production portfolio",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Work & Advertising Case Studies | Adsvar",
    description:
      "Explore verified client track records, real revenue scaling, and high-converting creative case studies across top brands.",
    url: "/portfolio",
    locale: "en_US",
  },
  twitter: {
    title: "Work & Advertising Case Studies | Adsvar",
    description:
      "Explore verified client track records, real revenue scaling, and high-converting creative case studies across top brands.",
  },
};

export default function PortfolioPage() {
  const projects = projectsRepo.list();

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BRAND.url}/portfolio#project-list`,
    name: "Adsvar Portfolio & Client Case Studies",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${BRAND.url}/portfolio#project-${project.slug || project.id}`,
        name: project.title,
        description: project.description || `Case study for ${project.client || project.title}`,
        creator: {
          "@id": `${BRAND.url}/#organization`,
        },
      },
    })),
  };

  return (
    <>
      <SectionPageJsonLd section="portfolio" />
      <JsonLd id="portfolio-catalog-schema" data={portfolioSchema} />
      <PortfolioPageClient initialProjects={projects} />
    </>
  );
}

