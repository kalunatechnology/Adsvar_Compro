"use client";

import { ArrowRight, Play, Star, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import type { CompanyStat } from "@/lib/types";

interface HeroSectionProps {
  stats: CompanyStat[];
  onOpenContact: () => void;
}

export default function HeroSection({ stats, onOpenContact }: HeroSectionProps) {
  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-black"
    >
      {/* Background Lighting from adsvar.svg */}
      <div className="adsvar-hero-glow-1" />
      <div className="adsvar-hero-glow-2" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16161F] border border-[#3F3F45] shadow-lg mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="text-xs font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
            Creative Agency & Digital Growth Studio
          </span>
        </div>

        {/* Main Headline from adsvar.svg */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl text-white leading-[1.12]">
          Transforming Ideas Into{" "}
          <span className="text-[#FF5500] underline decoration-[#FF5500]/30 underline-offset-8">
            High-Performance
          </span>{" "}
          Digital Experiences
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-400 max-w-3xl leading-relaxed font-normal">
          Kami mengintegrasikan strategi konten video viral, rekayasa web modern,
          dan arsitektur brand premium untuk melipatgandakan otoritas dan pertumbuhan bisnis Anda.
        </p>

        {/* Hero CTA Buttons matching SVG dimensions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button onClick={onOpenContact} className="adsvar-btn-primary w-full sm:w-auto gap-2">
            <span>Mulai Proyek Anda</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a href="#portofolio" className="adsvar-btn-secondary w-full sm:w-auto gap-2">
            <Play className="w-4 h-4 text-[#FF5500] fill-[#FF5500]" />
            <span>Lihat Showcase Karya</span>
          </a>
        </div>

        {/* Exact Social Proof Avatars from SVG (w: 49px, h: 49px, colors: #FF994B, #FF6F00, #863A00) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center -space-x-3">
            <div
              className="w-[49px] h-[49px] rounded-full flex items-center justify-center font-bold text-black text-sm border-2 border-black shadow-lg"
              style={{ backgroundColor: "#FF994B" }}
            >
              AD
            </div>
            <div
              className="w-[49px] h-[49px] rounded-full flex items-center justify-center font-bold text-white text-sm border-2 border-black shadow-lg"
              style={{ backgroundColor: "#FF6F00" }}
            >
              3P
            </div>
            <div
              className="w-[49px] h-[49px] rounded-full flex items-center justify-center font-bold text-white text-sm border-2 border-black shadow-lg"
              style={{ backgroundColor: "#863A00" }}
            >
              CR
            </div>
          </div>

          <div className="flex flex-col sm:items-start items-center">
            <div className="flex items-center gap-1 text-[#FF994B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="font-bold text-zinc-200 ml-1">4.9 / 5.0</span>
            </div>
            <span className="text-zinc-400 mt-0.5">
              Dipercaya oleh puluhan brand, UMKM, & enterprise di Indonesia
            </span>
          </div>
        </div>

        {/* Dynamic SQLite Stats Row */}
        {stats && stats.length > 0 && (
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-zinc-800/80">
            {stats.map((st) => (
              <div key={st.key} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {st.prefix}
                  {st.value}
                  <span className="text-[#FF5500]">{st.suffix}</span>
                </span>
                <span className="text-xs text-zinc-400 mt-1 font-medium">
                  {st.labelLine1} {st.labelLine2}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Hero Showcase Mockup with Extracted Asset */}
        <div className="mt-14 w-full max-w-5xl rounded-[24px] adsvar-card p-3 sm:p-4 shadow-2xl relative group overflow-hidden">
          <div className="relative aspect-[16/9] w-full rounded-[18px] overflow-hidden bg-black flex items-center justify-center">
            <Image
              src="/extracted/image2_25_2989.png"
              alt="Adsvar Showcase Reel & Production"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-left">
              <div>
                <span className="adsvar-badge">Featured Production</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Viral Content Production & Multi-Platform Growth
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 hidden sm:block">
                  Menghasilkan 100K+ Organic Reach & Konversi Nyata bagi Klien
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                <TrendingUp className="w-4 h-4 text-[#FF5500]" />
                <span>+340% Engagement Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
