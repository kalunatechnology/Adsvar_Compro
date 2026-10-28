"use client";

import React, { useState } from "react";
import {
  Check,
  FileText,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  X,
  Globe,
  ArrowRight,
} from "lucide-react";
import type { PricingPlan } from "@/lib/types";
import AdsvarEmblem from "@/components/AdsvarEmblem";

export interface PricingSectionProps {
  plans?: PricingPlan[];
  onOpenContact: (plan?: PricingPlan, billingCycle?: "monthly" | "project") => void;
  onOpenConsultation?: (title?: string) => void;
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
    intro: "Iklan Facebook & Instagram, dari chat hingga penjualan berulang.",
    setupFee: "Gratis (Free Setup)",
    standardFeatures: [
      "Konsultasi kickoff & audit akun komprehensif",
      "Penentuan tolok ukur (benchmarks) & target KPI",
      "Perhitungan Break-even ROAS & target biaya per konversi",
      "Ad copywriting (headline, caption, hook) & A/B testing",
      "Pemantauan anggaran harian & laporan analitik",
      "Grup WhatsApp koordinasi + Account Manager berdedikasi",
      "Kalender promosi & arahan materi kreatif bulanan",
      "Kepemilikan penuh 100% atas akun iklan, Pixel, dan data",
    ],
  },
  Google: {
    displayName: "Google Ads (1 Website)",
    intro: "Iklan Search, Performance Max, dan YouTube untuk bisnis dengan 1 situs web.",
    setupFee: "IDR 200.000 (sekali bayar)",
    standardFeatures: [
      "Audit Google Business Profile & struktur akun iklan",
      "Konsultasi kickoff, audit KPI & perhitungan Break-even ROAS",
      "Pelacakan konversi formulir, telepon, WhatsApp & Google Analytics 4",
      "Ad copywriting, penyiapan seluruh ekstensi sitelinks & A/B testing",
      "Penyaringan kata kunci negatif (negative keywords) & pantau bid harian",
      "Grup WhatsApp koordinasi + Account Manager berdedikasi",
      "Kepemilikan penuh 100% atas akun Google Ads, tag, dan data",
    ],
  },
  TikTok: {
    displayName: "TikTok Ads",
    intro: "Iklan video untuk brand yang berjualan lewat website atau mengumpulkan prospek.",
    setupFee: "Gratis (Free Setup)",
    standardFeatures: [
      "Fitur Spark Ads untuk memperluas jangkauan video organik akun Anda",
      "Konsultasi kickoff & audit akun iklan TikTok",
      "Targeting audiens spesifik & minat perilaku audiens",
      "Copywriting materi iklan & variasi hook pembuka",
      "Pemantauan anggaran harian & optimasi performa",
      "Grup WhatsApp koordinasi + Account Manager berdedikasi",
      "Kepemilikan penuh 100% atas akun TikTok Ads dan Pixel",
    ],
  },
  "GMV Max": {
    displayName: "TikTok Shop GMV Max",
    intro: "Iklan otomatis untuk penjual TikTok Shop dan Tokopedia.",
    setupFee: "IDR 200.000 (sekali bayar)",
    standardFeatures: [
      "Kurasi dan optimasi video kreator afiliasi",
      "Target ROI diatur presisi berdasarkan margin produk Anda",
      "Konsultasi kickoff & audit katalog TikTok Shop",
      "Rekomendasi hero product bulanan & jadwal LIVE belanja",
      "Pemantauan performa harian & analisis omzet per produk",
      "Grup WhatsApp koordinasi + Account Manager berdedikasi",
      "Kepemilikan penuh 100% atas toko dan aset iklan",
    ],
  },
  Shopee: {
    displayName: "Shopee Ads",
    intro: "Iklan marketplace untuk peringkat produk lebih tinggi dan tetap menguntungkan.",
    setupFee: "Gratis (Free Setup)",
    standardFeatures: [
      "Audit toko saat kickoff (kualitas foto, ulasan, strategi harga)",
      "Iklan Pencarian Produk, Produk Serupa, dan Iklan Toko (Shop Ads)",
      "Penyesuaian bid terjadwal & strategi voucher kampanye tanggal kembar",
      "Copywriting & optimasi penempatan kata kunci produk",
      "Pemantauan performa harian & laporan bulanan komprehensif",
      "Grup WhatsApp koordinasi + Account Manager berdedikasi",
      "Kepemilikan penuh 100% atas akun toko Shopee Seller Anda",
    ],
  },
};

