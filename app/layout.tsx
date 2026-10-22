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
    default: "Adsvar | Creative Digital Agency & AI Production Studio",
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
    "Social Media Strategy",
    "Next.js Web Development",
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
    title: "Adsvar | Creative Digital Agency & AI Production Studio",
    description:
      "Scale your brand with AI-powered social media strategy, viral short-form video reels, brand architecture, and scalable digital acquisition.",
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
        alt: "Adsvar - Creative Digital Agency & AI Production Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adsvar | Creative Digital Agency & AI Production Studio",
    description:
      "Transforming ideas into high-performance digital experiences, AI-driven content, viral short-form reels, and scalable brand growth.",
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
          "Transform your brand with AI-powered social media strategy, viral video reels, and performance brand architecture.",
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
          "name": "Adsvar Capabilities & Scaling Tiers",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI-Powered Content Creation",
                "description":
                  "Synthetic media generation, automated workflow pipelines, and custom prompt models tailored for your brand.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Strategic Copywriting",
                "description":
                  "Brand voice formulation, direct-response copy, and high-retention narrative hooks that trigger consumer action.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Short-Form Video & Reels",
                "description":
                  "Motion graphics, 4K vertical reel editing, and trend-jacking video engineered for retention and virality.",
                "url": `${siteUrl}/#layanan`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Brand & Print Design",
                "description":
                  "OOH advertising, event collateral, physical media, and unified digital branding under one cohesive design system.",
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
        "description": "Navigasi utama struktur situs Adsvar Digital",
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
              "Jadwalkan sesi konsultasi strategi akuisisi audiens dan transformasi digital bersama konsultan Adsvar.",
            "url": `${siteUrl}/#layanan`,
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
            "name": "Layanan",
            "item": `${siteUrl}/#layanan`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Harga",
            "item": `${siteUrl}/#harga`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Portofolio",
            "item": `${siteUrl}/#portofolio`,
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Tentang",
            "item": `${siteUrl}/#tentang`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Apa saja layanan utama yang disediakan oleh Adsvar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Adsvar menyediakan solusi digital lengkap yang mencakup AI-Powered Content Creation, Strategic Direct-Response Copywriting, produksi Video Reels 4K berretensi tinggi, serta arsitektur brand dan print design terpadu.",
            },
          },
          {
            "@type": "Question",
            "name": "Bagaimana alur kerja sama dan produksi konten di Adsvar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Alur kerja sama diawali dengan sesi Brand Strategy Consultation, penyusunan Content Blueprint & AI Prompt Modeling, proses produksi video dan grafis oleh tim kreatif, quality control terukur, hingga pelaporan metrik performa berkala.",
            },
          },
          {
            "@type": "Question",
            "name": "Berapa lama estimasi pengerjaan proyek di Adsvar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Untuk paket retainer bulanan, batch konten pertama dikirim dalam 5–7 hari kerja setelah brief disetujui. Sedangkan proyek identitas brand atau produksi khusus biasanya memakan waktu 2–3 minggu.",
            },
          },
          {
            "@type": "Question",
            "name": "Bagaimana cara memulai konsultasi dengan tim Adsvar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Anda dapat mengklik tombol 'Book A Consultation' pada website, menghubungi WhatsApp resmi di +62 823-2230-8719, atau mengirimkan email ke corporate@adsvar.id.",
            },
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
