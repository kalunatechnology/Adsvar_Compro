"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";

export interface PortfolioSectionProps {
  initialProjects: Project[];
  onOpenContact: (project?: Project) => void;
  eyebrow?: string;
  headingWhite?: string;
  headingMuted?: string;
  subheading?: string;
}

const CATEGORIES = [
  "Semua",
  "Video & Reels",
  "Brand Identity",
  "Sistem Web",
];

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

export default function PortfolioSection({
  initialProjects,
  onOpenContact,
  eyebrow = "PORTOFOLIO KAMI",
  headingWhite = "Work that moves culture ",
  headingMuted = "and metrics.",
  subheading = "Not content for content's sake. Every campaign is designed around a measurable commercial outcome.",
}: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState("Semua");

  const filteredProjects =
    activeTab === "Semua" || activeTab === "All work"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeTab);

  return (
    <section
      id="portofolio"
      className="py-20 sm:py-28 relative bg-black text-white antialiased"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5%]">
        {/* Bar 1: Eyebrow Badge (Adsvar Logo Mark + Orange Uppercase Ribbon) */}
        <div className="flex items-center gap-2.5 mb-8">
          <AdsvarLogoMark className="w-4 h-3.5 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E35F21]">
            {eyebrow}
          </span>
        </div>

        {/* Bar 2: Split Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.12]">
            <span className="text-white">{headingWhite}</span>
            <span className="text-[#7D7D8C]">{headingMuted}</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-[#8B8B97] leading-[1.6] lg:max-w-[340px] font-normal">
            {subheading}
          </p>
        </div>

        {/* Bar 3: Filter Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-[#FF5400] text-white font-semibold border border-[#FF5400] shadow-[0_4px_14px_rgba(255,84,0,0.3)]"
                    : "bg-[#121218] text-zinc-300 font-medium border border-[#2C2C35] hover:border-zinc-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Bar 4: Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const cardNumber = project.number || String(index + 1).padStart(2, "0");

            return (
              <div
                key={project.id}
                onClick={() => onOpenContact(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenContact(project);
                  }
                }}
                className="adsvar-card group relative rounded-[24px] bg-[#16161F] border border-[#292A2E] hover:border-[#52525E] overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer text-left focus:outline-none focus:border-[#52525E]"
              >
                {/* Media Container with Grayscale -> Color on Hover */}
                <div className="relative aspect-[462/311] w-full bg-black overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500 ease-out"
                  />

                  {/* Top Contrast Vignette */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

                  {/* Large Index Number (01, 02, 03) */}
                  <span className="pointer-events-none absolute top-5 right-6 text-[44px] sm:text-[48px] font-semibold text-white leading-none tracking-[-0.03em] select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    {cardNumber}
                  </span>

                  {/* Metrics Badge */}
                  {project.metrics && (
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-[8px] bg-[#1E1E26]/85 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white flex items-center gap-2 shadow-lg">
                      <AdsvarLogoMark className="w-3.5 h-3 shrink-0" />
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer Content */}
                <div className="px-6 py-6 bg-[#16161F] flex items-center justify-between gap-4 border-t border-white/[0.04]">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#E35F21] mb-1.5">
                      {project.client || project.category}
                    </div>
                    <h3 className="text-[18px] sm:text-[19px] font-semibold text-white tracking-[-0.015em] leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* Interactive Rotating Circle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenContact(project);
                    }}
                    aria-label={`Lihat proyek ${project.title}`}
                    className="w-10 h-10 rounded-full bg-transparent border border-[#52525E] text-[#9898A6] group-hover:bg-[#FF5400] group-hover:border-[#FF5400] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-300 stroke-[2]" />
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