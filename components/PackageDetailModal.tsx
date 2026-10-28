"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  ArrowRight,
  TrendingUp,
  Layers,
  Palette,
  ShieldCheck,
  Table as TableIcon,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import AdsvarEmblem from "@/components/AdsvarEmblem";
import {
  PLATFORM_PACKAGE_DETAILS,
  PlatformKey,
  TierSpecDetail,
} from "@/data/packagesComparison";
import type { PricingPlan } from "@/lib/types";

export interface PackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlatform?: PlatformKey;
  initialTierId?: string;
  onSelectPackage: (plan: PricingPlan, cycle?: "monthly" | "project") => void;
  onOpenConsultation?: (title?: string) => void;
}

export default function PackageDetailModal({
  isOpen,
  onClose,
  initialPlatform = "Meta",
  initialTierId = "ads-content-growth",
  onSelectPackage,
  onOpenConsultation,
}: PackageDetailModalProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>(initialPlatform);
  const [selectedTierId, setSelectedTierId] = useState<string>(initialTierId);
  const [viewMode, setViewMode] = useState<"detail" | "table">("detail");

  useEffect(() => {
    if (isOpen) {
      if (initialPlatform) setActivePlatform(initialPlatform);
      if (initialTierId) setSelectedTierId(initialTierId);
    }
  }, [isOpen, initialPlatform, initialTierId]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPlatformData = PLATFORM_PACKAGE_DETAILS[activePlatform];
  const activeTier =
    currentPlatformData.tiers.find((t) => t.id === selectedTierId) ||
    currentPlatformData.tiers[0];

  const handleChooseTier = (tier: TierSpecDetail) => {
    const fakePlan: PricingPlan = {
      id: 990 + Number(tier.number || 1),
      slug: `${activePlatform.toLowerCase().replace(/\s+/g, "-")}-${tier.id}`,
      name: `${activePlatform} · ${tier.name}`,
      description: currentPlatformData.intro,
      priceMonthly: tier.price,
      priceProject: tier.price,
      isPopular: !!tier.isPopular,
      badge: tier.badge || "",
      features: [
        tier.adSpend,
        tier.campaigns,
        tier.audiencesOrKeywords,
        tier.adContent,
      ],
      sortOrder: Number(tier.number || 1),
      isActive: true,
    };
    onClose();
    onSelectPackage(fakePlan, "monthly");
  };

  const platforms: PlatformKey[] = ["Meta", "Google", "TikTok", "GMV Max", "Shopee"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1080px] max-h-[92vh] flex flex-col rounded-[20px] bg-[#0E0F14] border border-white/[0.14] shadow-2xl text-white overflow-hidden"
      >
        {/* Header Bar */}
        <div className="shrink-0 p-5 sm:p-6 border-b border-white/[0.08] bg-[#12131A]/90 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AdsvarEmblem className="h-3.5 w-auto" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E35F21]">
                  PACKAGE SPECIFICATIONS &amp; COMPARISON
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-white/[0.08] text-[#8B8B97]">
                  {currentPlatformData.displayName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em]">
                {viewMode === "detail"
                  ? `${currentPlatformData.displayName} • ${activeTier.name}`
                  : `Full Comparison Table • ${currentPlatformData.displayName}`}
              </h2>
              <p className="text-[12px] sm:text-[13px] text-[#8B8B97] mt-1 max-w-[680px]">
                {currentPlatformData.intro}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-[8px] bg-white/[0.06] hover:bg-white/[0.12] text-[#8B8B97] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Bar: Platform Switcher & View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-white/[0.06]">
            {/* Platform Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {platforms.map((p) => {
                const isSelected = activePlatform === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setActivePlatform(p)}
                    className={`px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${isSelected
                        ? "bg-[#E35F21] text-white font-semibold shadow-sm"
                        : "bg-white/[0.04] text-[#8B8B97] hover:text-white hover:bg-white/[0.08]"
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Deep Dive vs Side-by-side Table */}
            <div className="flex items-center gap-1 p-0.5 rounded-[8px] bg-white/[0.05] border border-white/[0.08] self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("detail")}
                className={`px-3 py-1 rounded-[6px] text-[11.5px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "detail"
                    ? "bg-[#E35F21] text-white font-semibold shadow-sm"
                    : "text-[#8B8B97] hover:text-white"
                  }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Tier Details</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 rounded-[6px] text-[11.5px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "table"
                    ? "bg-[#E35F21] text-white font-semibold shadow-sm"
                    : "text-[#8B8B97] hover:text-white"
                  }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Comparison Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-7 space-y-6">
          {viewMode === "detail" ? (
            <>
              {/* Tier Selection Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {currentPlatformData.tiers.map((tier) => {
                  const isCur = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`px-3.5 py-2 rounded-[10px] text-left transition-all border shrink-0 cursor-pointer ${isCur
                          ? "bg-[#E35F21]/15 border-[#E35F21] text-white shadow-sm"
                          : "bg-[#14151D] border-white/[0.08] text-[#8B8B97] hover:text-white hover:border-white/[0.18]"
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono opacity-60">
                          {tier.number}
                        </span>
                        {tier.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-[#E35F21] text-white">
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[12.5px] font-semibold text-white">
                        {tier.name}
                      </div>
                      <div className="text-[11px] text-[#E35F21] font-mono font-medium">
                        {tier.price}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Price Banner & Primary CTA */}
              <div className="p-4 sm:p-5 rounded-[14px] bg-[#14151E] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight">
                      {activeTier.price}
                    </span>
                    <span className="text-[12px] text-[#8B8B97]">
                      *excludes ad spend &amp; 12% VAT
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-[12px] text-[#A1A1AA]">
                    <span className="text-[#E35F21] font-semibold">
                      Setup: {activeTier.setupFee}
                    </span>
                    <span>•</span>
                    <span>Ad Spend: <strong className="text-white">{activeTier.adSpend}</strong></span>
                    <span>•</span>
                    <span>Optimization: <strong className="text-white">{activeTier.optimization}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleChooseTier(activeTier)}
                    className="px-5 py-2.5 rounded-[9px] bg-[#E35F21] hover:bg-[#D05318] text-white font-semibold text-[13px] flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Choose this package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown Grid (4 Key Pillars) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pillar 1: Campaigns & Audiences */}
                <div className="p-4 sm:p-5 rounded-[14px] bg-[#12131A] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-[14px] mb-3.5 pb-2.5 border-b border-white/[0.06]">
                    <Layers className="w-4 h-4 text-[#E35F21]" />
                    <span>Campaigns &amp; Audience Targeting</span>
                  </div>
                  <dl className="space-y-3 text-[12.5px]">
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Ad Spend Managed
                      </dt>
                      <dd className="text-white font-semibold mt-0.5">
                        {activeTier.adSpend}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Campaign Structure
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.campaigns}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        {currentPlatformData.audiencesLabel}
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.audiencesOrKeywords}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Pillar 2: Content & Creatives */}
                <div className="p-4 sm:p-5 rounded-[14px] bg-[#12131A] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-[14px] mb-3.5 pb-2.5 border-b border-white/[0.06]">
                    <Palette className="w-4 h-4 text-[#E35F21]" />
                    <span>Creative Engine &amp; Copywriting</span>
                  </div>
                  <dl className="space-y-3 text-[12.5px]">
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Ad Content Production
                      </dt>
                      <dd className="text-white font-semibold mt-0.5">
                        {activeTier.adContent}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        {currentPlatformData.variationsLabel}
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.variations}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Content Revisions
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.contentRevisions === "—"
                          ? "N/A (Client provides ad creative assets)"
                          : activeTier.contentRevisions}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Pillar 3: Optimization & Reporting */}
                <div className="p-4 sm:p-5 rounded-[14px] bg-[#12131A] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-[14px] mb-3.5 pb-2.5 border-b border-white/[0.06]">
                    <TrendingUp className="w-4 h-4 text-[#E35F21]" />
                    <span>Optimization &amp; Account Management</span>
                  </div>
                  <dl className="space-y-3 text-[12.5px]">
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Optimization Frequency
                      </dt>
                      <dd className="text-white font-semibold mt-0.5">
                        {activeTier.optimization}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Performance Reporting
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.reports}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Strategy Reviews &amp; Evaluations
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.review === "—" ? "Upon request / Monthly review report" : activeTier.review}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Pillar 4: Support & Governance */}
                <div className="p-4 sm:p-5 rounded-[14px] bg-[#12131A] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-[14px] mb-3.5 pb-2.5 border-b border-white/[0.06]">
                    <ShieldCheck className="w-4 h-4 text-[#E35F21]" />
                    <span>Support, Setup &amp; Research</span>
                  </div>
                  <dl className="space-y-3 text-[12.5px]">
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Account &amp; Tracking Setup
                      </dt>
                      <dd className="text-white font-semibold mt-0.5">
                        {activeTier.setupFee}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Support Level (SLA)
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.support}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#8B8B97] text-[11px] uppercase tracking-wider">
                        Competitor &amp; Trend Research
                      </dt>
                      <dd className="text-white font-medium mt-0.5">
                        {activeTier.competitorResearch}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Extra Platform Highlights (e.g. Negative Keywords, GA4, Spark Ads) */}
              {activeTier.extraHighlights && activeTier.extraHighlights.length > 0 && (
                <div className="p-4 rounded-[12px] bg-[#14151D] border border-white/[0.08]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B8B97] mb-2.5">
                    Platform-Specific Inclusions:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px]">
                    {activeTier.extraHighlights.map((ex, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#E35F21] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[#8B8B97]">{ex.label}: </span>
                          <span className="text-white font-medium">{ex.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Platform Notes (e.g. TikTok spend requirement, GMV Max product videos) */}
              {currentPlatformData.specialNotes && (
                <div className="p-4 rounded-[12px] bg-[#E35F21]/08 border border-[#E35F21]/20">
                  <div className="flex items-center gap-1.5 text-[#E35F21] font-semibold text-[12px] mb-1.5">
                    <Info className="w-4 h-4" />
                    <span>Important Notes for {currentPlatformData.displayName}:</span>
                  </div>
                  <ul className="space-y-1 text-[12px] text-[#D1D1DE]">
                    {currentPlatformData.specialNotes.map((note, nIdx) => (
                      <li key={nIdx} className="flex items-start gap-2">
                        <span className="text-[#E35F21]">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standard Included Features in Every Package */}
              <div className="p-4 sm:p-5 rounded-[14px] bg-[#101117] border border-white/[0.06]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B8B97] mb-3">
                  Standard features included across all {currentPlatformData.displayName} packages:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#A1A1B0]">
                  {currentPlatformData.standardFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#E35F21] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Full Side-by-Side Comparison Table */
            <div className="space-y-4">
              <p className="text-[12.5px] text-[#8B8B97]">
                Side-by-side comparison across all 5 tiers for <strong className="text-white">{currentPlatformData.displayName}</strong>. Scroll horizontally to view all columns.
              </p>

              <div className="overflow-x-auto rounded-[12px] border border-white/[0.08] bg-[#12131A] scrollbar-thin">
                <table className="w-full text-left text-[12px] border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-[#161722]">
                      <th className="p-3.5 text-[11px] font-semibold uppercase text-[#8B8B97] w-[200px] sticky left-0 bg-[#161722] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Features &amp; Deliverables
                      </th>
                      {currentPlatformData.tiers.map((tier) => (
                        <th
                          key={tier.id}
                          className={`p-3.5 font-semibold text-center w-[180px] ${tier.id === selectedTierId
                              ? "bg-[#E35F21]/15 text-white border-x border-[#E35F21]/40"
                              : "text-white"
                            }`}
                        >
                          <div className="text-[10px] font-mono opacity-60">
                            {tier.number}
                          </div>
                          <div className="text-[12.5px] whitespace-nowrap">
                            {tier.name}
                          </div>
                          <div className="text-[12px] text-[#E35F21] font-bold mt-0.5">
                            {tier.price}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {/* Row 1: Price */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Monthly Price
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center font-bold text-white">
                          {t.price}
                        </td>
                      ))}
                    </tr>

                    {/* Row 2: Ad Spend Managed */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Ad Spend Managed
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.adSpend}
                        </td>
                      ))}
                    </tr>

                    {/* Row 3: Campaigns */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Campaign Structure
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.campaigns}
                        </td>
                      ))}
                    </tr>

                    {/* Row 4: Audiences / Keywords / Types */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        {currentPlatformData.audiencesLabel}
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.audiencesOrKeywords}
                        </td>
                      ))}
                    </tr>

                    {/* Row 5: Ad Content */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Ad Content Production
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center font-medium text-white">
                          {t.adContent}
                        </td>
                      ))}
                    </tr>

                    {/* Row 6: Variations */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        {currentPlatformData.variationsLabel}
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.variations}
                        </td>
                      ))}
                    </tr>

                    {/* Row 7: Optimization */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Optimization Frequency
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center font-semibold text-white">
                          {t.optimization}
                        </td>
                      ))}
                    </tr>

                    {/* Row 8: Reports */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Performance Reporting
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.reports}
                        </td>
                      ))}
                    </tr>

                    {/* Row 9: Review */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Strategy Reviews
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.review}
                        </td>
                      ))}
                    </tr>

                    {/* Row 10: Support */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Support SLA
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.support}
                        </td>
                      ))}
                    </tr>

                    {/* Row 11: Setup Fee */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Setup &amp; Tracking
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center font-semibold text-[#E35F21]">
                          {t.setupFee}
                        </td>
                      ))}
                    </tr>

                    {/* Row 12: Competitor Research */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Competitor Research
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.competitorResearch}
                        </td>
                      ))}
                    </tr>

                    {/* Row 13: Content Revisions */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 text-[#8B8B97] font-medium sticky left-0 bg-[#12131A] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                        Content Revisions
                      </td>
                      {currentPlatformData.tiers.map((t) => (
                        <td key={t.id} className="p-3 text-center text-[#D1D1DE]">
                          {t.contentRevisions}
                        </td>
                      ))}
                    </tr>

                    {/* Action Row */}
                    <tr className="bg-[#141520]">
                      <td className="p-3 sticky left-0 bg-[#141520] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.3)]"></td>
                      {currentPlatformData.tiers.map((tier) => (
                        <td key={tier.id} className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleChooseTier(tier)}
                            className="w-full py-2 px-2.5 rounded-[7px] bg-[#E35F21] hover:bg-[#D05318] text-white text-[11.5px] font-semibold transition-all cursor-pointer whitespace-nowrap shadow-sm"
                          >
                            Choose package
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 p-4 sm:p-5 border-t border-white/[0.08] bg-[#12131A]/95 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-[#8B8B97]">
          <span>
            * Per platform, per month. Excludes ad spend and 12% VAT.
          </span>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[8px] bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => handleChooseTier(activeTier)}
              className="px-5 py-2 rounded-[8px] bg-[#E35F21] hover:bg-[#D05318] text-white font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
