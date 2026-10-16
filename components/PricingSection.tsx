"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/types";

export interface PricingSectionProps {
  plans: PricingPlan[];
  onOpenContact: (plan?: PricingPlan, billingCycle?: "monthly" | "project") => void;
  eyebrow?: string;
  heading?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  annualDiscountBadge?: string;
}

function AdsvarLogoMark({ className = "w-4 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1.5 12.5L6.2 2.2C6.6 1.3 7.8 1.3 8.2 2.2L11.8 10.2C12.2 11.1 13.4 11.1 13.8 10.2L18.5 1.5"
        stroke="#E35F21"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingSection({
  plans,
  onOpenContact,
  eyebrow = "ADSVAR ADVANTAGE",
  heading = "Select your scaling tier",
  monthlyLabel = "Monthly",
  annualLabel = "Annual Save",
  annualDiscountBadge = "-20%",
}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "project">("monthly");

  return (
    <section
      id="harga"
      className="py-20 sm:py-28 relative bg-[#13131D] text-white antialiased overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Bar 1: Eyebrow Badge (Adsvar Logo Mark + Orange Uppercase Ribbon) */}
        <div className="flex items-center gap-2.5 mb-8">
          <AdsvarLogoMark className="w-4 h-3.5 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E35F21]">
            {eyebrow}
          </span>
        </div>

        {/* Bar 2: Split Header Row (Left Heading + Right Billing Toggle) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-white tracking-[-0.025em] leading-[1.12]">
            {heading}
          </h2>

          {/* Toggle Switch Pill */}
          <div className="p-1 bg-[#0F0F17] border border-[#2B2B33] rounded-[10px] inline-flex items-center self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-[7px] text-xs font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#2A2A34] text-white shadow-sm"
                  : "text-[#8B8B97] hover:text-white"
              }`}
            >
              {monthlyLabel}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("project")}
              className={`px-4 py-2 rounded-[7px] text-xs font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "project"
                  ? "bg-[#2A2A34] text-white shadow-sm"
                  : "text-[#8B8B97] hover:text-white"
              }`}
            >
              <span>{annualLabel}</span>
              <span className="text-[#E35F21] font-semibold">{annualDiscountBadge}</span>
            </button>
          </div>
        </div>

        {/* Bar 3: 5 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {plans.map((plan, index) => {
            const rawPrice =
              billingCycle === "monthly" ? plan.priceMonthly : plan.priceProject;
            const isCustom =
              rawPrice.toLowerCase() === "custom" ||
              rawPrice.toLowerCase() === "kustom";
            const cleanPrice = rawPrice.replace(/^IDR\s*/i, "").replace(/^Rp\s*/i, "");
            const cardNumber = plan.number || String(index + 1).padStart(2, "0");

            return (
              <div
                key={plan.id}
                onClick={() => onOpenContact(plan, billingCycle)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenContact(plan, billingCycle);
                  }
                }}
                className={`group relative rounded-[20px] bg-[#16161F] px-5 pt-7 pb-6 flex flex-col justify-between min-h-[480px] transition-all duration-300 cursor-pointer text-left focus:outline-none ${
                  plan.isPopular
                    ? "border-[1.5px] border-[#FF5400] shadow-[0_0_25px_rgba(255,84,0,0.15)]"
                    : "border border-[#26262E] hover:border-[#8A8A92]"
                }`}
              >
                <div>
                  {/* Card Header: Index Number (01-05) & Inline MOST POPULAR Pill */}
                  <div className="flex items-center justify-between min-h-[28px] mb-5">
                    <span className="text-[11px] font-semibold text-[#8B8B97] tracking-wider">
                      {cardNumber}
                    </span>
                    {plan.isPopular && (
                      <span className="px-3 py-1 rounded-full bg-[#FF5400] text-[9.5px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_4px_14px_rgba(255,84,0,0.4)]">
                        {plan.badge || "MOST POPULAR"}
                      </span>
                    )}
                  </div>

                  {/* Package Name */}
                  <h3 className="text-[19px] font-semibold text-white leading-[1.28] tracking-[-0.015em] mb-3 whitespace-pre-line">
                    {plan.name}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-[11.5px] text-[#8B8B97] font-normal leading-normal mb-6 line-clamp-2">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="flex items-baseline mb-6">
                    {!isCustom && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8B8B97] mr-1.5">
                        IDR
                      </span>
                    )}
                    <span className="text-[25px] xl:text-[26px] font-bold text-white tracking-[-0.02em] leading-none">
                      {cleanPrice}
                    </span>
                    {!isCustom && (
                      <span className="text-[11px] text-[#8B8B97] font-normal ml-1.5">
                        {billingCycle === "monthly" ? "/mo" : "/th"}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 text-[11.5px] text-zinc-200">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span className="w-[17px] h-[17px] rounded-full bg-[#E35F21]/15 border border-[#E35F21]/50 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#E35F21] stroke-[2.5]" />
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContact(plan, billingCycle);
                  }}
                  className={`w-full h-[42px] rounded-[10px] text-[11.5px] font-medium transition-all duration-300 mt-8 flex items-center justify-center gap-1.5 ${
                    plan.isPopular
                      ? "bg-[#FF5400] text-white hover:bg-[#E04B00] shadow-[0_4px_14px_rgba(255,84,0,0.3)] font-semibold"
                      : "bg-[#252429] text-zinc-200 border border-[#37363E] group-hover:border-[#8C4A27] group-hover:bg-[#2E2D33] group-hover:text-white"
                  }`}
                >
                  <span>{isCustom ? "Build your scope" : "Pilih Paket Ini"}</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}