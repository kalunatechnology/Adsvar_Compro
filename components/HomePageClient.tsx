"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
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

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main>
        {/* 2. Hero Section with dynamic SQLite stats */}
        <HeroSection
          stats={initialStats}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 3. Core Services Section with dynamic SQLite services */}
        <ServicesSection
          services={initialServices}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 4. Pricing Matrix Section with dynamic SQLite plans */}
        <PricingSection
          plans={initialPlans}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 5. Portfolio Section with dynamic SQLite projects */}
        <PortfolioSection
          initialProjects={initialProjects}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </main>

      {/* 6. Footer & Pre-Footer Call to Action */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* 7. Interactive Contact Modal linked to SQLite Inquiries */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
