"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import AdsvarEmblem from "@/components/AdsvarEmblem";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function ConsultationPageClient() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultServiceName, setDefaultServiceName] = useState("Free Ads Audit & Strategy");

  const handleOpenConsultation = (title?: string) => {
    setDefaultServiceName(title || "Free Ads Audit & Strategy");
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      <Navbar onOpenContact={() => handleOpenConsultation("Book a Free Consultation")} />

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-[5%] max-w-[1520px] mx-auto">
        <h1 className="sr-only">
          Free Ads Audit &amp; Growth Consultation — Adsvar Digital Agency
        </h1>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/25 text-[#FF5500] text-xs font-semibold tracking-wider uppercase mb-6">
            <AdsvarEmblem className="h-3 w-auto" />
            <span>Zero-Cost Strategy Session</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
            Your ads are running. <br />
            <span className="text-[#FF5500]">Are they generating profit?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-8">
            Get an exhaustive ad account audit, waste spend breakdown, and customized 90-day scaling roadmap from our senior media buyers. No obligations, zero lock-in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenConsultation("Free Ads Account Audit")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-base transition-all shadow-lg shadow-[#FF5500]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim Free 90-Day Audit</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/6282322308719?text=Hello%2C%20I%20would%20like%20to%20request%20a%20Free%20Ads%20Audit%20with%20Adsvar."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-medium text-base transition-colors text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Waste Spend Elimination</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We pinpoint fatigued creatives, misaligned targeting, and non-converting ad sets draining your monthly budget.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Full-Funnel Creative Review</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Examine hook rates, hold rates, and direct-response video hooks against our industry benchmark database.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Data-Backed Scaling Plan</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Receive actionable, platform-specific recommendations ready for immediate deployment on Meta, Google, or TikTok.
            </p>
          </div>
        </div>
      </main>

      <Footer onOpenContact={() => handleOpenConsultation("Free Ads Audit")} />
      <BottomBar />

      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultPackageChoice={defaultServiceName}
      />
    </div>
  );
}
