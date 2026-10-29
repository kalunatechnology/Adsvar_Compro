// Dynamic Base URL Resolution
const origin = process.env.PUBLIC_ORIGIN_DOMAIN
  ? `https://${process.env.PUBLIC_ORIGIN_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
  : "https://adsvar-compro.vercel.app";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || origin;

/**
 * Entity-First Brand Identity for Adsvar.
 * Follows enterprise Knowledge Graph & Organization Schema (schema.org) standards
 * aligned with the Arsalynk and Artic Analytica ecosystems.
 */
export const BRAND = {
  name: "Adsvar",
  legalName: "PT Sinergi Muda Arsa",
  tagline: "Performance Ads Agency + Creative Engine",
  url: SITE_URL,
  alternateNames: [
    "Adsvar",
    "Adsvar Digital",
    "Adsvar Agency",
    "Adsvar Digital Agency",
    "Adsvar Production Studio",
    "PT Sinergi Muda Arsa",
    "adsvar.id",
  ],
  phone: "+62-823-2230-8719",
  email: "corporate@adsvar.id",
  founder: "Rian Destianto",
  foundingDate: "2024",
  areaServed: ["ID", "Global"],
  logo: `${SITE_URL}/icon-512x512.png`,
  favicon: `${SITE_URL}/icon.svg`,
  heroImage: `${SITE_URL}/og-image.png`,
  priceRange: "IDR 4,900,000 - IDR 14,900,000",
  social: {
    instagram: "https://instagram.com/adsvar.digital",
    linkedin: "https://linkedin.com/company/adsvar",
    youtube: "https://youtube.com/@adsvar",
    facebook: "https://facebook.com/adsvar",
    twitter: "https://twitter.com/adsvar",
  },
  address: {
    streetAddress: "Menara Rajawali 26th Floor, Mega Kuningan",
    addressLocality: "Jakarta Selatan",
    addressRegion: "DKI Jakarta",
    postalCode: "12950",
    addressCountry: "ID",
  },
  geo: {
    latitude: -6.2297,
    longitude: 106.8294,
  },
  knowsAbout: [
    "Performance Marketing & Paid Advertising",
    "Meta Ads Management (Facebook & Instagram Ads)",
    "Google Ads & Search Engine Marketing (SEM)",
    "TikTok Shop GMV Max & Affiliate Ads",
    "Shopee Ads & Marketplace Growth",
    "Creative Production Engine & Direct Response Video",
    "Conversion Rate Optimization (CRO) & Funnel Architecture",
    "ROAS Scaling & Multi-Touch Attribution",
    "Digital Ad Account Audit & Waste Spend Elimination",
    "E-commerce Growth Strategy & Brand Scaling",
  ],
} as const;

export type BrandIdentity = typeof BRAND;

