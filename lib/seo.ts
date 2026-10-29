import { BRAND, SITE_URL } from "@/lib/seo/brand";

/**
 * 6 Primary Sitelinks for Adsvar Digital Agency (Google SERP 6-Pack Sitelinks Target).
 * Descriptions are concise (110–140 characters) so Google displays them
 * cleanly as 2-line snippets without truncation (...).
 * Built according to enterprise SEO architecture (Arsalynk & Artic Analytica standard).
 */
export const SITE_NAVIGATION_ITEMS = [
  {
    name: "Services",
    href: "/#layanan",
    description:
      "Full-funnel paid advertising on Meta, Google, TikTok, GMV Max, and Shopee with a built-in creative production engine.",
  },
  {
    name: "Pricing & Packages",
    href: "/#paket",
    description:
      "Transparent monthly ad management packages from Starter to Scaling with zero hidden fees and no long-term lock-in.",
  },
  {
    name: "Work & Case Studies",
    href: "/#portofolio",
    description:
      "Explore verified client track records, real revenue scaling, and high-converting creative case studies across top brands.",
  },
  {
    name: "About Adsvar",
    href: "/#tentang",
    description:
      "Performance marketing agency combining ruthless analytical media buying with high-volume creative production in Jakarta.",
  },
  {
    name: "Free Ads Audit",
    href: "/#konsultasi",
    description:
      "Get an in-depth ad account audit, waste spend analysis, and customized 90-day growth roadmap from our senior media buyers.",
  },
  {
    name: "Client CRM & Portal",
    href: "/crm",
    description:
      "Real-time client lead tracking, inquiry management, and transparent campaign communication pipeline via secure SQLite CRM.",
  },
] as const;

export type NavigationItem = (typeof SITE_NAVIGATION_ITEMS)[number];

export type BreadcrumbItem = {
  name: string;
  path?: string;
  url?: string;
  href?: string;
};

/**
 * Builds standardized BreadcrumbList Schema for Google Search Console & SERP.
 */
export function buildBreadcrumbJsonLd(items?: BreadcrumbItem[]) {
  const defaultItems: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#layanan" },
    { name: "Pricing & Packages", path: "/#paket" },
    { name: "Portfolio & Case Studies", path: "/#portofolio" },
    { name: "About Adsvar", path: "/#tentang" },
  ];

  const sourceItems = items && items.length > 0 ? items : defaultItems;
  const hasHome =
    sourceItems[0]?.name.toLowerCase() === "home" ||
    sourceItems[0]?.path === "/" ||
    sourceItems[0]?.href === "/";
  const allItems: BreadcrumbItem[] = hasHome
    ? sourceItems
    : [{ name: "Home", path: "/" }, ...sourceItems];

  return {
    "@type": "BreadcrumbList",
    "@id": `${BRAND.url}/#breadcrumb`,
    itemListElement: allItems.map((item, index) => {
      const path = item.path ?? item.href ?? "";
      const targetUrl = item.url
        ? item.url
        : path.startsWith("http")
        ? path
        : `${BRAND.url}${path === "/" ? "" : path}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: targetUrl,
      };
    }),
  };
}

/**
 * Builds SiteNavigationElement Schema specifically designed to guide Googlebot
 * into forming the structured 6-Pack Sitelinks SERP snippet layout.
 */
export function buildSiteNavigationElementJsonLd() {
  return SITE_NAVIGATION_ITEMS.map((item) => ({
    "@type": "SiteNavigationElement",
    "@id": `${BRAND.url}${item.href}#navigation`,
    name: item.name,
    url: `${BRAND.url}${item.href}`,
    description: item.description,
  }));
}

/**
 * Builds Organization & Corporation Schema Root Entity with stable @id graph.
 */
