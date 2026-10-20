"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowDownLeft, X } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectDetailModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onBookConsultation: (project: Project) => void;
}

function AdsvarLogoMark({ className = "h-2.5 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Adsvar_icon.svg" alt="Adsvar Icon" className={`${className} object-contain shrink-0`} />
  );
}

export default function ProjectDetailModal({
  project,
  projects,
  onClose,
  onSelectProject,
  onBookConsultation,
}: ProjectDetailModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isOpen = !!project;

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  // Scroll to top when switching project
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project?.id]);

  if (!project) return null;

  const similar = projects
    .filter((p) => p.id !== project.id)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3);

  const paragraphs = project.description
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek ${project.title}`}
    >
      <div
        className="relative w-full max-w-[1000px] max-h-[94vh] rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#16161F] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail proyek"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div ref={scrollRef} className="overflow-y-auto overscroll-contain">
          {/* Detail area */}
          <div className="px-5 sm:px-10 lg:px-[88px] pt-8 sm:pt-[58px] pb-10 sm:pb-14">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-[13px] sm:text-[14px] text-white/90 hover:text-[#FF5500] transition-colors mb-6 sm:mb-8 cursor-pointer"
            >
              <ArrowDownLeft className="w-4 h-4 text-[#8B8B9E]" />
              <span>Back to Project List</span>
            </button>

            {/* Hero image */}
            <div className="relative w-full aspect-[1400/430] min-h-[180px] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-black border border-white/[0.06]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 840px"
                className="object-cover"
                priority
              />
              {project.metrics && (
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-[6px] bg-[#1E1E26]/85 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-medium text-white flex items-center gap-1.5">
                  <AdsvarLogoMark />
                  <span>{project.metrics}</span>
                </div>
              )}
            </div>

            {/* Category + Title */}
            <div className="mt-7 sm:mt-10 text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.04em] text-[#FF5500]">
              {project.category !== "Semua" ? project.category : project.client}
              {project.client && project.category !== "Semua" ? ` · ${project.client}` : ""}
            </div>
            <h2 className="mt-2 text-[26px] sm:text-[38px] font-medium text-white tracking-[-0.02em] leading-[1.15]">
              {project.title}
            </h2>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 sm:px-5 py-2 rounded-full border border-white/[0.14] text-[11.5px] sm:text-[13px] font-medium text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-7 sm:mt-9 space-y-5 text-[13px] sm:text-[15px] text-[#C9C9D6] leading-[1.9]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onBookConsultation(project)}
              className="mt-8 px-6 py-3 rounded-[10px] bg-[#FF5500] hover:bg-[#E04B00] text-white text-[13.5px] font-medium shadow-[0_4px_16px_rgba(255,85,0,0.35)] transition-all cursor-pointer"
            >
              Book A Consultation &rarr;
            </button>
          </div>

          {/* Similar Projects */}
          {similar.length > 0 && (
            <div className="bg-[#12121B] px-5 sm:px-10 lg:px-[88px] py-10 sm:py-16 border-t border-white/[0.04]">
              <h3 className="text-[24px] sm:text-[38px] font-medium text-white tracking-[-0.02em] text-center mb-8 sm:mb-12">
                Similar Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {similar.map((p, i) => (
                  <div
                    key={p.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectProject(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectProject(p);
                      }
                    }}
                    className="group rounded-[16px] bg-[#16161F] border border-[#292A2E] hover:border-[#52525E] overflow-hidden cursor-pointer transition-colors focus:outline-none"
                  >
                    <div className="relative aspect-[462/311] bg-black overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500"
                      />
                      <span className="absolute top-3 right-4 text-[30px] font-semibold text-white leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.metrics && (
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-[6px] bg-[#1E1E26]/85 backdrop-blur-md border border-white/10 text-[9.5px] font-medium text-white flex items-center gap-1.5">
                          <AdsvarLogoMark className="h-2 w-auto" />
                          <span>{p.metrics}</span>
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold uppercase tracking-[0.06em] text-[#FF5500] mb-1 truncate">
                          {p.category}
                        </div>
                        <div className="text-[15px] font-medium text-white truncate">{p.title}</div>
                      </div>
                      <span className="w-7 h-7 rounded-full border border-[#52525E] group-hover:bg-[#FF5400] group-hover:border-[#FF5400] text-[#9898A6] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
