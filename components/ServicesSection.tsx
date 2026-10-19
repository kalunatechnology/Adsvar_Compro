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
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-[5%]">
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

        {/* 4 Cards Grid - Proporsi identik dengan desain referensi (352x458) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
              className="adsvar-card group relative flex flex-col justify-between w-full min-h-[458px] p-[24px] rounded-[20px] bg-[#121216] border border-white/[0.08] hover:border-white/[0.28] focus:outline-none focus:border-white/[0.28] transition-all duration-300 cursor-pointer text-left"
            >
              <div>
                {/* Card Top Category Tag */}
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8B8B97] group-hover:text-[#E35F21] transition-colors duration-300 mb-[16px]">
                  {item.tag}
                </div>

                {/* Card Media: Rasio 304:170 mengikuti desain asli secara proporsional */}
                <div className="relative w-full aspect-[304/170] rounded-[6px] overflow-hidden bg-black mb-[28px] border border-white/[0.04]">
                  <Image
                    src={item.image}
                    alt={item.name.replace("\n", " ")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Card Title (2 lines) */}
                <h3 className="text-[26px] xl:text-[28px] font-semibold text-white leading-[1.22] tracking-[-0.02em] mb-[16px] whitespace-pre-line">
                  {item.name}
                </h3>

                {/* Card Description */}
                <p className="text-[14px] xl:text-[14.5px] text-[#8B8B97] leading-[1.6] font-normal line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Diagonal Arrow */}
              <div className="flex justify-end items-center pt-6 mt-auto">
                <ArrowDownRight className="w-[18px] h-[18px] text-[#8B8B97] group-hover:text-[#E35F21] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300 stroke-[1.75]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}