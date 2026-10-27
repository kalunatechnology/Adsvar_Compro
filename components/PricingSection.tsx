"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/types";
import AdsvarEmblem from "@/components/AdsvarEmblem";

export interface PricingSectionProps {
  plans?: PricingPlan[];
  onOpenContact: (plan?: PricingPlan, billingCycle?: "monthly" | "project") => void;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

type PlatformKey = "Meta" | "Google" | "TikTok" | "GMV Max" | "Shopee";
type TrackKey = "all" | "ads-only" | "ads-content";

interface PlatformTierData {
  price: string;
  features: string[];
}

interface TierDefinition {
  id: string;
  number: string;
  track: "ads-only" | "ads-content" | "custom";
  name: string;
  subtitle: string;
  numericId: number;
  badge: string;
  isPopular: boolean;
  platforms: Record<PlatformKey, PlatformTierData>;
}

const PLATFORM_LIST: PlatformKey[] = [
  "Meta",
  "Google",
  "TikTok",
  "GMV Max",
  "Shopee",
];

const TIERS: TierDefinition[] = [
  {
    id: "ads-only-starter",
    numericId: 1,
    number: "01",
    track: "ads-only",
    name: "Ads Only · Starter",
    subtitle: "Businesses just starting with ads",
    badge: "",
    isPopular: false,
    platforms: {
      Meta: {
        price: "4.900.000",
        features: [
          "Ad spend up to IDR 15M",
          "2 campaigns: prospecting + retargeting",
          "Monthly report",
        ],
      },
      Google: {
        price: "4.900.000",
        features: [
          "Ad spend up to IDR 15M",
          "2 search campaigns (brand + services)",
          "Up to 40 keywords",
          "Monthly report",
        ],
      },
      TikTok: {
        price: "4.900.000",
        features: [
          "Ad spend up to IDR 15M",
          "1 campaign, 2 ad groups",
          "Monthly report",
        ],
      },
      "GMV Max": {
        price: "5.400.000",
        features: [
          "Ad spend up to IDR 15M",
          "Product GMV Max",
          "ROI target set from your product margin",
          "Monthly report",
        ],
      },
      Shopee: {
        price: "4.900.000",
        features: [
          "Ad spend up to IDR 15M",
          "Search Ads + Discovery Ads",
          "Up to 5 products",
          "Monthly report",
        ],
      },
    },
  },
  {
    id: "ads-only-growth",
    numericId: 2,
    number: "02",
    track: "ads-only",
    name: "Ads Only · Growth",
    subtitle: "Ads already running, ready for the next level",
    badge: "",
    isPopular: false,
    platforms: {
      Meta: {
        price: "5.900.000",
        features: [
          "Ad spend up to IDR 40M",
          "3 campaigns, including WhatsApp chat / marketplace ads",
          "Weekly + monthly reports",
        ],
      },
      Google: {
        price: "5.900.000",
        features: [
          "Ad spend up to IDR 40M",
          "3 campaigns, including Performance Max / remarketing",
          "Up to 80 keywords",
          "Weekly + monthly reports",
        ],
      },
      TikTok: {
        price: "5.900.000",
        features: [
          "Ad spend up to IDR 40M",
          "1 campaign, 2 ad groups",
          "Weekly + monthly reports",
        ],
      },
      "GMV Max": {
        price: "6.400.000",
        features: [
          "Ad spend up to IDR 40M",
          "Product GMV Max",
          "Affiliate video curation",
          "Weekly + monthly reports",
        ],
      },
      Shopee: {
        price: "5.900.000",
        features: [
          "Ad spend up to IDR 40M",
          "Adds Shop Ads",
          "Up to 15 products",
          "Weekly + monthly reports",
        ],
      },
    },
  },
  {
    id: "ads-only-scale",
    numericId: 3,
    number: "03",
    track: "ads-only",
    name: "Ads Only · Scale",
    subtitle: "Large ad budgets",
    badge: "FREE SETUP",
    isPopular: false,
    platforms: {
      Meta: {
        price: "8.500.000",
        features: [
          "Ad spend up to IDR 75M",
          "4 campaigns, including product catalog ads",
          "Monthly strategy meeting",
          "Free setup",
        ],
      },
      Google: {
        price: "8.500.000",
        features: [
          "Ad spend up to IDR 75M",
          "4–5 campaigns, including YouTube & Display",
          "Up to 150 keywords",
          "Monthly strategy meeting",
          "Free setup",
        ],
      },
      TikTok: {
        price: "8.500.000",
        features: [
          "Ad spend up to IDR 75M",
          "2 campaigns, 4 ad groups",
          "Monthly strategy meeting",
          "Free setup",
        ],
      },
      "GMV Max": {
        price: "9.000.000",
        features: [
          "Ad spend up to IDR 75M",
          "Product + LIVE GMV Max",
          "Affiliate video curation",
          "Monthly strategy meeting",
          "Free setup",
        ],
      },
      Shopee: {
        price: "8.500.000",
        features: [
          "Ad spend up to IDR 75M",
          "Adds Live Ads",
          "Up to 30 products",
          "Monthly strategy meeting",
          "Free setup",
        ],
      },
    },
  },
  {
    id: "ads-content-growth",
    numericId: 4,
    number: "04",
    track: "ads-content",
    name: "Ads + Content · Growth",
    subtitle: "Brands that need ads and content together",
    badge: "MOST POPULAR",
    isPopular: true,
    platforms: {
      Meta: {
        price: "7.900.000",
        features: [
          "Everything in Ads Only Growth",
          "6 ad videos/month (2 with talent)",
          "4 designs/carousels",
        ],
      },
      Google: {
        price: "6.900.000",
        features: [
          "Everything in Ads Only Growth",
          "Full ad copy + extensions",
          "6 ad designs",
        ],
      },
      TikTok: {
        price: "7.900.000",
        features: [
          "Everything in Ads Only Growth",
          "8 ad videos/month (2 with talent)",
          "Creatives refreshed weekly",
        ],
      },
      "GMV Max": {
        price: "9.500.000",
        features: [
          "Everything in Ads Only Growth",
          "12 product videos/month (4 with talent)",
        ],
      },
      Shopee: {
        price: "8.400.000",
        features: [
          "Everything in Ads Only Growth",
          "12 designs (product photos, banners, vouchers)",
          "4 product videos",
          "Title & description optimization for 10 products",
        ],
      },
    },
  },
  {
    id: "ads-content-pro",
    numericId: 5,
    number: "05",
    track: "ads-content",
    name: "Ads + Content · Pro",
    subtitle: "Brands ready to scale on every front",
    badge: "FREE SETUP",
    isPopular: false,
    platforms: {
      Meta: {
        price: "12.500.000",
        features: [
          "Everything in Ads Only Scale",
          "12 ad videos/month (4 with talent)",
          "8 designs/carousels",
          "Free setup",
        ],
      },
      Google: {
        price: "10.500.000",
        features: [
          "Everything in Ads Only Scale",
          "Full ad copy + extensions",
          "10 ad designs",
          "4 YouTube videos",
          "Free setup",
        ],
      },
      TikTok: {
        price: "11.900.000",
        features: [
          "Everything in Ads Only Scale",
          "14 ad videos/month (4 with talent)",
          "Creatives refreshed weekly",
          "Free setup",
        ],
      },
      "GMV Max": {
        price: "14.900.000",
        features: [
          "Everything in Ads Only Scale",
          "20 product videos/month (10 with talent)",
          "Free setup",
        ],
      },
      Shopee: {
        price: "12.500.000",
        features: [
          "Everything in Ads Only Scale",
          "20 designs",
          "8 product videos",
          "Title & description optimization for 20 products",
          "Free setup",
        ],
      },
    },
  },
];

const CUSTOM_CARD = {
  id: "custom",
  numericId: 6,
  number: "Custom",
  track: "custom" as const,
  name: "Custom",
  subtitle: "Built around your brand.",
  badge: "",
  isPopular: false,
  description:
    "Spending more than IDR 75M a month, running several brands, or need an on-location film crew? Let's build a package together.",
  features: [
    "Custom ad spend caps above IDR 75M+",
    "Multi-brand & cross-channel management",
    "On-location filming & dedicated crew",
    "Custom SLA & direct priority support",
  ],
};

function AdsvarLogoMark({ className = "h-3.5 w-auto" }: { className?: string }) {
  return <AdsvarEmblem className={className} />;
}

export default function PricingSection({
  onOpenContact,
  eyebrow = "PACKAGES",
  heading = "Pick your track. Scale at your pace.",
  subheading = "Already have your own content? Go Ads Only. Want us to make it for you? Choose Ads + Content.",
}: PricingSectionProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("Meta");
  const [activeTrack, setActiveTrack] = useState<TrackKey>("all");

  const displayedTiers = TIERS.filter((tier) => {
    if (activeTrack === "all") return true;
    if (activeTrack === "ads-only") return tier.track === "ads-only";
    if (activeTrack === "ads-content") return tier.track === "ads-content";
    return true;
  });

  return (
    <section
      id="harga"
      className="py-16 sm:py-20 relative bg-[#0D0D14] text-white antialiased overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-[5%]">
        {/* Bar 1: Eyebrow Badge (Adsvar Logo Mark + Orange Uppercase Ribbon) */}
        <div className="flex items-center gap-2 mb-3">
          <AdsvarLogoMark className="h-3 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF5500]">
            {eyebrow}
          </span>
        </div>

        {/* Bar 2: Split Header Row (Left Heading + Right Track Toggle) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-[-0.025em] leading-[1.15] mb-2">
              {heading}
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#8E8EA0] leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Track Toggle Switch Pill */}
          <div className="flex flex-col items-start lg:items-end gap-1.5 self-start lg:self-auto">
            <div className="p-1 bg-[#14141E] border border-[#262635] rounded-[9px] inline-flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTrack("all")}
                className={`px-3 py-1.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTrack === "all"
                    ? "bg-[#262636] text-white shadow-sm"
                    : "text-[#8E8EA0] hover:text-white"
                }`}
              >
                All Plans
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack("ads-only")}
                className={`px-3 py-1.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTrack === "ads-only"
                    ? "bg-[#262636] text-white shadow-sm"
                    : "text-[#8E8EA0] hover:text-white"
                }`}
              >
                Ads Only
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack("ads-content")}
                className={`px-3 py-1.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTrack === "ads-content"
                    ? "bg-[#262636] text-white shadow-sm"
                    : "text-[#8E8EA0] hover:text-white"
                }`}
              >
                Ads + Content
              </button>
            </div>

