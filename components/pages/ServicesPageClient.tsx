"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import PricingSection, { PlatformKey } from "@/components/PricingSection";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import PackageModal from "@/components/PackageModal";
import type { Service, PricingPlan } from "@/lib/types";

interface ServicesPageClientProps {
  initialServices: Service[];
  initialPlans: PricingPlan[];
}

export default function ServicesPageClient({
  initialServices,
  initialPlans,
}: ServicesPageClientProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [defaultServiceName, setDefaultServiceName] = useState("");

  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "project">("monthly");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>("Meta");

  const handleOpenConsultation = (item?: Service | null, serviceTitle?: string) => {
    setSelectedService(item || null);
    setDefaultServiceName(serviceTitle || "");
    setIsConsultationOpen(true);
  };

  const handleOpenPackage = (plan?: PricingPlan, cycle: "monthly" | "project" = "monthly") => {
    setSelectedPlan(plan || initialPlans[0] || null);
    setBillingCycle(cycle);
    setIsPackageOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      <Navbar onOpenContact={() => handleOpenConsultation(null, "Book a Free Consultation")} />

      <main className="pt-24 lg:pt-28">
        <h1 className="sr-only">
          Services — Full-Funnel Performance Advertising &amp; Creative Engine | Adsvar
        </h1>

        <ServicesSection
          services={initialServices}
          onOpenContact={(service) => handleOpenConsultation(service, service?.name)}
          onSelectPlatform={(platform) => setSelectedPlatform(platform)}
        />

        <PricingSection
          plans={initialPlans}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          onOpenContact={(plan, cycle) => handleOpenPackage(plan, cycle || "monthly")}
          onOpenConsultation={(title) => handleOpenConsultation(null, title || "Package Recommendation")}
        />
      </main>

      <Footer onOpenContact={() => handleOpenConsultation(null, "Free Ads Audit")} />
      <BottomBar />

      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedItem={selectedService}
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
