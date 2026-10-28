"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";
import AdsvarEmblem from "@/components/AdsvarEmblem";

export interface ServicesSectionProps {
  services?: Service[];
  onOpenContact: (service?: Service) => void;
  onSelectPlatform?: (platform: "Meta" | "Google" | "TikTok" | "GMV Max" | "Shopee") => void;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

const PLATFORM_SLUG_MAP: Record<string, "Meta" | "Google" | "TikTok" | "GMV Max" | "Shopee"> = {
  "meta-ads": "Meta",
  "google-ads": "Google",
  "tiktok-ads": "TikTok",
  "tiktok-shop-gmv-max": "GMV Max",
  "shopee-ads": "Shopee",
};

function AdsvarLogoMark({ className = "h-3.5 w-auto" }: { className?: string }) {
  return <AdsvarEmblem className={className} />;
}

// 5 Core Platform Services exactly matching the official Adsvar copy
export const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    slug: "meta-ads",
    tag: "META ADS",
    name: "From chat to\ncheckout.",
    description:
      "Facebook and Instagram ads to find new customers, retarget previous visitors, and direct shoppers straight to WhatsApp or your online storefront.",
    image: "/services/meta_ads.jpg",
    href: "#layanan",
    points: ["Service businesses, F&B, online brands"],
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    slug: "google-ads",
    tag: "GOOGLE ADS",
    name: "Be there when\nthey search.",
    description:
      "Search, Performance Max, and YouTube ads for a single website, complete with conversion tracking for lead forms, phone calls, and WhatsApp.",
    image: "/services/google_ads.jpg",
    href: "#layanan",
    points: ["Clinics, real estate, schools, B2B"],
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    slug: "tiktok-ads",
    tag: "TIKTOK ADS",
    name: "Short videos.\nReal leads.",
    description:
      "Short-form video ads driving qualified traffic to your website or lead form, featuring Spark Ads to amplify top-performing organic videos on your handle.",
    image: "/services/tiktok_ads.jpg",
    href: "#layanan",
    points: ["Brands selling via website or capturing leads"],
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    slug: "tiktok-shop-gmv-max",
    tag: "TIKTOK SHOP GMV MAX",
    name: "More videos.\nMore GMV.",
    description:
      "Automated TikTok Shop ads calibrated to your target profit margins, affiliate creator video curation, and LIVE GMV Max scaling.",
    image: "/services/tiktok_shop.jpg",
    href: "#layanan",
    points: ["TikTok Shop & Tokopedia merchants"],
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 5,
    slug: "shopee-ads",
    tag: "SHOPEE ADS",
    name: "Rank higher.\nStay profitable.",
    description:
      "Search, discovery, and shop ads with scheduled bid optimizations and strategic voucher planning for twin-date promotional campaigns.",
    image: "/services/shopee_ads.jpg",
    href: "#layanan",
    points: ["Shopee marketplace sellers"],
    sortOrder: 5,
    isActive: true,
  },
];

export default function ServicesSection({
  services,
  onOpenContact,
  onSelectPlatform,
  eyebrow = "ADSVAR ADVANTAGE",
  heading = "One Creative Engine Solution.",
  subheading = "Most agencies only run the ads and leave the creative to you. At Adsvar, both live under one roof.",
}: ServicesSectionProps) {
  // Use provided services if available and matches the 5 platforms, otherwise use DEFAULT_SERVICES
  const displayServices =
    services && services.length === 5 ? services : DEFAULT_SERVICES;

  const handleCardClick = (item: Service) => {
    const targetPlatform = PLATFORM_SLUG_MAP[item.slug];
    if (targetPlatform && onSelectPlatform) {
      onSelectPlatform(targetPlatform);
      const targetElement = document.getElementById("paket");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    onOpenContact(item);
  };

  return (
    <section
      id="layanan"
      className="py-16 sm:py-20 relative bg-black text-white antialiased selection:bg-[#E35F21] selection:text-white"
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-[5%]">
        {/* Section Header Bar 1: Eyebrow with Adsvar Orange Mark */}
        <div className="flex items-center gap-2 mb-6">
          <AdsvarLogoMark className="h-3 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E35F21]">
            {eyebrow}
          </span>
        </div>

        {/* Section Header Bar 2: Two-Column Header (Left Heading + Right Paragraph) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-9">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-white tracking-[-0.025em] leading-[1.12]">
            {heading}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-[#8B8B97] leading-[1.6] lg:max-w-[340px] font-normal">
            {subheading}
          </p>
        </div>

        {/* 5 Cards Grid - Mengikuti proporsi dan estetika kartu original Adsvar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {displayServices.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(item);
                }
              }}
              className="adsvar-card group relative flex flex-col justify-between w-full min-h-[360px] sm:min-h-[380px] p-[18px] sm:p-[20px] rounded-[16px] bg-[#121216] border border-white/[0.08] hover:border-white/[0.28] focus:outline-none focus:border-white/[0.28] transition-all duration-300 cursor-pointer text-left"
            >
              <div>
                {/* Card Top Category Tag */}
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8B8B97] group-hover:text-[#E35F21] transition-colors duration-300 mb-[12px]">
                  {item.tag}
                </div>

                {/* Card Media: Rasio 304:170 proporsional */}
                <div className="relative w-full aspect-[304/170] rounded-[6px] overflow-hidden bg-black mb-[16px] border border-white/[0.04]">
                  <Image
                    src={item.image}
                    alt={item.name.replace("\n", " ")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Card Title (2 lines) */}
                <h3 className="text-[19px] sm:text-[21px] font-semibold text-white leading-[1.22] tracking-[-0.02em] mb-[10px] whitespace-pre-line">
                  {item.name}
                </h3>

                {/* Card Description */}
                <p className="text-[12px] sm:text-[12.5px] text-[#8B8B97] leading-[1.55] font-normal line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: See packages action button */}
              <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.05]">
                <span className="text-[12px] font-semibold text-white/90 group-hover:text-[#E35F21] flex items-center gap-1.5 transition-colors">
                  <span>See packages</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <ArrowDownRight className="w-4 h-4 text-[#8B8B97] group-hover:text-[#E35F21] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300 stroke-[1.75]" />
              </div>
            </div>
          ))}
        </div>

        {/* Baris Tambahan di Bawah Kartu */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center sm:text-left">
          <p className="text-[12.5px] sm:text-[13px] text-[#A1A1AA] leading-relaxed">
            <span className="text-white font-semibold">Your account, your data.</span> Ad accounts, pixels, and all your data stay under your business name, even if we stop working together.
          </p>
        </div>
      </div>
    </section>
  );
}