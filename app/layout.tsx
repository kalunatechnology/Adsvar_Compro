import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Adsvar | Creative Digital Agency & Production Studio",
  description:
    "Elevate your brand presence with Adsvar. Next-gen web apps, viral social media video production, luxury brand architecture, and performance marketing.",
  keywords: [
    "Adsvar",
    "Digital Agency",
    "Video Production",
    "Creative Studio",
    "Web Development",
    "Next.js Agency",
    "Brand Identity",
    "Semarang",
  ],
  authors: [{ name: "Adsvar" }],
  openGraph: {
    title: "Adsvar | Creative Digital Agency & Production Studio",
    description:
      "Transforming ideas into high-performance digital experiences and scalable growth.",
    type: "website",
    locale: "id_ID",
    url: "https://adsvar.com",
    siteName: "Adsvar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${funnelDisplay.variable} ${readexPro.variable} dark`}>
      <body className="min-h-screen bg-[#08080C] text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
