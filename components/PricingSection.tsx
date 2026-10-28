"use client";

import React, { useState } from "react";
import {
  Check,
  FileText,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  X,
  ArrowRight,
  SlidersHorizontal,
  Table as TableIcon,
} from "lucide-react";
import type { PricingPlan } from "@/lib/types";
import AdsvarEmblem from "@/components/AdsvarEmblem";
import PackageDetailModal from "@/components/PackageDetailModal";

export interface PricingSectionProps {
  plans?: PricingPlan[];
  onOpenContact: (plan?: PricingPlan, billingCycle?: "monthly" | "project") => void;
  onOpenConsultation?: (title?: string) => void;
  selectedPlatform?: PlatformKey;
  onSelectPlatform?: (platform: PlatformKey) => void;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export type PlatformKey = "Meta" | "Google" | "TikTok" | "GMV Max" | "Shopee";
export type TrackKey = "all" | "ads-only" | "ads-content";

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

export const PLATFORM_LIST: PlatformKey[] = [
  "Meta",
  "Google",
  "TikTok",
  "GMV Max",
  "Shopee",
];

interface PlatformMetaInfo {
  displayName: string;
  intro: string;
  setupFee: string;
  standardFeatures: string[];
}

export const PLATFORM_META: Record<PlatformKey, PlatformMetaInfo> = {
  Meta: {
    displayName: "Meta Ads",
    intro: "Facebook and Instagram ads, from first sale to repeat buyers.",
    setupFee: "Free Setup",
    standardFeatures: [
      "Kickoff strategy call & comprehensive account audit",
      "Benchmark & KPI establishment at kickoff",
      "Break-even ROAS & target cost-per-result calibration",
      "Ad copywriting (headline, body, hook) & A/B testing",
      "Daily budget & live performance monitoring",
      "Dedicated WhatsApp coordination group & Account Manager",
      "Monthly promo calendar & creative direction briefs",
      "100% full client ownership of ad accounts, pixel, and data",
    ],
  },
  Google: {
    displayName: "Google Ads (1 Website)",
    intro: "Search, Performance Max and YouTube ads for businesses with one website.",
    setupFee: "IDR 200,000 (one-time setup)",
    standardFeatures: [
      "Google Business Profile check & ad account audit",
      "Kickoff call, KPI audit & Break-even ROAS calculation",
      "Conversion tracking for forms, calls, WhatsApp & GA4",
      "Ad copywriting, all sitelink extensions & A/B testing",
      "Negative keyword scrubbing & daily bid monitoring",
      "Dedicated WhatsApp group & dedicated Account Manager",
      "100% full ownership of Google Ads account, tags, and data",
    ],
  },
  TikTok: {
    displayName: "TikTok Ads",
    intro: "For brands selling through a website or collecting leads.",
    setupFee: "Free Setup",
    standardFeatures: [
      "Spark Ads feature to amplify organic videos on your handle",
      "Kickoff strategy call & TikTok ad account audit",
      "Specific audience targeting & behavioral interest segments",
      "Ad copywriting & opening hook variations",
      "Daily budget monitoring & performance optimization",
      "Dedicated WhatsApp group & dedicated Account Manager",
      "100% full ownership of TikTok ad account and Pixel",
    ],
  },
  "GMV Max": {
    displayName: "TikTok Shop GMV Max",
    intro: "For TikTok Shop and Tokopedia sellers.",
    setupFee: "IDR 200,000 (one-time setup)",
    standardFeatures: [
      "Affiliate creator video curation and optimization",
      "Target ROI calibrated directly to your product margins",
      "Kickoff consultation & TikTok Shop catalog audit",
      "Monthly hero product recommendations & LIVE schedules",
      "Daily performance monitoring & per-product revenue tracking",
      "Dedicated WhatsApp group & dedicated Account Manager",
      "100% full ownership of shop and ad assets",
    ],
  },
  Shopee: {
    displayName: "Shopee Ads",
    intro: "For Shopee sellers looking to rank higher and stay profitable.",
    setupFee: "Free Setup",
    standardFeatures: [
      "Shop audit at kickoff (photo quality, reviews, pricing strategy)",
      "Search Ads, Similar Products, and Shop Ads",
      "Scheduled bid tuning & twin-date voucher strategy",
      "Ad copywriting & product keyword placement optimization",
      "Daily performance monitoring & comprehensive monthly report",
      "Dedicated WhatsApp group & dedicated Account Manager",
      "100% full ownership of your Shopee Seller account",
    ],
  },
};

export const TIERS: TierDefinition[] = [
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
        price: "4.000.000",
        features: [
          "Ad spend managed up to IDR 15M",
          "2 campaigns: prospecting + retargeting",
          "Interest & broad audiences",
          "Monthly report · Business-hours support",
          "Free setup & tracking included",
        ],
      },
      Google: {
        price: "4.000.000",
        features: [
          "Ad spend managed up to IDR 15M",
          "2 search campaigns: brand + services",
          "Up to 40 keywords managed",
          "Form, phone & WhatsApp conversion tracking",
          "Setup fee IDR 200,000 (one-time)",
        ],
      },
      TikTok: {
        price: "4.000.000",
        features: [
          "Ad spend managed up to IDR 15M",
          "1 campaign, 2 ad groups",
          "Interest & broad audiences",
          "Spark Ads included · Free setup",
          "Monthly performance report",
        ],
      },
      "GMV Max": {
        price: "4.500.000",
        features: [
          "Ad spend managed up to IDR 15M",
          "Product GMV Max campaign",
          "Target ROI calibrated from product margin",
          "Monthly hero product recommendations",
          "Setup fee IDR 200,000 (one-time)",
        ],
      },
      Shopee: {
        price: "4.000.000",
        features: [
          "Ad spend managed up to IDR 15M",
          "Search Ads + Similar Product Ads",
          "Up to 5 products advertised",
          "Free setup & shop audit at kickoff",
          "Monthly performance report",
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
        price: "4.900.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "3 campaigns (+ WhatsApp / CPAS)",
          "Buyer lookalikes audiences",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      Google: {
        price: "4.900.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "3 campaigns (+ Performance Max / remarketing)",
          "Up to 80 keywords managed",
          "Google Analytics 4 tracking included",
          "Weekly + monthly reports · Monthly 30m review",
        ],
      },
      TikTok: {
        price: "4.900.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "1 campaign, 2 ad groups + retargeting viewers",
          "3 hook variations per video",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      "GMV Max": {
        price: "5.400.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "Product GMV Max + affiliate curation",
          "Target ROI set from product margin",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      Shopee: {
        price: "4.900.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "Adds Shop Ads · Up to 15 products",
          "Monthly voucher & promo recommendations",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
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
    subtitle: "Large ad budgets with daily optimization",
    badge: "SCALE",
    isPopular: false,
    platforms: {
      Meta: {
        price: "7.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "4 campaigns (+ Advantage+ product catalog)",
          "Tiered lookalikes & past-buyer exclusion",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + quarterly plan",
        ],
      },
      Google: {
        price: "7.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "4–5 campaigns (+ YouTube & Display)",
          "Up to 150 keywords · Custom GTM tracking",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + quarterly plan",
        ],
      },
      TikTok: {
        price: "7.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "2 campaigns, 4 ad groups + lookalikes",
          "Trend research 2x/month",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + quarterly plan",
        ],
      },
      "GMV Max": {
        price: "8.000.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "Product GMV Max + LIVE GMV Max",
          "Target ROI set per hero product",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + per-product report",
        ],
      },
      Shopee: {
        price: "7.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "Up to 30 products · Twin-date strategy",
          "Keyword research 2x/month · Quarterly audit",
          "Daily bid tuning · Priority support",
          "Monthly strategy meeting + quarterly plan",
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
          "Ad spend managed up to IDR 40M",
          "6 ad videos (2 with talent) + 4 designs/carousels",
          "3 campaigns (+ WhatsApp / CPAS)",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      Google: {
        price: "6.900.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "Full ad copy + all extensions · 6 ad designs",
          "3 campaigns (+ Performance Max / remarketing)",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      TikTok: {
        price: "7.900.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "8 ad videos/month (2 with talent)",
          "Creatives refreshed weekly · Trend research 2x/mo",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      "GMV Max": {
        price: "9.500.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "12 product videos/month (4 with talent)",
          "Product GMV Max + affiliate curation",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
        ],
      },
      Shopee: {
        price: "8.400.000",
        features: [
          "Ad spend managed up to IDR 40M",
          "12 designs (photos, banners, vouchers) + 4 videos",
          "Title & description optimization for 10 products",
          "Weekly + monthly reports",
          "Monthly 30-min strategy review call",
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
    badge: "SCALE PRO",
    isPopular: false,
    platforms: {
      Meta: {
        price: "12.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "12 ad videos (4 with talent) + 8 designs/carousels",
          "5 copy variations per ad creative",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + quarterly plan",
        ],
      },
      Google: {
        price: "10.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "10 ad designs + 4 YouTube videos",
          "4–5 campaigns (+ YouTube & Display)",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + quarterly plan",
        ],
      },
      TikTok: {
        price: "11.900.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "14 ad videos/month (4 with talent)",
          "Weekly trend research & weekly creative refresh",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + quarterly plan",
        ],
      },
      "GMV Max": {
        price: "14.900.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "20 product videos/month (10 with talent)",
          "Product GMV Max + LIVE GMV Max",
          "Daily optimization · Priority support",
          "Monthly strategy meeting + per-product report",
        ],
      },
      Shopee: {
        price: "12.500.000",
        features: [
          "Ad spend managed up to IDR 75M",
          "20 designs + 8 product videos",
          "Title & description optimization for 20 products",
          "Daily bid tuning · Priority support",
          "Monthly strategy meeting + quarterly plan",
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
  name: "Custom Scope",
  subtitle: "Built around your brand.",
  badge: "ENTERPRISE",
  isPopular: false,
  description:
    "Spending more than IDR 75M a month, running several brands, or need an on-location film crew? Let's build a bespoke package together.",
  features: [
    "Unlimited monthly ad spend management",
    "Omnichannel cross-platform campaigns",
    "On-location filming & production crew",
    "Dedicated Account Director & senior team",
    "Custom SLAs & flexible contract terms",
  ],
};

// 8 Syarat & Ketentuan / Terms & Conditions in 2 Languages
interface TermItem {
  id: number;
  title: string;
  desc: string;
}

const TERMS_DATA: Record<"id" | "en", { heading: string; subtitle: string; items: TermItem[] }> = {
  id: {
    heading: "Syarat & Ketentuan Layanan",
    subtitle: "Ketentuan umum operasional dan administrasi paket Adsvar.",
    items: [
      {
        id: 1,
        title: "Harga & Ketentuan Pajak",
        desc: "Harga paket berlaku per platform, per bulan, dan belum termasuk anggaran belanja iklan (ad spend) serta PPN 12%.",
      },
      {
        id: 2,
        title: "Pembayaran Anggaran Iklan (Ad Spend)",
        desc: "Pembayaran ad spend dilakukan langsung oleh klien ke platform terkait (Meta, Google, TikTok, Shopee) menggunakan metode pembayaran Anda sendiri.",
      },
      {
        id: 3,
        title: "Kelebihan Anggaran (Ad Spend Overage)",
        desc: "Jika anggaran belanja iklan bulanan melampaui batas paket (package cap), dikenakan biaya manajemen tambahan sebesar 10% dari nominal kelebihannya.",
      },
      {
        id: 4,
        title: "Biaya Setup Awal Akun",
        desc: "Gratis biaya setup untuk Meta Ads, TikTok Ads, dan Shopee Ads. Untuk Google Ads dan TikTok Shop GMV Max dikenakan biaya setup IDR 200.000 (sekali bayar saat kickoff).",
      },
      {
        id: 5,
        title: "Komitmen Kontrak Minimum",
        desc: "Durasi kontrak kerja sama minimum adalah 3 bulan untuk mencapai optimasi dan pematangan data algoritma yang optimal. Penghentian kontrak lebih awal membatalkan potongan harga dan memberlakukan biaya setup standar (IDR 500.000 / Google Ads IDR 900.000).",
      },
      {
        id: 6,
        title: "Pemulihan Akun (Account Recovery)",
        desc: "Penanganan akun yang terkena pembatasan/banned oleh platform atau situs tanpa akses admin ditangani secara terpisah sebagai layanan Account Recovery dengan biaya per kasus.",
      },
      {
        id: 7,
        title: "Diskon Multi-Platform",
        desc: "Klien yang menjalankan kampanye iklan di 2 platform atau lebih secara bersamaan berhak mendapatkan diskon langsung 10% untuk platform kedua dan seterusnya.",
      },
      {
        id: 8,
        title: "Jam Layanan & Waktu Respons",
        desc: "Jam operasional kerja berlaku Senin–Jumat, 09.00–17.00 WIB. Paket dengan Dukungan Prioritas (Pro) mendapatkan jaminan waktu respons maksimal 2 jam selama jam kerja.",
      },
    ],
  },
  en: {
    heading: "Terms & Conditions",
    subtitle: "General operational and administrative guidelines for Adsvar packages.",
    items: [
      {
        id: 1,
        title: "Pricing & Applicable Taxes",
        desc: "Package rates apply per platform, per month, excluding direct ad spend and 12% VAT.",
      },
      {
        id: 2,
        title: "Direct Ad Spend Billing",
        desc: "You pay ad spend directly to advertising platforms (Meta, Google, TikTok, Shopee) using your own billing and payment method.",
      },
      {
        id: 3,
        title: "Ad Spend Cap Overages",
        desc: "If monthly ad spend exceeds your package cap, an additional 10% management fee applies to the excess spend.",
      },
      {
        id: 4,
        title: "Account Setup Fees",
        desc: "Free setup for Meta Ads, TikTok Ads, and Shopee Ads. Google Ads and TikTok Shop GMV Max require a one-time IDR 200,000 setup fee at kickoff.",
      },
      {
        id: 5,
        title: "Minimum Contract Commitment",
        desc: "Standard minimum commitment is 3 months for algorithm learning and steady optimization. Early termination cancels fee waivers and applies standard setup fees (IDR 500,000 / IDR 900,000 for Google Ads).",
      },
      {
        id: 6,
        title: "Account Recovery Cases",
        desc: "Restricted Business Managers, suspended accounts, or complex web access issues are handled separately as bespoke recovery projects.",
      },
      {
        id: 7,
        title: "Multi-Platform Discount",
        desc: "Run campaigns across 2 or more platforms simultaneously and receive an instant 10% discount on the second and subsequent platforms.",
      },
      {
        id: 8,
        title: "Support Hours & SLAs",
        desc: "Standard business hours are Monday–Friday, 09:00–17:00 WIB. Priority support (Pro) guarantees a maximum 2-hour response window during operational hours.",
      },
    ],
  },
};

export default function PricingSection({
  onOpenContact,
  onOpenConsultation,
  selectedPlatform,
  onSelectPlatform,
  eyebrow = "PACKAGES",
  heading = "Pick your track. Scale at your pace.",
  subheading = "Already have your own content? Go Ads Only. Want us to make it for you? Choose Ads + Content.",
}: PricingSectionProps) {
  const [internalPlatform, setInternalPlatform] = useState<PlatformKey>("Meta");
  const activePlatform = selectedPlatform || internalPlatform;

  const setActivePlatform = (p: PlatformKey) => {
    if (onSelectPlatform) onSelectPlatform(p);
    setInternalPlatform(p);
  };

  const [activeTrack, setActiveTrack] = useState<TrackKey>("all");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsLanguage, setTermsLanguage] = useState<"en" | "id">("en");

  // State for Pop up Detail Spesifikasi Paket
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailModalTierId, setDetailModalTierId] = useState<string>("ads-content-growth");

  const openPackageDetail = (tierId: string) => {
    setDetailModalTierId(tierId);
    setIsDetailModalOpen(true);
  };

  const currentMeta = PLATFORM_META[activePlatform];

  const displayedTiers = TIERS.filter((t) => {
    if (activeTrack === "all") return true;
    return t.track === activeTrack;
  });

  const showCustom = activeTrack === "all" || activeTrack === "ads-content";

  return (
    <section
      id="paket"
      className="py-16 sm:py-20 relative bg-black text-white antialiased selection:bg-[#E35F21] selection:text-white"
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-[5%]">
        {/* Header Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <AdsvarEmblem className="h-3 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E35F21]">
            {eyebrow}
          </span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-white tracking-[-0.025em] leading-[1.12]">
            {heading}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-[#8B8B97] leading-[1.6] lg:max-w-[420px] font-normal">
            {subheading}
          </p>
        </div>

        {/* Bar 1: Platform Selector Tabs (Meta | Google | TikTok | GMV Max | Shopee) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {PLATFORM_LIST.map((platform) => {
            const isActive = activePlatform === platform;
            return (
              <button
                key={platform}
                type="button"
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 rounded-[8px] text-[12.5px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-[#E35F21] text-white shadow-sm font-semibold"
                    : "bg-[#121216] text-[#8B8B97] hover:text-white hover:bg-[#181820] border border-white/[0.06]"
                  }`}
              >
                {platform}
              </button>
            );
          })}
        </div>

        {/* Bar 2: Active Platform Info, Track Filter, & Full Comparison Table Trigger */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-[12px] bg-[#121216] border border-white/[0.06] mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-medium text-[13px]">
              <span>{currentMeta.displayName}</span>
              <span className="text-white/20">•</span>
              <span className="text-[11.5px] text-[#E35F21] font-semibold">
                {currentMeta.setupFee}
              </span>
            </div>
            <p className="text-[11.5px] text-[#8B8B97] mt-0.5">
              {currentMeta.intro}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Full Comparison Table Trigger */}
            <button
              type="button"
              onClick={() => openPackageDetail(displayedTiers[0]?.id || "ads-content-growth")}
              className="px-3 py-1.5 rounded-[7px] text-[11.5px] font-medium text-white/90 bg-[#E35F21]/15 hover:bg-[#E35F21]/25 border border-[#E35F21]/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <TableIcon className="w-3.5 h-3.5 text-[#E35F21]" />
              <span>Full Comparison Table</span>
            </button>

            {/* Track Filter Segments */}
            <div className="flex items-center gap-1 p-0.5 rounded-[8px] bg-black/40 border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setActiveTrack("all")}
                className={`px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${activeTrack === "all"
                    ? "bg-[#E35F21] text-white font-semibold"
                    : "text-[#8B8B97] hover:text-white"
                  }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack("ads-only")}
                className={`px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${activeTrack === "ads-only"
                    ? "bg-[#E35F21] text-white font-semibold"
                    : "text-[#8B8B97] hover:text-white"
                  }`}
              >
                Ads Only
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack("ads-content")}
                className={`px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${activeTrack === "ads-content"
                    ? "bg-[#E35F21] text-white font-semibold"
                    : "text-[#8B8B97] hover:text-white"
                  }`}
              >
                Ads + Content
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              sortOrder: tier.numericId,
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
                className={`group relative rounded-[16px] bg-[#121216] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left focus:outline-none ${tier.isPopular
                    ? "border-2 border-[#E35F21] shadow-[0_0_24px_rgba(227,95,33,0.18)]"
                    : "border border-white/[0.08] hover:border-white/[0.22]"
                  }`}
              >
                <div>
                  {/* Top: Tier index & optional badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#8B8B97] tracking-wider">
                      {tier.number}
                    </span>
                    {tier.badge && (
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#E35F21] text-white font-bold text-[9px] uppercase tracking-wider">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Subtitle */}
                  <h3 className="text-[19px] sm:text-[20px] font-semibold text-white tracking-[-0.015em] mb-1.5">
                    {tier.name}
                  </h3>
                  <p className="text-[12px] text-[#8B8B97] leading-relaxed mb-5 min-h-[36px]">
                    {tier.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-white/[0.06]">
                    <span className="text-[10px] font-semibold uppercase text-[#8B8B97]">
                      IDR
                    </span>
                    <span className="text-[26px] sm:text-[28px] font-bold text-white tracking-[-0.02em]">
                      {platformData.price}
                    </span>
                    <span className="text-[11.5px] text-[#8B8B97] font-normal">
                      /month
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#8B8B97] mb-3">
                      Included in this tier:
                    </div>
                    <ul className="space-y-2.5 text-[12px] text-[#C4C4D4]">
                      {platformData.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#E35F21] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Buttons: Choose this package + Small Detail Button */}
                <div className="pt-4 mt-auto space-y-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContact(fakePlan, "monthly");
                    }}
                    className={`w-full py-2.5 px-4 rounded-[8px] text-[12.5px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${tier.isPopular
                        ? "bg-[#E35F21] hover:bg-[#D05318] text-white font-semibold shadow-sm"
                        : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white"
                      }`}
                  >
                    <span>Choose this package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPackageDetail(tier.id);
                    }}
                    className="w-full py-1.5 px-3 rounded-[6px] text-[11px] font-medium text-[#8B8B97] hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.16] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3 text-[#E35F21]" />
                    <span>View Package Details</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Custom Enterprise Card */}
          {showCustom && (
            <div
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation("Enterprise Custom Scope");
                } else {
                  onOpenContact(undefined, "project");
                }
              }}
              role="button"
              tabIndex={0}
              className="rounded-[16px] bg-[#121216] border border-dashed border-white/[0.15] hover:border-white/[0.3] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-[#8B8B97] tracking-wider">
                    {CUSTOM_CARD.number}
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-white/[0.08] text-white/90 font-bold text-[9px] uppercase tracking-wider">
                    {CUSTOM_CARD.badge}
                  </span>
                </div>

                <h3 className="text-[19px] sm:text-[20px] font-semibold text-white tracking-[-0.015em] mb-1.5">
                  {CUSTOM_CARD.name}
                </h3>
                <p className="text-[12px] text-[#8B8B97] leading-relaxed mb-5 min-h-[36px]">
                  {CUSTOM_CARD.subtitle}
                </p>

                <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-white/[0.06]">
                  <span className="text-[20px] font-bold text-white tracking-[-0.02em]">
                    Customized to Your Scale
                  </span>
                </div>

                <p className="text-[12px] text-[#8B8B97] leading-relaxed mb-5">
                  {CUSTOM_CARD.description}
                </p>

                <div className="mb-6">
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#8B8B97] mb-3">
                    Enterprise Highlights:
                  </div>
                  <ul className="space-y-2.5 text-[12px] text-[#C4C4D4]">
                    {CUSTOM_CARD.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#E35F21] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-[8px] bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white text-[12.5px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Discuss Custom Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Catatan Harga di Bawah Kartu & Shortcut Perbandingan */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-[#8B8B97] border-t border-white/[0.06] pt-4">
          <p className="italic">
            * Per platform, per month. Excludes ad spend and 12% VAT.
          </p>
          <button
            type="button"
            onClick={() => openPackageDetail(displayedTiers[0]?.id || "ads-content-growth")}
            className="text-[#E35F21] hover:underline font-medium inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Compare All Package Features &amp; Deliverables →</span>
          </button>
        </div>

        {/* Standard Features Included Bar */}
        <div className="mt-8 p-5 sm:p-6 rounded-[14px] bg-[#121216] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#E35F21]" />
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider">
              Standard features included across all {currentMeta.displayName} packages:
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11.5px] text-[#8B8B97]">
            {currentMeta.standardFeatures.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E35F21] shrink-0 mt-1.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions Button (Opens Dual-Language Modal: EN / ID) */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsTermsOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-[#121216] hover:bg-[#181820] border border-white/[0.1] hover:border-white/[0.24] text-[12.5px] font-medium text-white transition-all cursor-pointer shadow-sm group"
          >
            <FileText className="w-4 h-4 text-[#E35F21] group-hover:scale-105 transition-transform" />
            <span>Terms &amp; Conditions</span>
            <span className="text-[10px] font-mono text-[#8B8B97] bg-white/[0.06] px-1.5 py-0.5 rounded">
              EN / ID
            </span>
          </button>
        </div>

        {/* Closing Consultation Call to Action */}
        <div className="mt-12 rounded-[16px] bg-[#121216] p-6 sm:p-8 lg:p-9 border border-white/[0.08] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#E35F21]/15 text-[#E35F21] text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" />
                <span>CONSULTATION &amp; AUDIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] leading-snug">
                Not sure which package fits?
              </h3>
              <p className="mt-2 text-[12.5px] sm:text-[13px] text-[#8B8B97] leading-relaxed">
                Tell us your platform and monthly ad spend. We&apos;ll recommend the most effective package and strategy in one free call.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation("Package Recommendation Consultation");
                  } else {
                    onOpenContact(undefined, "monthly");
                  }
                }}
                className="px-6 py-3 rounded-[8px] bg-[#E35F21] hover:bg-[#D05318] text-white font-medium text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Book a free consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/6282322308719?text=Hello%20Adsvar,%20I%20would%20like%20to%20consult%20about%20the%20best%20ad%20package%20for%20my%20brand"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-[8px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal: Terms & Conditions (Dual Language: EN / ID) */}
      {isTermsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsTermsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#121216] border border-white/[0.12] rounded-[18px] p-6 sm:p-7 shadow-2xl max-h-[88vh] flex flex-col text-left"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#E35F21]" />
                <div>
                  <h3 className="text-[17px] font-semibold text-white">
                    {TERMS_DATA[termsLanguage].heading}
                  </h3>
                  <p className="text-[11.5px] text-[#8B8B97]">
                    {TERMS_DATA[termsLanguage].subtitle}
                  </p>
                </div>
              </div>

              {/* Language Switcher Pill & Close */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-0.5 rounded-[7px] bg-white/[0.06] border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setTermsLanguage("en")}
                    className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium transition-all cursor-pointer ${termsLanguage === "en"
                        ? "bg-[#E35F21] text-white font-bold"
                        : "text-[#8B8B97] hover:text-white"
                      }`}
                  >
                    🇬🇧 EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setTermsLanguage("id")}
                    className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium transition-all cursor-pointer ${termsLanguage === "id"
                        ? "bg-[#E35F21] text-white font-bold"
                        : "text-[#8B8B97] hover:text-white"
                      }`}
                  >
                    🇮🇩 ID
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTermsOpen(false)}
                  className="w-8 h-8 rounded-[6px] bg-white/[0.05] hover:bg-white/[0.1] text-[#8B8B97] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: 8 Points */}
            <div className="overflow-y-auto pr-1 space-y-3.5 scrollbar-thin">
              {TERMS_DATA[termsLanguage].items.map((term) => (
                <div
                  key={term.id}
                  className="p-3.5 rounded-[10px] bg-white/[0.02] border border-white/[0.05]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#E35F21]/15 text-[#E35F21] font-mono text-[10.5px] font-bold flex items-center justify-center">
                      {term.id}
                    </span>
                    <h4 className="text-[13px] font-semibold text-white">
                      {term.title}
                    </h4>
                  </div>
                  <p className="text-[12px] text-[#A1A1AA] leading-relaxed pl-7">
                    {term.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#8B8B97]">
              <span>
                {termsLanguage === "en"
                  ? "Applies to all official Adsvar packages."
                  : "Berlaku untuk semua paket resmi Adsvar."}
              </span>
              <button
                type="button"
                onClick={() => setIsTermsOpen(false)}
                className="px-4 py-1.5 rounded-[6px] bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium transition-all cursor-pointer"
              >
                {termsLanguage === "en" ? "Close" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Detail Spesifikasi & Perbandingan Paket */}
      <PackageDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        initialPlatform={activePlatform}
        initialTierId={detailModalTierId}
        onSelectPackage={(plan, cycle) => onOpenContact(plan, cycle || "monthly")}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
}