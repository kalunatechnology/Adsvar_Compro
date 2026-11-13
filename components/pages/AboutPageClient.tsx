"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import type { CompanyStat } from "@/lib/types";

interface AboutPageClientProps {
  initialStats: CompanyStat[];
}

export default function AboutPageClient({ initialStats }: AboutPageClientProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultServiceName, setDefaultServiceName] = useState("");

  const handleOpenConsultation = (title?: string) => {
    setDefaultServiceName(title || "Agency Overview Discussion");
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      <Navbar onOpenContact={() => handleOpenConsultation("Book a Free Consultation")} />

      <main>
        <h1 className="sr-only">
          About Adsvar — Performance Marketing Agency &amp; Creative Production Engine in Jakarta
        </h1>

        <HeroSection
          stats={initialStats}
          onOpenContact={() => handleOpenConsultation("Free Strategy Consultation")}
        />
      </main>

      <Footer onOpenContact={() => handleOpenConsultation("Free Ads Audit")} />
      <BottomBar />

      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultPackageChoice={defaultServiceName}
      />
    </div>
  );
}
