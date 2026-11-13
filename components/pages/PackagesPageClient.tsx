"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PricingSection, { PlatformKey } from "@/components/PricingSection";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import PackageModal from "@/components/PackageModal";
import type { PricingPlan } from "@/lib/types";

interface PackagesPageClientProps {
  initialPlans: PricingPlan[];
}

export default function PackagesPageClient({ initialPlans }: PackagesPageClientProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultServiceName, setDefaultServiceName] = useState("");

  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "project">("monthly");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>("Meta");

  const handleOpenConsultation = (title?: string) => {
    setDefaultServiceName(title || "Package Consultation");
    setIsConsultationOpen(true);
  };

  const handleOpenPackage = (plan?: PricingPlan, cycle: "monthly" | "project" = "monthly") => {
    setSelectedPlan(plan || initialPlans[0] || null);
    setBillingCycle(cycle);
    setIsPackageOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      <Navbar onOpenContact={() => handleOpenConsultation("Book a Free Consultation")} />

      <main className="pt-24 lg:pt-28">
        <h1 className="sr-only">
          Pricing &amp; Packages — Transparent Monthly Performance Ad Management | Adsvar
        </h1>

        <PricingSection
          plans={initialPlans}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          onOpenContact={(plan, cycle) => handleOpenPackage(plan, cycle || "monthly")}
          onOpenConsultation={(title) => handleOpenConsultation(title || "Package Recommendation")}
        />
      </main>

      <Footer onOpenContact={() => handleOpenConsultation("Free Ads Audit")} />
      <BottomBar />

      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultPackageChoice={defaultServiceName}
      />

      <PackageModal
        isOpen={isPackageOpen}
        onClose={() => setIsPackageOpen(false)}
        selectedPlan={selectedPlan}
        initialBillingCycle={billingCycle}
      />
    </div>
  );
}