            {/* Helper text explaining the selected track */}
            <span className="text-[11px] text-[#A6A6BA] font-normal italic">
              {activeTrack === "ads-only"
                ? "We run the ads. You supply the content."
                : activeTrack === "ads-content"
                ? "We run the ads and produce fresh content every month."
                : "Compare all 5 performance tiers side by side."}
            </span>
          </div>
        </div>

        {/* Bar 3: Platform Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[11px] text-[#7A7A8E] font-medium mr-1 uppercase tracking-wider">
            Platform:
          </span>
          {PLATFORM_LIST.map((platform) => {
            const isActive = activePlatform === platform;
            return (
              <button
                key={platform}
                type="button"
                onClick={() => setActivePlatform(platform)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#FF5500] text-white font-semibold border border-[#FF5500] shadow-[0_4px_12px_rgba(255,85,0,0.3)]"
                    : "bg-[#14141E] text-zinc-300 font-medium border border-[#262635] hover:border-zinc-500 hover:text-white"
                }`}
              >
                {platform} {platform === "GMV Max" ? "(TikTok Shop)" : "Ads"}
              </button>
            );
          })}
        </div>

        {/* Bar 4: Tier Cards Grid */}
        <div
          className={`grid gap-3 lg:gap-3.5 xl:gap-4 items-stretch ${
            displayedTiers.length === 5
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
              : displayedTiers.length === 3
              ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {displayedTiers.map((tier) => {
            const platformData = tier.platforms[activePlatform];
            const fakePlan: PricingPlan = {
              id: tier.numericId,
              slug: tier.id,
              name: `${tier.name} (${activePlatform})`,
              description: tier.subtitle,
              priceMonthly: `IDR ${platformData.price}`,
              priceProject: `IDR ${platformData.price}`,
              isPopular: tier.isPopular,
              badge: tier.badge,
              features: platformData.features,
              sortOrder: 1,
              isActive: true,
            };

            return (
              <div
                key={tier.id}
                onClick={() => onOpenContact(fakePlan, "monthly")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenContact(fakePlan, "monthly");
                  }
                }}
                className={`group relative rounded-[18px] bg-[#14141F] p-5 lg:p-5.5 flex flex-col justify-between min-h-[460px] lg:min-h-[480px] transition-all duration-300 cursor-pointer text-left focus:outline-none ${
                  tier.isPopular
                    ? "border-2 border-[#FF5500] shadow-[0_0_30px_rgba(255,85,0,0.22)]"
                    : "border border-[#232332] hover:border-[#38384C]"
                }`}
              >
                <div>
                  {/* Card Header: Index Number & Badge */}
                  <div className="flex items-center justify-between min-h-[22px] mb-4">
                    <span className="text-[10px] font-mono text-[#6E6E80] tracking-wider">
                      {tier.number}
                    </span>
                    {tier.badge && (
                      <span className="px-2.5 py-0.5 rounded-[5px] bg-[#FF5500] text-white font-bold text-[8.5px] uppercase tracking-[0.08em] shadow-[0_2px_8px_rgba(255,85,0,0.35)]">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  {/* Package Name */}
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-white leading-snug tracking-[-0.015em] mb-1.5 whitespace-pre-line">
                    {tier.name}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-[11px] sm:text-[11.5px] text-[#7A7A8E] font-normal leading-normal mb-5 line-clamp-2">
                    {tier.subtitle}
                  </p>

                  {/* Price Display */}
                  <div className="flex items-baseline mb-5">
                    <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#7A7A8E] mr-1.5">
                      IDR
                    </span>
                    <span className="text-[21px] sm:text-[23px] font-bold text-white tracking-[-0.02em] leading-none">
                      {platformData.price}
                    </span>
                    <span className="text-[10.5px] text-[#7A7A8E] font-normal ml-1.5">
                      /mo
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-[11px] sm:text-[11.5px] text-[#A6A6BA]">
                    {platformData.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span className="w-[16px] h-[16px] rounded-full bg-[#FF5500]/15 border border-[#FF5500]/60 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2 h-2 text-[#FF5500] stroke-[2.5]" />
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContact(fakePlan, "monthly");
                    }}
                    className="w-full h-[38px] rounded-[9px] bg-[#1C1C28] hover:bg-[#252536] border border-[#2F2F40] hover:border-[#4B4B62] text-[#D4D4E4] hover:text-white text-[11px] sm:text-[11.5px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group/btn"
                  >
                    <span>Choose this package</span>
                    <span className="transition-transform group-hover/btn:translate-x-0.5 text-xs">→</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Show Custom Card if filtered track allows or if desired */}
          {activeTrack !== "all" && (
            <div
              onClick={() => {
                const customPlan: PricingPlan = {
                  id: CUSTOM_CARD.numericId,
                  slug: CUSTOM_CARD.id,
                  name: "Bespoke Custom Performance Scope",
                  description: CUSTOM_CARD.subtitle,
                  priceMonthly: "Custom",
                  priceProject: "Custom",
                  isPopular: false,
                  badge: "",
                  features: CUSTOM_CARD.features,
                  sortOrder: 6,
                  isActive: true,
                };
                onOpenContact(customPlan, "monthly");
              }}
              role="button"
              tabIndex={0}
              className="group relative rounded-[18px] bg-[#14141F] p-5 lg:p-5.5 flex flex-col justify-between min-h-[460px] lg:min-h-[480px] border border-[#232332] hover:border-[#38384C] transition-all duration-300 cursor-pointer text-left focus:outline-none"
            >
              <div>
                <div className="flex items-center justify-between min-h-[22px] mb-4">
                  <span className="text-[10px] font-mono text-[#6E6E80] tracking-wider">
                    {CUSTOM_CARD.number}
                  </span>
                </div>

                <h3 className="text-[17px] sm:text-[18px] font-semibold text-white leading-snug tracking-[-0.015em] mb-1.5">
                  {CUSTOM_CARD.name}
                </h3>

                <p className="text-[11px] sm:text-[11.5px] text-[#7A7A8E] font-normal leading-normal mb-5">
                  {CUSTOM_CARD.subtitle}
                </p>

                <div className="flex items-baseline mb-5">
                  <span className="text-[21px] sm:text-[23px] font-bold text-white tracking-[-0.02em] leading-none">
                    Custom Scope
                  </span>
                </div>

                <p className="text-[11px] text-[#8E8EA0] leading-relaxed mb-4">
                  {CUSTOM_CARD.description}
                </p>

                <ul className="space-y-2.5 text-[11px] sm:text-[11.5px] text-[#A6A6BA]">
                  {CUSTOM_CARD.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <span className="w-[16px] h-[16px] rounded-full bg-[#FF5500]/15 border border-[#FF5500]/60 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2 h-2 text-[#FF5500] stroke-[2.5]" />
                      </span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  className="w-full h-[38px] rounded-[9px] bg-[#1C1C28] hover:bg-[#252536] border border-[#2F2F40] hover:border-[#4B4B62] text-[#D4D4E4] hover:text-white text-[11px] sm:text-[11.5px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group/btn"
                >
                  <span>Build your scope</span>
                  <span className="transition-transform group-hover/btn:translate-x-0.5 text-xs">→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bar 5: Fine Print (Teks Catatan Kaki di Bawah Kartu Harga) */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-[11.5px] text-[#7A7A8E] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#FF5500] font-bold">•</span>
              <span>Prices are per service, per month, and exclude ad spend and 12% VAT.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5500] font-bold">•</span>
              <span>You pay ad spend directly to each platform from your own account.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5500] font-bold">•</span>
              <span>Ad spend above your plan's cap adds a 10% fee on the excess.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5500] font-bold">•</span>
              <span>Setup & Tracking is a one-time fee of IDR 1.500.000 (Google IDR 2.500.000). Free on Scale & Pro.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5500] font-bold">•</span>
              <span>Take 2 or more services and get 10% off the second service onward.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF5500] font-bold">•</span>
              <span>Minimum contract: 3 months.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}