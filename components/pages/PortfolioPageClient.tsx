"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import type { Project } from "@/lib/types";

interface PortfolioPageClientProps {
  initialProjects: Project[];
}

export default function PortfolioPageClient({ initialProjects }: PortfolioPageClientProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [defaultServiceName, setDefaultServiceName] = useState("");

  const handleOpenConsultation = (project?: Project | null, title?: string) => {
    setSelectedProject(project || null);
    setDefaultServiceName(title || project?.title || "Portfolio Project Discussion");
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      <Navbar onOpenContact={() => handleOpenConsultation(null, "Book a Free Consultation")} />

      <main className="pt-24 lg:pt-28">
        <h1 className="sr-only">
          Work &amp; Case Studies — Verified Client Track Records &amp; Scaling Results | Adsvar
        </h1>

        <PortfolioSection
          initialProjects={initialProjects}
          onOpenContact={(project) => handleOpenConsultation(project)}
        />
      </main>

      <Footer onOpenContact={() => handleOpenConsultation(null, "Free Ads Audit")} />
      <BottomBar />

      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedItem={selectedProject}
        defaultPackageChoice={defaultServiceName}
      />
    </div>
  );
}