export function buildOrganizationJsonLd() {
  return {
    "@type": ["Organization", "Corporation", "ProfessionalService"],
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    alternateName: BRAND.alternateNames,
    url: BRAND.url,
    foundingDate: BRAND.foundingDate,
    founder: {
      "@type": "Person",
      name: BRAND.founder,
      jobTitle: "Founder & Chief Executive Officer",
      url: `${BRAND.url}/#tentang`,
    },
    member: [
      {
        "@type": "Person",
        name: "Rian Destianto",
        jobTitle: "Founder & Chief Executive Officer",
        url: `${BRAND.url}/#tentang`,
      },
    ],
    logo: {
      "@type": "ImageObject",
      "@id": `${BRAND.url}/#logo`,
      url: BRAND.logo,
      caption: BRAND.name,
    },
    image: BRAND.heroImage,
    description:
      "Adsvar runs your Meta, Google, TikTok, GMV Max, and Shopee ads, with built-in high-volume creative production engine and transparent pricing.",
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: BRAND.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.streetAddress,
      addressLocality: BRAND.address.addressLocality,
      addressRegion: BRAND.address.addressRegion,
      postalCode: BRAND.address.postalCode,
      addressCountry: BRAND.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BRAND.geo.latitude,
      longitude: BRAND.geo.longitude,
    },
    areaServed: BRAND.areaServed,
    serviceType: [
      "Meta Ads Management",
      "Google Ads & Search Engine Marketing",
      "TikTok Ads & Creator Production",
      "TikTok Shop GMV Max Optimization",
      "Shopee Ads & Marketplace Acceleration",
      "Direct Response Creative Production",
      "Conversion Rate Optimization (CRO)",
      "ROAS Scaling Strategy",
    ],
    sameAs: [
      BRAND.social.instagram,
      BRAND.social.linkedin,
      BRAND.social.youtube,
      BRAND.social.facebook,
      BRAND.social.twitter,
    ].filter(Boolean),
    knowsAbout: BRAND.knowsAbout,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BRAND.phone,
        contactType: "customer service",
        areaServed: ["ID", "Global"],
        availableLanguage: ["English", "Indonesian"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: buildOfferCatalogJsonLd(),
  };
}

/**
 * Builds OfferCatalog Schema representing the core advertising platforms and capabilities.
 */
export function buildOfferCatalogJsonLd() {
  return {
    "@type": "OfferCatalog",
    name: "Adsvar Performance Ads & Creative Engine Capabilities",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BRAND.url}/#service-meta`,
          name: "Meta Ads (Facebook & Instagram)",
          description:
            "Facebook and Instagram ads that find new buyers, bring back past visitors, and drive profitable conversions.",
          provider: { "@id": `${BRAND.url}/#organization` },
          url: `${BRAND.url}/#layanan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BRAND.url}/#service-google`,
          name: "Google Ads (Search & Performance Max)",
          description:
            "Show up on Google the moment people search for what you offer, with full conversion tracking and keyword bid tuning.",
          provider: { "@id": `${BRAND.url}/#organization` },
          url: `${BRAND.url}/#layanan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BRAND.url}/#service-tiktok`,
          name: "TikTok Ads & Spark Ads",
          description:
            "Short-form video ads driving traffic to website or leads, with creatives refreshed continuously to beat ad fatigue.",
          provider: { "@id": `${BRAND.url}/#organization` },
          url: `${BRAND.url}/#layanan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BRAND.url}/#service-gmvmax`,
          name: "TikTok Shop GMV Max",
          description:
            "Automated TikTok Shop ads with targets built on margin, LIVE schedule synchronization, and affiliate curation.",
          provider: { "@id": `${BRAND.url}/#organization` },
          url: `${BRAND.url}/#layanan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BRAND.url}/#service-shopee`,
          name: "Shopee Ads",
          description:
            "Push products up Shopee search results with automated bid tuning, twin-date vouchers, and high ROAS profitability.",
          provider: { "@id": `${BRAND.url}/#organization` },
          url: `${BRAND.url}/#layanan`,
        },
      },
    ],
  };
}

/**
 * Builds WebSite Schema with publisher connection, hasPart sitelinks mapping,
 * and SearchAction Sitelinks Searchbox (Google & Apple enterprise standard).
 */
export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${BRAND.url}/#website`,
    url: `${BRAND.url}/`,
    name: BRAND.name,
    alternateName: BRAND.alternateNames,
    description:
      "Adsvar runs your Meta, Google, TikTok, GMV Max, and Shopee ads, with built-in creative production engine and transparent pricing.",
    publisher: {
      "@id": `${BRAND.url}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BRAND.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    hasPart: SITE_NAVIGATION_ITEMS.map((item) => ({
      "@type": "WebPage",
      "@id": `${BRAND.url}${item.href}#webpage`,
      name: item.name,
      url: `${BRAND.url}${item.href}`,
      description: item.description,
    })),
  };
}

/**
 * Builds the complete unified Schema Graph (@graph) linking all entities.
 */
export function buildFullGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteJsonLd(),
      buildOrganizationJsonLd(),
      {
        "@type": "ItemList",
        "@id": `${BRAND.url}/#sitelinks`,
        name: "Adsvar Primary Sitelinks",
        description: "Primary site navigation structure for Adsvar Digital",
        itemListElement: buildSiteNavigationElementJsonLd(),
      },
      buildBreadcrumbJsonLd(),
    ],
  };
}

