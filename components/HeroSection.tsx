"use client";

import React from "react";
import Image from "next/image";
import type { CompanyStat } from "@/lib/types";

interface HeroSectionProps {
  stats?: CompanyStat[];
  onOpenContact?: () => void;
}

export default function HeroSection({ stats = [], onOpenContact }: HeroSectionProps) {
  const handleScrollToPackages = () => {
    const el = document.getElementById("harga");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center font-sans overflow-hidden bg-[#050505] pt-24 pb-12">
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
        {/* Label Atas (Kecil) */}
        <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#FF5500] mb-3 select-none">
          PERFORMANCE ADS AGENCY
        </span>

        {/* Headline: Clean 2-line layout */}
        <h1 className="text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[58px] font-bold text-white tracking-[-0.025em] leading-[1.14] text-center w-full max-w-[1360px] mx-auto">
          <span className="inline sm:block">
            Scale Your Brand with{" "}
            <span className="text-[#FF5500]">AI Powered &amp;</span>
          </span>{" "}
          <span className="inline sm:block">
            <span className="text-[#FF5500]">Growth Performance</span>{" "}
            <span>Strategy</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-[13px] sm:text-[14.5px] md:text-[15.5px] text-[#A1A1AA] font-normal text-center leading-[1.65] max-w-[760px] mx-auto">
          We run your performance marketing, and produces them,
          <br className="hidden md:block" /> from script to ready-to-launch video.
        </p>

        {/* Action Buttons Group */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[8px] bg-[#FF5500] hover:bg-[#E04B00] text-white font-medium text-[13.5px] transition-all shadow-[0_4px_16px_rgba(255,85,0,0.35)] cursor-pointer"
          >
            Book a Free Consultation &rarr;
          </button>

          <button
            type="button"
            onClick={handleScrollToPackages}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[8px] bg-transparent border border-[#444] hover:border-zinc-400 hover:bg-white/5 text-white font-medium text-[13.5px] transition-all cursor-pointer"
          >
            See Packages
          </button>
        </div>

        {/* Social Proof Group */}
        <div className="mt-9 sm:mt-10 flex items-center justify-center gap-3.5">
          {/* Overlapping Circles */}
          <div className="flex items-center -space-x-2.5">
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative z-30 shadow-[0_0_12px_rgba(0,0,0,0.5)] border-2 border-black">
              <Image
                src="/avatars/avatar-1.png"
                alt="Client 1"
                width={72}
                height={72}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative z-20 shadow-[0_0_12px_rgba(0,0,0,0.5)] border-2 border-black">
              <Image
                src="/avatars/avatar-2.png"
                alt="Client 2"
                width={72}
                height={72}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative z-10 shadow-[0_0_12px_rgba(0,0,0,0.5)] border-2 border-black">
              <Image
                src="/avatars/avatar-3.png"
                alt="Client 3"
                width={72}
                height={72}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Proof Texts */}
          <div className="flex flex-col text-left justify-center gap-[2px]">
            <span className="text-[12.5px] font-semibold text-white tracking-wide">
              Trusted by 20+ growth teams, One Marketing Solution Partner
            </span>
            <span className="text-[9.5px] text-zinc-500 font-bold uppercase tracking-[0.16em]">
              Meta · Google · TikTok · TikTok Shop · Shopee
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}