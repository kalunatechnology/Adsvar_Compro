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

function AdsvarLogoMark({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Adsvar_icon.svg"
      alt="Adsvar Icon"
      className={`${className} object-contain shrink-0`}
    />
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
      className="py-24 sm:py-32 relative bg-[#0D0D14] text-white antialiased overflow-hidden"
    >
      {/* Container: 5% wider (max-w-[1620px]) aligned to the 5% padding guideline */}
      <div className="max-w-[1620px] mx-auto px-4 sm:px-6 lg:px-[5%]">
        {/* Bar 1: Eyebrow Badge (Official Adsvar Logo Mark + Orange Uppercase Ribbon) */}
        <div className="flex items-center gap-2.5 mb-7">
          <AdsvarLogoMark className="h-3.5 w-auto" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FF5500]">
            {eyebrow}
          </span>
        </div>

        {/* Bar 2: Split Header Row (Left Heading + Right Billing Toggle) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.025em] leading-[1.15]">
            {heading}
          </h2>

          {/* Toggle Switch Pill */}
          <div className="p-1 bg-[#14141E] border border-[#262635] rounded-[10px] inline-flex items-center self-start sm:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-[7px] text-xs font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#262636] text-white shadow-sm"
                  : "text-[#8E8EA0] hover:text-white"
              }`}
            >
              {monthlyLabel}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("project")}
              className={`px-4 py-2 rounded-[7px] text-xs font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "project"
                  ? "bg-[#262636] text-white shadow-sm"
                  : "text-[#8E8EA0] hover:text-white"
              }`}
            >
              <span>{annualLabel}</span>
              <span className="text-[#FF5500] font-bold">{annualDiscountBadge}</span>
            </button>
          </div>
        </div>

        {/* Bar 3: 5 Tier Cards Grid - 1:1 Pixel-Accurate to Image 2 Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
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
                className={`group relative rounded-[22px] bg-[#14141F] p-6 lg:p-7 flex flex-col justify-between min-h-[580px] lg:min-h-[600px] transition-all duration-300 cursor-pointer text-left focus:outline-none ${
                  plan.isPopular
                    ? "border-2 border-[#FF5500] shadow-[0_0_35px_rgba(255,85,0,0.22)]"
                    : "border border-[#232332] hover:border-[#38384C]"
                }`}
              >
                <div>
                  {/* Card Header: Index Number (01-05) & Inline MOST POPULAR Pill */}
                  <div className="flex items-center justify-between min-h-[26px] mb-6">
                    <span className="text-[11px] font-mono text-[#6E6E80] tracking-wider">
                      {cardNumber}
                    </span>
                    {plan.isPopular && (
                      <span className="px-3 py-1 rounded-[6px] bg-[#FF5500] text-white font-bold text-[9.5px] uppercase tracking-[0.08em] shadow-[0_2px_10px_rgba(255,85,0,0.35)]">
                        {plan.badge || "MOST POPULAR"}
                      </span>
                    )}
                  </div>

                  {/* Package Name */}
                  <h3 className="text-[20px] sm:text-[21px] font-semibold text-white leading-snug tracking-[-0.015em] mb-2 whitespace-pre-line">
                    {plan.name}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-[12px] sm:text-[12.5px] text-[#7A7A8E] font-normal leading-normal mb-8 line-clamp-2">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="flex items-baseline mb-8">
                    {!isCustom && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A7A8E] mr-2">
                        IDR
                      </span>
                    )}
                    <span className="text-[26px] sm:text-[28px] font-bold text-white tracking-[-0.02em] leading-none">
                      {isCustom ? "Custom" : cleanPrice}
                    </span>
                    {!isCustom && (
                      <span className="text-[11.5px] text-[#7A7A8E] font-normal ml-2">
                        {billingCycle === "monthly" ? "/mo" : "/th"}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 text-[12px] sm:text-[12.5px] text-[#A6A6BA]">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className="w-[19px] h-[19px] rounded-full bg-[#FF5500]/15 border border-[#FF5500]/60 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#FF5500] stroke-[2.5]" />
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button - Sleek Dark Luxury Button for All Cards (Matching Image 2) */}
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContact(plan, billingCycle);
                    }}
                    className="w-full h-[46px] rounded-[11px] bg-[#1C1C28] hover:bg-[#252536] border border-[#2F2F40] hover:border-[#4B4B62] text-[#D4D4E4] hover:text-white text-[12px] sm:text-[12.5px] font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                  >
                    <span>{isCustom ? "Build your scope" : "Choose this package"}</span>
                    <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}