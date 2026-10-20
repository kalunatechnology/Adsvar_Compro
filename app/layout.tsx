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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adsvar.com";

export const viewport: Viewport = {
  themeColor: "#FF5500",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adsvar | Creative Digital Agency & Production Studio",
    template: "%s | Adsvar",
  },
  description:
    "Scale brand Anda bersama Adsvar. Agensi kreatif dan studio produksi digital spesialis strategi konten AI, video reels berkinerja tinggi, arsitektur brand premium, dan akuisisi audiens terukur.",
  keywords: [
    "Adsvar",
    "Adsvar Digital",
    "Digital Agency Jakarta",
    "Creative Studio Semarang",
    "Video Production Agency",
    "Short-Form Video Reels",
    "AI Content Workflows",
    "Brand Architecture",
    "Performance Marketing",
    "Next.js Web Development",
  ],
  authors: [{ name: "Adsvar Digital", url: siteUrl }],
  creator: "Adsvar Digital",
  publisher: "Adsvar Digital",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Adsvar | Creative Digital Agency & Production Studio",
    description:
      "Scale your brand with AI Powered & Human Crafted social media strategy, video reels, and digital growth.",
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Adsvar Digital",
    images: [
      {
        url: `${siteUrl}/logo_teks.svg`,
        width: 1200,
        height: 630,
        alt: "Adsvar - Your business one stop digital solution",
      },
      {
        url: `${siteUrl}/Adsvar_icon.svg`,
        width: 512,
        height: 512,
        alt: "Adsvar Icon Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adsvar | Creative Digital Agency & Production Studio",
    description:
      "Transforming ideas into high-performance digital experiences, AI-driven content, and scalable brand growth.",
    images: [`${siteUrl}/logo_teks.svg`],
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
      { url: "/Adsvar_icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/Adsvar_icon.svg",
    shortcut: "/Adsvar_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data (WebSite with Sitelinks Searchbox + Organization + SiteNavigationElement + Service Catalog)
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
        ],
        "description":
          "Transform your brand with AI-powered social media strategy and human-crafted video production.",
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
        "logo": `${siteUrl}/Adsvar_icon.svg`,
        "image": `${siteUrl}/logo_teks.svg`,
        "telephone": "+6282322308719",
        "email": "corporate@adsvar.com",
        "priceRange": "IDR 8.000.000 - IDR 22.000.000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Menara Rajawali 26th Floor, Mega Kuningan",
          "addressLocality": "Jakarta Selatan",
          "addressRegion": "DKI Jakarta",
          "postalCode": "12950",
          "addressCountry": "ID",
        },
        "sameAs": [
          "https://instagram.com/adsvar",
          "https://linkedin.com/company/adsvar",
          "https://youtube.com/@adsvar",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Adsvar Capabilities & Scaling Tiers",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI-Powered Content Creation",
                "description":
                  "Synthetic media generation, workflow automation, and custom prompt modeling built around your brand.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Strategic Copywriting",
                "description":
                  "Brand voice formulation, direct-response copy, and viral hook structures that move people to act.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Short-Form Video & Reels",
                "description":
                  "Motion graphics, 4K reel editing, and trend-jacking vertical video engineered for retention.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Brand & Print Design",
                "description":
                  "OOH advertising, event collateral, physical media, and digital branding under one creative system.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "name": "Growth Scale Retainer",
              "price": "18000000",
              "priceCurrency": "IDR",
              "url": `${siteUrl}/#harga`,
            },
            {
              "@type": "Offer",
              "name": "Enterprise All-Rounder",
              "price": "22000000",
              "priceCurrency": "IDR",
              "url": `${siteUrl}/#harga`,
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#sitelinks`,
        "name": "Adsvar Primary Sitelinks",
        "description": "Navigasi utama situs Adsvar Digital",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Layanan Digital & AI Content",
            "description":
              "Layanan pembuatan konten AI, video reels berkinerja tinggi, copywriting strategis, dan arsitektur brand.",
            "url": `${siteUrl}/#layanan`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Paket Harga & Scaling Tiers",
            "description":
              "Pilihan tier scaling bulanan dan tahunan mulai dari Personal Branding hingga Enterprise Custom System.",
            "url": `${siteUrl}/#harga`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Portofolio Proyek & Studi Kasus",
            "description":
              "Koleksi hasil karya nyata, kampanye viral, video reels, dan transformasi brand klien Adsvar.",
            "url": `${siteUrl}/#portofolio`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Tentang Kami & Kantor",
            "description":
              "Informasi kontak kantor Jakarta Menara Rajawali, nomor WhatsApp, email bisnis, dan profil tim Adsvar.",
            "url": `${siteUrl}/#tentang`,
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Book A Consultation",
            "description":
              "Jadwalkan konsultasi transformasi brand dan strategi akuisisi bersama tim konsultan Adsvar.",
            "url": `${siteUrl}/#layanan`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="id" className={`${funnelDisplay.variable} ${readexPro.variable} dark`}>
      <head>
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
