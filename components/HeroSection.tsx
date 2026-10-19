"use client";

import React from "react";
import type { CompanyStat } from "@/lib/types";

interface HeroSectionProps {
  stats?: CompanyStat[];
  onOpenContact?: () => void;
}

export default function HeroSection({ stats = [], onOpenContact }: HeroSectionProps) {
  const handleScrollToPortfolio = () => {
    const el = document.getElementById("portofolio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center font-sans overflow-hidden bg-[#050505] pt-28 pb-16">
      {/* Background SVG di-load via CSS agar tidak ter-crop */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-90"
        style={{
          backgroundImage: "url('/background_hero.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-[5%] w-full max-w-[1920px]">
        {/* Headline: Spacious max-width (1380px), large font, and clean 2-line layout */}
        <h1 className="text-[34px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[72px] font-bold text-white tracking-[-0.025em] leading-[1.14] text-center w-full max-w-[1380px] mx-auto">
          <span className="inline sm:block">
            Scale your brand with{" "}
            <span className="text-[#FF5500]">AI Powered &amp;</span>
          </span>
          <span className="inline sm:block">
            <span className="text-[#FF5500]">Human Crafted</span> social media strategy
          </span>
        </h1>

        {/* Subtitle: Expanded max-width (860px) */}
        <p className="mt-7 text-[15px] sm:text-[17px] md:text-[18.5px] text-[#A1A1AA] font-normal text-center leading-[1.65] max-w-[860px] mx-auto">
          End-to-end execution across content planning, high-converting copywriting, AI
          <br className="hidden md:block" /> creation, short-form reels, and custom graphic &amp; print design.
        </p>

        {/* Action Buttons Group: +15% font size (15px) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-[#FF5500] hover:bg-[#E04B00] text-white font-medium text-[15px] transition-all shadow-[0_4px_18px_rgba(255,85,0,0.35)] cursor-pointer"
          >
            Book A Consultation &rarr;
          </button>

          <button
            type="button"
            onClick={handleScrollToPortfolio}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-transparent border border-[#444] hover:border-zinc-400 hover:bg-white/5 text-white font-medium text-[15px] transition-all cursor-pointer"
          >
            View Works
          </button>
        </div>

        {/* Social Proof Group: +15% font size (14px / 10px) */}
        <div className="mt-14 flex items-center justify-center gap-4">
          {/* Overlapping Circles */}
          <div className="flex items-center -space-x-3">
            <div className="w-[42px] h-[42px] rounded-full bg-[#FF9D5C] relative z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-black/20" />
            <div className="w-[42px] h-[42px] rounded-full bg-[#CC4E00] relative z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-black/20" />
            <div className="w-[42px] h-[42px] rounded-full bg-[#702D00] relative z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-black/20" />
          </div>

          {/* Proof Texts */}
          <div className="flex flex-col text-left justify-center gap-[2px]">
            <span className="text-[14px] font-semibold text-white tracking-wide">
              Trusted by 20+ growth teams
            </span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.18em]">
              STRATEGY, CONTENT, DISTRIBUTION, ONE PARTNER.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}