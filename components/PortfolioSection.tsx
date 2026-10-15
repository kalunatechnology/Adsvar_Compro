"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Eye } from "lucide-react";
import type { Project } from "@/lib/types";

interface PortfolioSectionProps {
  initialProjects: Project[];
  onOpenContact: () => void;
}

const categories = ["Semua", "Video & Reels", "Sistem Web", "Brand Identity"];

export default function PortfolioSection({
  initialProjects,
  onOpenContact,
}: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState("Semua");

  const filteredProjects =
    activeTab === "Semua"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeTab);

  return (
    <section id="portofolio" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5500] mb-3 block">
              PORTOFOLIO KAMI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Karya Nyata yang Menghasilkan Dampak
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-zinc-400 text-sm sm:text-base max-w-md">
            Setiap proyek dikurasi dan diproduksi dengan ketelitian sinematik dan arsitektur kode modern.
          </p>
        </div>

        {/* Filter Tabs matching adsvar.svg: y: 3580 */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={activeTab === cat ? "adsvar-tab-active" : "adsvar-tab-inactive"}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3 Large Showcase Cards from SQLite (rx: 24px) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="adsvar-card overflow-hidden flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full bg-black overflow-hidden rounded-t-[23px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-black/20" />

                {/* Badge Metrik from SVG: y: 3956, w: 160, h: 30, rx: 12, fill: black */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-[12px] bg-black/85 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>{project.metrics}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Exact Circular SVG Action Button: y: 4086, w: 39, h: 39, rx: 19.5, fill: #404040, stroke: #84849B */}
                <div className="pt-4 border-t border-[#3F3F45] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-[6px] bg-[#20202F] text-[11px] font-medium text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="adsvar-circle-btn shrink-0 ml-3"
                    aria-label="Lihat Proyek"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
