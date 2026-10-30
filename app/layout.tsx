import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND, SITE_URL } from "@/lib/seo/brand";
import { buildFullGraphJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

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

export const viewport: Viewport = {
  themeColor: "#FF5500",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adsvar | Performance Ads Agency + Creative Engine",
    template: "%s | Adsvar",
  },
  description:
    "Adsvar runs your Meta, Google, TikTok, GMV Max, and Shopee ads, with built-in high-volume creative production engine and transparent monthly pricing from IDR 4.9M.",
  keywords: [
    "Adsvar",
    "Adsvar Digital",
    "Adsvar Digital Agency",
    "performance marketing agency Indonesia",
    "Meta ads agency Indonesia",
    "Google Ads agency Indonesia",
    "TikTok Shop GMV Max agency",
    "Shopee ads agency",
    "jasa iklan Meta Ads",
    "jasa GMV Max TikTok Shop",
    "jasa Shopee Ads",
    "performance ads agency",
    "creative production engine",
    "direct response video agency",
    "ROAS scaling Jakarta",
    "e-commerce growth agency",
  ],
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    title: "Adsvar",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: SITE_URL,
    siteName: BRAND.name,
    title: "Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Ads that run. Content that sells. Meta, Google, TikTok Shop GMV Max, and Shopee Ads, handled by one dedicated growth team.",
    images: [
      {
        url: "/og-image.png",
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
      "Ads that run. Content that sells. Meta, Google, TikTok Shop GMV Max, and Shopee Ads, handled by one dedicated growth team.",
    images: ["/og-image.png"],
    site: "@adsvar",
    creator: "@adsvar",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = buildFullGraphJsonLd();

  return (
    <html lang="en" className={`${funnelDisplay.variable} ${readexPro.variable} dark`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Entity-First Schema.org Structured Data */}
        <JsonLd id="adsvar-schema-graph" data={structuredData} />
      </head>
      <body className="min-h-screen bg-[#08080C] text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
