import JsonLd from "@/components/seo/JsonLd";
import { BRAND } from "@/lib/seo/brand";

/**
 * Standardized Schema configuration for Adsvar Sitelinks canonical pages.
 * Fully compliant with Google Search Central Sitelinks & Breadcrumb specifications.
 */
const SECTIONS = {
  services: {
    path: "/services",
    title: "Services",
    type: "ItemPage",
    description:
      "Full-funnel paid advertising on Meta, Google, TikTok, GMV Max, and Shopee with a built-in creative production engine.",
    ancestors: [] as { name: string; path: string }[],
  },
  packages: {
    path: "/packages",
    title: "Pricing & Packages",
    type: "ItemPage",
    description:
      "Transparent monthly ad management packages from Starter to Scaling with zero hidden fees and no long-term lock-in.",
    ancestors: [] as { name: string; path: string }[],
  },
  portfolio: {
    path: "/portfolio",
    title: "Work & Case Studies",
    type: "CollectionPage",
    description:
      "Explore verified client track records, real revenue scaling, and high-converting creative case studies across top brands.",
    ancestors: [] as { name: string; path: string }[],
  },
  about: {
    path: "/about",
    title: "About Adsvar",
    type: "AboutPage",
    description:
      "Performance marketing agency combining ruthless analytical media buying with high-volume creative production in Jakarta.",
    ancestors: [] as { name: string; path: string }[],
  },
  consultation: {
    path: "/consultation",
    title: "Free Ads Audit",
    type: "ContactPage",
    description:
      "Get an in-depth ad account audit, waste spend analysis, and customized 90-day growth roadmap from our senior media buyers.",
    ancestors: [] as { name: string; path: string }[],
  },
  contact: {
    path: "/contact",
    title: "Contact Us",
    type: "ContactPage",
    description:
      "Get in touch with Adsvar performance marketing team, request partnership proposals, or connect with our media buying leads.",
    ancestors: [] as { name: string; path: string }[],
  },
} as const;

export type SectionKey = keyof typeof SECTIONS;

export default function SectionPageJsonLd({ section }: { section: SectionKey }) {
  const page = SECTIONS[section];
  const url = `${BRAND.url}${page.path}`;
  const crumbs = [
    { name: "Home", path: "/" },
    ...page.ancestors,
    { name: page.title, path: page.path },
  ];

  return (
    <JsonLd
      id={`section-schema-${section}`}
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: crumbs.map(({ name, path }, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
              item: `${BRAND.url}${path === "/" ? "" : path}`,
            })),
          },
          {
            "@type": page.type,
            "@id": `${url}#webpage`,
            url,
            name: `${page.title} | ${BRAND.name}`,
            description: page.description,
            isPartOf: {
              "@id": `${BRAND.url}/#website`,
            },
            about: {
              "@id": `${BRAND.url}/#organization`,
            },
            breadcrumb: {
              "@id": `${url}#breadcrumb`,
            },
            inLanguage: "en-US",
          },
        ],
      }}
    />
  );
}

