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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek ${project.title}`}
    >
      <div
        className="relative w-full max-w-[1000px] max-h-[92dvh] sm:max-h-[90vh] rounded-[20px] sm:rounded-[28px] border border-white/[0.08] bg-[#16161F] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail proyek"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div ref={scrollRef} className="overflow-y-auto overscroll-contain custom-modal-scroll">
          {/* Detail area */}
          <div className="px-4 sm:px-8 lg:px-[64px] pt-4 sm:pt-7 pb-8 sm:pb-12">
            {/* Back Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 text-[12px] sm:text-[13.5px] text-white/90 hover:text-[#FF5500] transition-colors mb-3.5 sm:mb-6 cursor-pointer"
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-[#8B8B9E]" />
              <span>Back to Project List</span>
            </button>

            {/* Hero image with responsive aspect ratio */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[1400/430] min-h-[170px] sm:min-h-[220px] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-black border border-white/[0.06]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
                className="object-cover"
                priority
              />
              {project.metrics && (
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2 sm:px-2.5 py-1 rounded-[6px] bg-[#1E1E26]/90 backdrop-blur-md border border-white/10 text-[9.5px] sm:text-[10.5px] font-medium text-white flex items-center gap-1.5 shadow-lg">
                  <AdsvarLogoMark />
                  <span>{project.metrics}</span>
                </div>
              )}
            </div>

            {/* Category + Client */}
            <div className="mt-4 sm:mt-7 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.05em] text-[#FF5500]">
              {project.category !== "Semua" ? project.category : project.client}
              {project.client && project.category !== "Semua" ? ` · ${project.client}` : ""}
            </div>

            {/* Project Title */}
            <h2 className="mt-1 sm:mt-2 text-[20px] sm:text-[28px] lg:text-[34px] font-medium text-white tracking-[-0.02em] leading-[1.2]">
              {project.title}
            </h2>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="mt-3.5 sm:mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/[0.12] text-[10.5px] sm:text-[12px] font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-4 sm:mt-7 space-y-3 sm:space-y-4 text-[12.5px] sm:text-[14px] text-[#C9C9D6] leading-[1.75] sm:leading-[1.85]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => onBookConsultation(project)}
              className="mt-6 sm:mt-8 w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-[10px] bg-[#FF5500] hover:bg-[#E04B00] text-white text-[13px] sm:text-[13.5px] font-medium shadow-[0_4px_16px_rgba(255,85,0,0.35)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Book A Consultation</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Similar Projects */}
          {similar.length > 0 && (
            <div className="bg-[#12121B] px-4 sm:px-8 lg:px-[64px] py-8 sm:py-12 border-t border-white/[0.04]">
              <h3 className="text-[19px] sm:text-[26px] lg:text-[30px] font-medium text-white tracking-[-0.02em] text-center mb-6 sm:mb-8">
                Similar Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
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
                    className="group rounded-[14px] bg-[#16161F] border border-[#292A2E] hover:border-[#52525E] overflow-hidden cursor-pointer transition-colors focus:outline-none"
                  >
                    <div className="relative aspect-[462/311] bg-black overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500"
                      />
                      <span className="absolute top-2.5 right-3 text-[24px] sm:text-[28px] font-semibold text-white leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.metrics && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-[5px] bg-[#1E1E26]/90 backdrop-blur-md border border-white/10 text-[9px] font-medium text-white flex items-center gap-1">
                          <AdsvarLogoMark className="h-2 w-auto" />
                          <span>{p.metrics}</span>
                        </div>
                      )}
                    </div>
                    <div className="px-3.5 py-3 flex items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold uppercase tracking-[0.06em] text-[#FF5500] mb-0.5 truncate">
                          {p.category}
                        </div>
                        <div className="text-[13.5px] sm:text-[14px] font-medium text-white truncate">{p.title}</div>
                      </div>
                      <span className="w-6 h-6 rounded-full border border-[#52525E] group-hover:bg-[#FF5400] group-hover:border-[#FF5400] text-[#9898A6] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                        <ArrowRight className="w-3 h-3" />
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
