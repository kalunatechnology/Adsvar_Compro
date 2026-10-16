"use client";

import React from "react";
import type { CompanyStat } from "@/lib/types"; // 1. Import kembali tipe datanya

interface HeroSectionProps {
  stats?: CompanyStat[]; // 2. Tambahkan properti stats di sini agar TypeScript tidak error
  onOpenContact?: () => void;
}

export default function HeroSection({ stats, onOpenContact }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center font-sans overflow-hidden bg-[#050505]">
      
      {/* Background SVG di-load via CSS agar tidak ter-crop */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/background_hero.svg')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-[1200px]">
        
        {/* Headline */}
        <h1 className="text-[42px] md:text-[56px] lg:text-[70px] font-bold text-white tracking-[-0.02em] leading-[1.15] text-center w-full">
          Scale your brand with <span className="text-[#FF5500]">AI Powered &</span>
          <br className="hidden lg:block" />
          <span className="text-[#FF5500]">Human Crafted</span> social media strategy
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-[16px] md:text-[18px] lg:text-[20px] text-[#A1A1AA] font-medium text-center leading-[1.6] max-w-[850px]">
          End-to-end execution across content planning, high-converting copywriting, AI
          <br className="hidden md:block" /> 
          creation, short-form reels, and custom graphic & print design.
        </p>

        {/* Action Buttons Group */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          <button 
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-[#FF5500] hover:bg-[#E04B00] text-white font-medium text-[16px] transition-all shadow-[0_4px_14px_0_rgba(255,85,0,0.39)]"
          >
            Book A Consultation &rarr;
          </button>
          
          <button className="w-full sm:w-auto px-10 py-3.5 rounded-[10px] bg-transparent border border-[#444] hover:bg-[#222] text-white font-medium text-[16px] transition-all">
            View Works
          </button>
        </div>

        {/* Social Proof Section */}
        <div className="mt-20 flex items-center justify-center gap-4">
          {/* Overlapping Clean Circles */}
          <div className="flex items-center -space-x-3">
             <div className="w-[44px] h-[44px] rounded-full bg-[#FF9D5C] relative z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
             <div className="w-[44px] h-[44px] rounded-full bg-[#CC4E00] relative z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
             <div className="w-[44px] h-[44px] rounded-full bg-[#702D00] relative z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
          </div>
          
          {/* Proof Texts */}
          <div className="flex flex-col text-left justify-center gap-[2px]">
            <span className="text-[15px] font-medium text-white tracking-wide">
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