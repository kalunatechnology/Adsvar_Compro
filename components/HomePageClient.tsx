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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Service | Project | PricingPlan | null>(null);
  const [defaultServiceName, setDefaultServiceName] = useState("");

  const handleOpenContact = (
    item?: Service | Project | PricingPlan | null,
    serviceTitle?: string
  ) => {
    setSelectedItem(item || null);
    setDefaultServiceName(serviceTitle || "");
    setIsContactOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar onOpenContact={() => handleOpenContact(null, "Konsultasi Umum")} />

      <main>
        {/* 2. Hero Section with dynamic SQLite stats */}
        <HeroSection
          stats={initialStats}
          onOpenContact={() => handleOpenContact(null, "Konsultasi Strategi")}
        />

        {/* 3. Core Services Section with dynamic SQLite services */}
        <ServicesSection
          services={initialServices}
          onOpenContact={(service) => handleOpenContact(service)}
        />

        {/* 4. Pricing Matrix Section with dynamic SQLite plans */}
        <PricingSection
          plans={initialPlans}
          onOpenContact={(plan) => handleOpenContact(plan)}
        />

        {/* 5. Portfolio Section with dynamic SQLite projects */}
        <PortfolioSection
          initialProjects={initialProjects}
          onOpenContact={(project) => handleOpenContact(project)}
        />
      </main>

      {/* 6. Footer & Pre-Footer Call to Action */}
      <Footer onOpenContact={() => handleOpenContact(null, "Konsultasi Brand")} />

      {/* 7. Bottom Copyright & Social Media Bar */}
      <BottomBar />

      {/* 8. Interactive Contact Consultation Modal connected to SQLite Inquiries */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        selectedItem={selectedItem}
        defaultService={defaultServiceName}
      />
    </div>
  );
}
