import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const funnelDisplay = localFont({
  src: "./fonts/FunnelDisplay-Variable.ttf",
  variable: "--font-funnel-display",
  display: "swap",
});

const readexPro = localFont({
  src: "./fonts/ReadexPro-Variable.ttf",
  variable: "--font-readex-pro",
  display: "swap",
});

// Dynamic Base URL Resolution
const origin = process.env.PUBLIC_ORIGIN_DOMAIN
  ? `https://${process.env.PUBLIC_ORIGIN_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
  : "https://adsvar-compro.vercel.app";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

export const viewport: Viewport = {
  themeColor: "#FF5500",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adsvar | Meta, Google, TikTok Shop & Shopee Ads Agency",
    template: "%s | Adsvar",
  },
  description:
    "Adsvar runs your Meta, Google, TikTok, GMV Max, and Shopee ads, and can make the creatives too. Choose Ads Only or Ads + Content, with transparent pricing from IDR 4.9M a month.",
  keywords: [
    "Meta ads agency Indonesia",
    "Google Ads agency Indonesia",
    "TikTok Shop GMV Max agency",
    "Shopee ads agency",
    "jasa iklan Meta Ads",
    "jasa GMV Max TikTok Shop",
    "jasa Shopee Ads",
    "Adsvar",
    "Performance Marketing Indonesia",
  ],
  authors: [{ name: "Adsvar Digital Agency", url: siteUrl }],
  creator: "Adsvar Digital Agency",
  publisher: "Adsvar Digital Agency",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Ads that run. Content that sells. Meta, Google, TikTok Shop GMV Max, and Shopee Ads, handled by one team.",
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Adsvar Digital Agency",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Adsvar | Performance Ads Agency + Creative Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Ads that run. Content that sells. Meta, Google, TikTok Shop GMV Max, and Shopee Ads, handled by one team.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@adsvar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    other: [
      { rel: "mask-icon", url: "/icon.svg", color: "#FF5500" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data Suite (WebSite, Organization, Sitelinks, FAQPage, BreadcrumbList)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Adsvar",
        "alternateName": [
          "Adsvar Digital",
          "Adsvar Agency",
          "Adsvar Production Studio",
          "PT Sinergi Muda Arsa",
        ],
        "description":
          "Adsvar runs your Meta, Google, TikTok, GMV Max, and Shopee ads, and can make the creatives too. Choose Ads Only or Ads + Content, with transparent pricing from IDR 4.9M a month.",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "inLanguage": "id-ID",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        "name": "Adsvar Digital Agency",
        "url": siteUrl,
        "logo": `${siteUrl}/icon-512x512.png`,
        "image": `${siteUrl}/og-image.png`,
        "telephone": "+6282322308719",
        "email": "corporate@adsvar.id",
        "priceRange": "IDR 4.900.000 - IDR 14.900.000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Menara Rajawali 26th Floor, Mega Kuningan",
          "addressLocality": "Jakarta Selatan",
          "addressRegion": "DKI Jakarta",
          "postalCode": "12950",
          "addressCountry": "ID",
        },
        "sameAs": [
          "https://instagram.com/adsvar.digital",
          "https://linkedin.com/company/adsvar",
          "https://youtube.com/@adsvar",
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "48",
          "bestRating": "5",
          "worstRating": "1",
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Adsvar Performance Ads & Content Capabilities",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Meta Ads (Facebook & Instagram)",
                "description":
                  "Facebook and Instagram ads that find new buyers, bring back past visitors, and drive conversions.",
                "url": `${siteUrl}/#harga`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Google Ads",
                "description":
                  "Show up on Google the moment people search for what you offer, with full conversion tracking.",
                "url": `${siteUrl}/#harga`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "TikTok Ads",
                "description":
                  "Short-form video ads driving traffic to website or leads, with creatives refreshed regularly.",
                "url": `${siteUrl}/#harga`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "TikTok Shop GMV Max",
                "description":
                  "Automated TikTok Shop ads with targets built on margin and affiliate curation.",
                "url": `${siteUrl}/#harga`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Shopee Ads",
                "description":
                  "Push products up Shopee search with adjusted bids and profitable ad spend.",
                "url": `${siteUrl}/#harga`,
              },
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#sitelinks`,
        "name": "Adsvar Primary Sitelinks",
        "description": "Navigasi utama struktur situs Adsvar Digital",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Services",
            "description": "One Ads and Content Solution.",
            "url": `${siteUrl}/#layanan`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Packages",
            "description": "Pick your track. Scale at your pace.",
            "url": `${siteUrl}/#harga`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Work",
            "description": "Every campaign is judged by what it delivers.",
            "url": `${siteUrl}/#portofolio`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "About",
            "description": "Menara Rajawali 26th Floor, Mega Kuningan, Jakarta.",
            "url": `${siteUrl}/#tentang`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Book a Free Consultation",
            "description": "Get a free ads audit and strategy consultation.",
            "url": `${siteUrl}/#tentang`,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${siteUrl}/#layanan`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Packages",
            "item": `${siteUrl}/#harga`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Work",
            "item": `${siteUrl}/#portofolio`,
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "About",
            "item": `${siteUrl}/#tentang`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="id" className={`${funnelDisplay.variable} ${readexPro.variable} dark`}>
      <head>
        {/* Explicit Favicon Tags for Googlebot-Image & Web Standards */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" sizes="any" href="/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#08080C] text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
