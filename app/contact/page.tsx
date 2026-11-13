import type { Metadata } from "next";
import SectionPageJsonLd from "@/components/seo/SectionPageJsonLd";
import ContactPageClient from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Adsvar performance marketing team, request partnership proposals, or connect with our media buying leads.",
  keywords: [
    "Contact Adsvar",
    "Adsvar phone number",
    "Adsvar WhatsApp",
    "Adsvar office address",
    "hubungi Adsvar",
    "performance agency Jakarta contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Get in touch with Adsvar performance marketing team, request partnership proposals, or connect with our media buying leads.",
    url: "/contact",
    locale: "en_US",
  },
  twitter: {
    title: "Contact Adsvar | Performance Ads Agency + Creative Engine",
    description:
      "Get in touch with Adsvar performance marketing team, request partnership proposals, or connect with our media buying leads.",
  },
};

export default function ContactPage() {
  return (
    <>
      <SectionPageJsonLd section="contact" />
      <ContactPageClient />
    </>
  );
}

