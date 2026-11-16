"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ContactModal from "@/components/ContactModal";
import AdsvarEmblem from "@/components/AdsvarEmblem";
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight } from "lucide-react";

export default function ContactPageClient() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultServiceName, setDefaultServiceName] = useState("Direct Inquiry");

  const handleOpenConsultation = (title?: string) => {
    setDefaultServiceName(title || "Direct Inquiry");
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] selection:bg-[#FF5500] selection:text-white">
      <Navbar onOpenContact={() => handleOpenConsultation("Book a Free Consultation")} />

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-[5%] max-w-[1520px] mx-auto">
        <h1 className="sr-only">
          Contact Adsvar — Get in Touch with Performance Advertising &amp; Growth Team
        </h1>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/25 text-[#FF5500] text-xs font-semibold tracking-wider uppercase mb-6">
            <AdsvarEmblem className="h-3 w-auto" />
            <span>Connect With Us</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
            Let&apos;s talk about scaling <br />
            <span className="text-[#FF5500]">your brand revenue.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you need paid acquisition scaling on Meta &amp; Google, high-volume creator video production, or marketplace growth, our senior team is ready.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <a
            href="https://wa.me/6282322308719?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20your%20team%20regarding%20Adsvar%20Digital%27s%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp &amp; Phone</h3>
              <p className="text-sm text-zinc-400 mb-4">Fastest response for immediate inquiries and strategy calls.</p>
            </div>
            <div className="text-sm font-semibold text-[#FF5500] flex items-center gap-2">
              <span>+62 823-2230-8719</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          <a
            href="mailto:corporate@adsvar.id"
            className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Corporate Email</h3>
              <p className="text-sm text-zinc-400 mb-4">Send RFPs, partnership proposals, or media kits directly.</p>
            </div>
            <div className="text-sm font-semibold text-[#FF5500] flex items-center gap-2">
              <span>corporate@adsvar.id</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          <a
            href="https://www.google.com/maps/place/Menara+Rajawali/@-6.22818,106.8272,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
            aria-label="View Adsvar Headquarters on Google Maps"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Headquarters</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Menara Rajawali 26th Floor Jl. DR. Ide Anak Agung Gde Agung, Jakarta, indonesia
              </p>
            </div>
            <div className="text-xs text-zinc-500 flex items-center justify-between mt-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Mon - Fri, 09:00 - 18:00 WIB</span>
              </span>
              <span className="text-[#FF5500] font-semibold text-xs group-hover:underline">View Map &rarr;</span>
            </div>
          </a>
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Prefer sending a structured brief?</h3>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            Fill in our quick questionnaire with your target platforms, current ad spend, and brand goals. We&apos;ll prepare a customized deck.
          </p>
          <button
            type="button"
            onClick={() => handleOpenConsultation("Structured Project Brief")}
            className="px-8 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-sm transition-all shadow-md shadow-[#FF5500]/25 cursor-pointer"
          >
            Submit Project Brief &rarr;
          </button>
        </div>
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
