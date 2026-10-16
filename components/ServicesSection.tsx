"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import type { Service } from "@/lib/types";

export interface ServicesSectionProps {
  services: Service[];
  onOpenContact: (service?: Service) => void;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
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

export default function ServicesSection({
  services,
  onOpenContact,
  eyebrow = "ADSVAR ADVANTAGE",
  heading = "One team. Every Capability",
  subheading = "We combine creative instinct with intelligent systems to make brands impossible to ignore.",
}: ServicesSectionProps) {
  return (
    <section
      id="layanan"
      className="py-20 sm:py-24 relative bg-black text-white antialiased selection:bg-[#E35F21] selection:text-white"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header Bar 1: Eyebrow with Adsvar Orange Mark */}
        <div className="flex items-center gap-2.5 mb-8">
          <AdsvarLogoMark className="w-4 h-3.5 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E35F21]">
            {eyebrow}
          </span>
        </div>

        {/* Section Header Bar 2: Two-Column Header (Left Heading + Right Paragraph) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-[-0.025em] leading-[1.12]">
            {heading}
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-[#8B8B97] leading-[1.6] lg:max-w-[320px] font-normal">
            {subheading}
          </p>
        </div>

        {/* 4 Cards Grid - 1:1 Pixel-Accurate to Target Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenContact(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenContact(item);
                }
              }}
              className="adsvar-card group relative rounded-[20px] bg-[#16161F] border border-[#26262E] hover:border-[#98989A] px-6 pt-7 pb-6 flex flex-col justify-between min-h-[460px] transition-all duration-300 cursor-pointer text-left focus:outline-none focus:border-[#98989A]"
            >
              <div>
                {/* Card Top Category Tag (Grey -> Orange on Hover, no number index) */}
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8B8B97] group-hover:text-[#E35F21] transition-colors duration-300 mb-6">
                  {item.tag}
                </div>

                {/* Card Media: Pattern Rect Image Banner (h: 134.5px, rx: 6px) */}
                <div className="relative w-full h-[134.5px] rounded-[6px] overflow-hidden bg-black mb-7 border border-white/[0.04]">
                  <Image
                    src={item.image}
                    alt={item.name.replace("\n", " ")}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Card Title (2 lines) */}
                <h3 className="text-[23px] sm:text-[24px] font-semibold text-white leading-[1.22] tracking-[-0.02em] mb-4 whitespace-pre-line">
                  {item.name}
                </h3>

                {/* Card Description */}
                <p className="text-[13.5px] text-[#8B8B97] leading-[1.65] font-normal">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Simple Diagonal Arrow at Bottom-Right (Grey -> Orange on Hover) */}
              <div className="flex justify-end items-center pt-6 mt-auto">
                <ArrowDownRight className="w-5 h-5 text-[#8B8B97] group-hover:text-[#E35F21] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300 stroke-[1.75]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}