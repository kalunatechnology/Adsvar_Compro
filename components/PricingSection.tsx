"use client";

import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import type { PricingPlan } from "@/lib/types";

interface PricingSectionProps {
  plans: PricingPlan[];
  onOpenContact: () => void;
}

export default function PricingSection({ plans, onOpenContact }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"project" | "monthly">("project");

  return (
    <section id="harga" className="py-24 relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5500] mb-3">
            INVESTASI & PAKET
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Transparan, Terukur, & Siap Berkembang Bersama Anda
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Pilih paket yang paling sesuai dengan target pertumbuhan bisnis Anda saat ini.
          </p>

          {/* Toggle Switch matching SVG rect: x: 1536.59, y: 2365.32, rx: 7.45 */}
          <div className="mt-8 p-1 bg-[#13131D] border border-[#4C4C4C] rounded-[14px] inline-flex items-center">
            <button
              onClick={() => setBillingCycle("project")}
              className={`px-5 py-2.5 rounded-[10px] text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "project"
                  ? "bg-[#3C3C47] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Berbasis Proyek
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-[10px] text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#3C3C47] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Retainer Bulanan
            </button>
          </div>
        </div>

        {/* 5 Cards Grid from SQLite */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === "project" ? plan.priceProject : plan.priceMonthly;
            const period =
              price === "Kustom"
                ? ""
                : billingCycle === "project"
                ? "/proyek"
                : "/bln";

            return (
              <div
                key={plan.id}
                className={`p-5 flex flex-col justify-between ${
                  plan.isPopular ? "adsvar-card-popular lg:-translate-y-2" : "adsvar-card"
                }`}
              >
                {/* Popular Badge from SVG: x: 926, y: 2516, w: 160, h: 30, rx: 12, fill: #FF5500 */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 adsvar-badge shadow-xl flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge || "Paling Populer"}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 min-h-[36px] mb-4">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 my-4 pb-4 border-b border-[#3F3F45]">
                    <span className="text-2xl font-black text-white tracking-tight">
                      {price}
                    </span>
                    {period && <span className="text-xs text-zinc-400">{period}</span>}
                  </div>

                  {/* Checklist features */}
                  <ul className="space-y-2.5 my-4 text-xs text-zinc-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button from SVG (w: 251px, h: 46px, rx: 11.5px) */}
                <button
                  onClick={onOpenContact}
                  className={`w-full h-[46px] rounded-[11.5px] text-xs font-bold transition-all mt-6 flex items-center justify-center gap-1.5 ${
                    plan.isPopular
                      ? "bg-[#FF5500] hover:bg-[#E64A00] text-white shadow-lg shadow-[#FF5500]/30"
                      : "bg-[#383838] border border-[#525252] text-zinc-200 hover:border-zinc-400 hover:text-white"
                  }`}
                >
                  <span>Pilih Paket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