export const TIERS: TierDefinition[] = [
  {
    id: "ads-only-starter",
    numericId: 1,
    number: "01",
    track: "ads-only",
    name: "Hanya Iklan · Starter",
    subtitle: "Untuk bisnis yang baru memulai periklanan berbayar",
    badge: "",
    isPopular: false,
    platforms: {
      Meta: {
        price: "4.000.000",
        features: [
          "Kelola anggaran iklan hingga IDR 15 Juta",
          "2 kampanye: prospecting + retargeting",
          "Targeting minat & audiens broad",
          "Laporan bulanan & dukungan jam operasional",
          "Gratis setup & integrasi tracking",
        ],
      },
      Google: {
        price: "4.000.000",
        features: [
          "Kelola anggaran iklan hingga IDR 15 Juta",
          "2 kampanye Search: brand + layanan",
          "Kelola hingga 40 kata kunci (keywords)",
          "Pelacakan konversi formulir, telepon & WhatsApp",
          "Biaya setup IDR 200.000 (sekali bayar)",
        ],
      },
      TikTok: {
        price: "4.000.000",
        features: [
          "Kelola anggaran iklan hingga IDR 15 Juta",
          "1 kampanye, 2 grup iklan (ad groups)",
          "Targeting minat & audiens luas",
          "Termasuk Spark Ads · Gratis setup",
          "Laporan performa bulanan",
        ],
      },
      "GMV Max": {
        price: "4.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 15 Juta",
          "Kampanye Product GMV Max",
          "Target ROI diatur dari margin produk",
          "Rekomendasi hero product bulanan",
          "Biaya setup IDR 200.000 (sekali bayar)",
        ],
      },
      Shopee: {
        price: "4.000.000",
        features: [
          "Kelola anggaran iklan hingga IDR 15 Juta",
          "Iklan Pencarian + Produk Serupa",
          "Hingga 5 produk diiklankan",
          "Gratis setup & audit toko saat kickoff",
          "Laporan performa bulanan",
        ],
      },
    },
  },
  {
    id: "ads-only-growth",
    numericId: 2,
    number: "02",
    track: "ads-only",
    name: "Hanya Iklan · Growth",
    subtitle: "Iklan sudah berjalan dan siap naik ke tingkat lanjut",
    badge: "",
    isPopular: false,
    platforms: {
      Meta: {
        price: "4.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "3 kampanye (+ WhatsApp / CPAS)",
          "Targeting Lookalike audiens pembeli loyal",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      Google: {
        price: "4.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "3 kampanye (+ Performance Max / remarketing)",
          "Kelola hingga 80 kata kunci (keywords)",
          "Pelacakan Google Analytics 4 (GA4)",
          "Laporan mingguan & evaluasi strategi bulanan",
        ],
      },
      TikTok: {
        price: "4.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "1 kampanye, 2 grup iklan + retargeting penonton",
          "3 variasi hook per video materi iklan",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      "GMV Max": {
        price: "5.400.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "Product GMV Max + kurasi video afiliasi",
          "Target ROI presisi berdasarkan margin produk",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      Shopee: {
        price: "4.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "Tambah Iklan Toko (Shop Ads) · Hingga 15 produk",
          "Rekomendasi voucher & strategi promo bulanan",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
    },
  },
  {
    id: "ads-only-scale",
    numericId: 3,
    number: "03",
    track: "ads-only",
    name: "Hanya Iklan · Scale",
    subtitle: "Anggaran besar dengan optimasi harian yang intensif",
    badge: "SCALE",
    isPopular: false,
    platforms: {
      Meta: {
        price: "7.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "4 kampanye (+ katalog produk Advantage+)",
          "Lookalike bertingkat & eksklusi pembeli lama",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
      Google: {
        price: "7.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "4–5 kampanye (+ YouTube & Display)",
          "Hingga 150 keywords & custom Google Tag Manager",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
      TikTok: {
        price: "7.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "2 kampanye, 4 grup iklan + lookalike",
          "Riset tren berkala 2x per bulan",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
      "GMV Max": {
        price: "8.000.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "Product GMV Max + LIVE GMV Max",
          "Target ROI disesuaikan per produk unggulan",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & analisis produk",
        ],
      },
      Shopee: {
        price: "7.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "Hingga 30 produk · Strategi tanggal kembar",
          "Riset kata kunci 2x/bln & audit kuartalan",
          "Optimasi bid harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
    },
  },
  {
    id: "ads-content-growth",
    numericId: 4,
    number: "04",
    track: "ads-content",
    name: "Iklan + Konten · Growth",
    subtitle: "Solusi lengkap iklan sekaligus produksi materi konten",
    badge: "TERPOPULER",
    isPopular: true,
    platforms: {
      Meta: {
        price: "7.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "6 video iklan (2 dengan talent) + 4 desain materi",
          "3 kampanye (+ WhatsApp / CPAS)",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      Google: {
        price: "6.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "Copywriting lengkap + semua ekstensi · 6 desain iklan",
          "3 kampanye (+ Performance Max / remarketing)",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      TikTok: {
        price: "7.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "8 video iklan/bulan (2 dengan talent)",
          "Penyegaran kreatif mingguan · Riset tren 2x/bln",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      "GMV Max": {
        price: "9.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "12 video produk/bulan (4 dengan talent)",
          "Product GMV Max + kurasi video afiliasi",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
      Shopee: {
        price: "8.400.000",
        features: [
          "Kelola anggaran iklan hingga IDR 40 Juta",
          "12 desain (banner, voucher) + 4 video produk",
          "Optimasi judul & deskripsi untuk 10 produk",
          "Laporan mingguan & bulanan",
          "Sesi evaluasi strategi bulanan (30 menit)",
        ],
      },
    },
  },
  {
    id: "ads-content-pro",
    numericId: 5,
    number: "05",
    track: "ads-content",
    name: "Iklan + Konten · Pro",
    subtitle: "Brand yang siap mendominasi pasar dengan konten masif",
    badge: "SCALE PRO",
    isPopular: false,
    platforms: {
      Meta: {
        price: "12.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "12 video iklan (4 dengan talent) + 8 desain/karusel",
          "5 variasi copywriting per materi kreatif",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
      Google: {
        price: "10.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "10 desain iklan + 4 video YouTube",
          "4–5 kampanye (+ YouTube & Display)",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
      TikTok: {
        price: "11.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "14 video iklan/bulan (4 dengan talent)",
          "Riset tren mingguan & penyegaran materi berkala",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
      "GMV Max": {
        price: "14.900.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "20 video produk/bulan (10 dengan talent)",
          "Product GMV Max + LIVE GMV Max",
          "Optimasi harian · Dukungan Prioritas",
          "Meeting strategi bulanan & laporan per produk",
        ],
      },
      Shopee: {
        price: "12.500.000",
        features: [
          "Kelola anggaran iklan hingga IDR 75 Juta",
          "20 desain materi + 8 video produk",
          "Optimasi judul & deskripsi untuk 20 produk",
          "Optimasi bid harian · Dukungan Prioritas",
          "Meeting strategi bulanan & rencana kuartalan",
        ],
      },
    },
  },
];

const CUSTOM_CARD = {
  id: "custom",
  numericId: 6,
  number: "Kustom",
  track: "custom" as const,
  name: "Paket Kustom (Enterprise)",
  subtitle: "Dirancang khusus mengikuti skala kebutuhan bisnis Anda.",
  badge: "ENTERPRISE",
  isPopular: false,
  description:
    "Anggaran iklan bulanan di atas IDR 75 Juta, mengelola multi-brand sekaligus, atau memerlukan tim produksi syuting langsung di lokasi? Kami buatkan skema layanan yang pas.",
  features: [
    "Anggaran iklan bulanan tidak terbatas (unlimited spend)",
    "Manajemen lintas platform terpadu (omnichannel ads)",
    "Tim produksi konten & syuting on-location",
    "Dedicated Account Director & tim analis khusus",
    "Perjanjian SLA terjamin & durasi kontrak fleksibel",
  ],
};

// 8 Syarat & Ketentuan dalam 2 Bahasa (Indonesian & English)
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
  eyebrow = "PAKET & HARGA",
  heading = "Pilihan Paket Periklanan Digital.",
  subheading = "Pilih platform dan tingkatan paket yang dirancang untuk menghasilkan pertumbuhan terukur bagi bisnis Anda.",
}: PricingSectionProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("Meta");
  const [activeTrack, setActiveTrack] = useState<TrackKey>("all");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsLanguage, setTermsLanguage] = useState<"id" | "en">("id");

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

        {/* Bar 1: Platform Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {PLATFORM_LIST.map((platform) => {
            const isActive = activePlatform === platform;
            return (
              <button
                key={platform}
                type="button"
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 rounded-[8px] text-[12.5px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#E35F21] text-white shadow-sm font-semibold"
                    : "bg-[#121216] text-[#8B8B97] hover:text-white hover:bg-[#181820] border border-white/[0.06]"
                }`}
              >
                {PLATFORM_META[platform].displayName}
              </button>
            );
          })}
        </div>

        {/* Bar 2: Active Platform Info & Track Filter */}
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

          {/* Track Filter Segments */}
          <div className="flex items-center gap-1.5 p-1 rounded-[8px] bg-black/40 border border-white/[0.06] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTrack("all")}
              className={`px-3 py-1.5 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${
                activeTrack === "all"
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "text-[#8B8B97] hover:text-white"
              }`}
            >
              Semua Paket
            </button>
            <button
              type="button"
              onClick={() => setActiveTrack("ads-only")}
              className={`px-3 py-1.5 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${
                activeTrack === "ads-only"
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "text-[#8B8B97] hover:text-white"
              }`}
            >
              Hanya Iklan
            </button>
            <button
              type="button"
              onClick={() => setActiveTrack("ads-content")}
              className={`px-3 py-1.5 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${
                activeTrack === "ads-content"
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "text-[#8B8B97] hover:text-white"
              }`}
            >
              Iklan + Konten
            </button>
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
                className={`group relative rounded-[16px] bg-[#121216] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left focus:outline-none ${
                  tier.isPopular
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
                      /bulan
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#8B8B97] mb-3">
                      Termasuk dalam paket:
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

                {/* Bottom Action Button */}
                <div className="pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContact(fakePlan, "monthly");
                    }}
                    className={`w-full py-2.5 px-4 rounded-[8px] text-[12.5px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      tier.isPopular
                        ? "bg-[#E35F21] hover:bg-[#D05318] text-white font-semibold"
                        : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white"
                    }`}
                  >
                    <span>Pilih Paket Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                    Kustom Sesuai Kebutuhan
                  </span>
                </div>

                <p className="text-[12px] text-[#8B8B97] leading-relaxed mb-5">
                  {CUSTOM_CARD.description}
                </p>

                <div className="mb-6">
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#8B8B97] mb-3">
                    Keunggulan Enterprise:
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
                  <span>Konsultasi Paket Kustom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fitur Standar Termasuk di Platform Ini */}
        <div className="mt-8 p-5 sm:p-6 rounded-[14px] bg-[#121216] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#E35F21]" />
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider">
              Fitur Standar Termasuk di Semua Paket {currentMeta.displayName}:
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

        {/* Syarat & Ketentuan Button (Membuka Modal Pop-up 2 Bahasa) */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsTermsOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-[#121216] hover:bg-[#181820] border border-white/[0.1] hover:border-white/[0.24] text-[12.5px] font-medium text-white transition-all cursor-pointer shadow-sm group"
          >
            <FileText className="w-4 h-4 text-[#E35F21] group-hover:scale-105 transition-transform" />
            <span>Syarat &amp; Ketentuan Layanan</span>
            <span className="text-[10px] font-mono text-[#8B8B97] bg-white/[0.06] px-1.5 py-0.5 rounded">
              ID / EN
            </span>
          </button>
        </div>

        {/* Closing Consultation Call to Action */}
        <div className="mt-12 rounded-[16px] bg-[#121216] p-6 sm:p-8 lg:p-9 border border-white/[0.08] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#E35F21]/15 text-[#E35F21] text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" />
                <span>KONSULTASI &amp; AUDIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] leading-snug">
                Belum yakin paket mana yang paling tepat?
              </h3>
              <p className="mt-2 text-[12.5px] sm:text-[13px] text-[#8B8B97] leading-relaxed">
                Sampaikan platform dan estimasi anggaran bulanan Anda. Tim Adsvar akan merekomendasikan strategi dan paket paling efisien dalam satu sesi konsultasi gratis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation("Konsultasi Rekomendasi Paket");
                  } else {
                    onOpenContact(undefined, "monthly");
                  }
                }}
                className="px-6 py-3 rounded-[8px] bg-[#E35F21] hover:bg-[#D05318] text-white font-medium text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Jadwalkan Konsultasi Gratis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/6282322308719?text=Halo%20Adsvar,%20saya%20ingin%20konsultasi%20paket%20iklan%20yang%20paling%20sesuai%20untuk%20brand%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-[8px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal: Syarat & Ketentuan (Dual Language: ID / EN) */}
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
                    onClick={() => setTermsLanguage("id")}
                    className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium transition-all cursor-pointer ${
                      termsLanguage === "id"
                        ? "bg-[#E35F21] text-white font-bold"
                        : "text-[#8B8B97] hover:text-white"
                    }`}
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setTermsLanguage("en")}
                    className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium transition-all cursor-pointer ${
                      termsLanguage === "en"
                        ? "bg-[#E35F21] text-white font-bold"
                        : "text-[#8B8B97] hover:text-white"
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTermsOpen(false)}
                  className="w-8 h-8 rounded-[6px] bg-white/[0.05] hover:bg-white/[0.1] text-[#8B8B97] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Tutup"
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
                {termsLanguage === "id"
                  ? "Berlaku untuk semua paket resmi Adsvar."
                  : "Applies to all official Adsvar packages."}
              </span>
              <button
                type="button"
                onClick={() => setIsTermsOpen(false)}
                className="px-4 py-1.5 rounded-[6px] bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium transition-all cursor-pointer"
              >
                {termsLanguage === "id" ? "Tutup" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}