"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import PackageModal from "@/components/PackageModal";
import type { Service, Project, PricingPlan, CompanyStat } from "@/lib/types";

interface HomePageClientProps {
  initialServices: Service[];
  initialProjects: Project[];
  initialPlans: PricingPlan[];
  initialStats: CompanyStat[];
}

export default function HomePageClient({
  initialServices,
  initialProjects,
  initialPlans,
  initialStats,
}: HomePageClientProps) {
  // Modal 1: Consultation Pop Up (from Pop Up Form for adsvar.svg)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Service | Project | PricingPlan | null>(null);
  const [defaultServiceName, setDefaultServiceName] = useState("");

  // Modal 2: Choose This Package Pop Up (tailored for CRM)
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "project">("monthly");

  const handleOpenConsultation = (
    item?: Service | Project | PricingPlan | null,
    serviceTitle?: string
  ) => {
    setSelectedItem(item || null);
    setDefaultServiceName(serviceTitle || "");
    setIsConsultationOpen(true);
  };

  const handleOpenPackage = (
    plan?: PricingPlan,
    cycle: "monthly" | "project" = "monthly"
  ) => {
    setSelectedPlan(plan || initialPlans[0] || null);
    setBillingCycle(cycle);
    setIsPackageOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar onOpenContact={() => handleOpenConsultation(null, "Konsultasi Umum")} />

      <main>
        {/* 2. Hero Section with dynamic SQLite stats */}
        <HeroSection
          stats={initialStats}
          onOpenContact={() => handleOpenConsultation(null, "Konsultasi Strategi")}
        />

        {/* 3. Core Services Section with dynamic SQLite services */}
        <ServicesSection
          services={initialServices}
          onOpenContact={(service) => handleOpenConsultation(service)}
        />

        {/* 4. Pricing Matrix Section with Choose this package pop up tailored for CRM */}
        <PricingSection
          plans={initialPlans}
          onOpenContact={(plan, cycle) => handleOpenPackage(plan, cycle || "monthly")}
        />

        {/* 5. Portfolio Section with dynamic SQLite projects */}
        <PortfolioSection
          initialProjects={initialProjects}
          onOpenContact={(project) => handleOpenConsultation(project)}
        />
      </main>

      {/* 6. Footer & Pre-Footer Call to Action */}
      <Footer onOpenContact={() => handleOpenConsultation(null, "Konsultasi Brand")} />

      {/* 7. Bottom Copyright & Social Media Bar */}
      <BottomBar />

      {/* 8. Pop Up Form for adsvar: Book Consultation Modal */}
      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedItem={selectedItem}
        defaultPackageChoice={defaultServiceName}
        availablePlans={initialPlans}
        availableServices={initialServices}
      />

      {/* 9. Choose This Package Pop Up: Tailored for CRM Lead Capture */}
      <PackageModal
        isOpen={isPackageOpen}
        onClose={() => setIsPackageOpen(false)}
        selectedPlan={selectedPlan}
        initialBillingCycle={billingCycle}
        availablePlans={initialPlans}
      />
    </div>
  );
}
