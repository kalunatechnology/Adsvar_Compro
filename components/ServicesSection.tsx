"use client";

import { Code2, Video, Palette, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { Service } from "@/lib/types";

interface ServicesSectionProps {
  services: Service[];
  onOpenContact: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  "web-software-engineering": Code2,
  "video-reels-commercial-ads": Video,
  "brand-architecture-packaging": Palette,
  "performance-ads-strategy": Target,
};

export default function ServicesSection({ services, onOpenContact }: ServicesSectionProps) {
  return (
    <section id="layanan" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5500] mb-3">
            LAYANAN UNGGULAN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Solusi Menyeluruh untuk Pertumbuhan Digital Brand Anda
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
            Dari fondasi teknologi hingga eksekusi visual kreatif di media sosial,
            kami hadirkan ekosistem terpadu untuk mendominasi pasar.
          </p>
        </div>

        {/* 4 Cards Grid matching exact adsvar.svg dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = iconMap[item.slug] || Code2;
            return (
              <div
                key={item.id}
                className="adsvar-card p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Pattern Rect Image Banner (h: 134.5px, rx: 6px from adsvar.svg) */}
                  <div className="relative w-full h-[135px] rounded-[6px] overflow-hidden bg-black mb-5 border border-zinc-800">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161F] via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-zinc-200 uppercase tracking-wider">
                      {item.tag}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#20202F] text-[#FF5500] border border-[#3F3F45]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Key points */}
                  <ul className="space-y-2.5 mb-6 text-xs text-zinc-300">
                    {item.points &&
                      item.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Bottom CTA action */}
                <button
                  onClick={onOpenContact}
                  className="w-full py-3 px-4 rounded-[12px] bg-[#20202F] border border-[#3F3F45] hover:bg-[#FF5500] hover:border-[#FF5500] text-xs font-bold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Pilih Layanan Ini</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
