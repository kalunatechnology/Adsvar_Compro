"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageSquare, ChevronDown } from "lucide-react";
import type { Service, Project, PricingPlan } from "@/lib/types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: Service | Project | PricingPlan | null;
  defaultPackageChoice?: string;
  availablePlans?: PricingPlan[];
  availableServices?: Service[];
}

const DEFAULT_PACKAGES = [
  "Ads Only · Starter",
  "Ads Only · Growth",
  "Ads Only · Scale",
  "Ads + Content · Growth",
  "Ads + Content · Pro",
  "Bespoke Custom Scope",
  "Meta Ads (Facebook & Instagram)",
  "Google Ads",
  "TikTok Ads",
  "TikTok Shop GMV Max",
  "Shopee Ads",
  "Setup & Tracking Audit",
  "Free Ads Audit & Consultation",
];

export default function ContactModal({
  isOpen,
  onClose,
  selectedItem,
  defaultPackageChoice = "",
  availablePlans = [],
  availableServices = [],
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [packageChoice, setPackageChoice] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initial selection
  useEffect(() => {
    if (selectedItem) {
      if ("name" in selectedItem && selectedItem.name) {
        setPackageChoice(selectedItem.name.replace("\n", " "));
      } else if ("title" in selectedItem && selectedItem.title) {
        setPackageChoice(selectedItem.title);
      }
    } else if (defaultPackageChoice) {
      setPackageChoice(defaultPackageChoice);
    }
  }, [selectedItem, defaultPackageChoice, isOpen]);

  // Handle ESC key to close + lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          contact: `${phone.trim()} | ${email.trim()}`.trim(),
          packageChoice: packageChoice || "Konsultasi Umum",
          service: packageChoice || "Konsultasi Umum",
          brandDescription: brandDescription.trim(),
          message: brandDescription.trim(),
          source: "book_consultation",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gagal mengirim formulir konsultasi.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errObj = err as Error;
      setErrorMessage(errObj.message || "Terjadi kesalahan saat menyimpan formulir.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setBrandDescription("");
    setErrorMessage("");
    onClose();
  };

  const waText = encodeURIComponent(
    `Halo Adsvar Digital, saya ${name || "Klien"}.\n` +
    `Saya telah mengisi formulir Book a Free Consultation:\n` +
    `• Telepon: ${phone || "-"}\n` +
    `• Email: ${email || "-"}\n` +
    `• Pilihan Paket: ${packageChoice || "Free Ads Audit & Consultation"}\n` +
    `• Catatan Brand: ${brandDescription || "-"}\n\n` +
    `Mohon info jadwal konsultasi lebih lanjut. Terima kasih!`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      onClick={handleResetAndClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-[560px] max-h-[92dvh] sm:max-h-[90vh] rounded-[20px] sm:rounded-[24px] bg-[#13141F] border border-[#27283B] flex flex-col text-white shadow-2xl transition-all duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle orange ambient glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF5500]/15 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 w-8 h-8 rounded-full bg-[#1C1D2C]/90 hover:bg-[#27283D] text-[#8E8EA0] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/5 shadow-md"
          aria-label="Tutup modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8 custom-modal-scroll">
          {isSuccess ? (
            <div className="py-4 sm:py-6 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/40 flex items-center justify-center mx-auto mb-3.5 shadow-[0_0_24px_rgba(255,85,0,0.2)]">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF5500]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Consultation Scheduled!
              </h3>
              <p className="text-[12.5px] sm:text-[13px] text-[#8B8B9E] leading-relaxed max-w-sm mx-auto mb-5 sm:mb-6">
                Data Anda telah tersinkronisasi ke sistem CRM Adsvar. Tim konsultan kami akan segera menghubungi{" "}
                <span className="text-white font-medium">{phone || email || name}</span>.
              </p>

              <div className="p-3.5 sm:p-4 rounded-[14px] bg-[#181926] border border-[#262738] mb-5 sm:mb-6 text-left text-xs space-y-1.5">
                <div className="text-[10px] sm:text-[10.5px] uppercase font-bold tracking-wider text-[#FF5500] mb-2">
                  Ringkasan CRM Lead
                </div>
                <div className="flex justify-between text-[#8E8EA0]">
                  <span>Nama:</span>
                  <span className="text-white font-medium truncate ml-2">{name}</span>
                </div>
                <div className="flex justify-between text-[#8E8EA0]">
                  <span>Pilihan Paket:</span>
                  <span className="text-white font-medium truncate ml-2">{packageChoice || "Umum"}</span>
                </div>
                {phone && (
                  <div className="flex justify-between text-[#8E8EA0]">
                    <span>WhatsApp:</span>
                    <span className="text-white font-medium">{phone}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                <a
                  href={`https://wa.me/6282322308719?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-[12px] bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-[12.5px] sm:text-[13px] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                  <span>Chat Langsung via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-[12px] bg-[#212233] hover:bg-[#2A2B3D] text-white text-[12.5px] sm:text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Form Headline matching Pop Up Form for adsvar.svg */}
              <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-white tracking-[-0.03em] leading-[1.14] mb-1.5 font-heading pr-8 sm:pr-0">
                Your brand<br />
                transformation.<br />
                Starts today.
              </h2>

              {/* Subtitle in bright orange #FF5500 */}
              <p className="text-[12.5px] sm:text-[14px] text-[#FF5500] font-normal leading-normal mb-4 sm:mb-6">
                Discuss and consult your brand needs with our team.
              </p>

              {errorMessage && (
                <div className="p-3 mb-3.5 rounded-[10px] bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {/* Field 1: Your Name */}
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] outline-none transition-all"
                  />
                </div>

                {/* Field 2 & 3: Phone & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 812 3456 7890"
                      className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@brand.com"
                      className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Field 4: Package Choice */}
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                    Package Choice
                  </label>
                  <div className="relative">
                    <select
                      value={packageChoice}
                      onChange={(e) => setPackageChoice(e.target.value)}
                      className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 pr-10 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white outline-none appearance-none transition-all cursor-pointer"
                    >
                      <option value="" className="bg-[#171826] text-[#5A5A72]">
                        Pilih Paket atau Layanan...
                      </option>

                      {availablePlans.length > 0 ? (
                        <optgroup label="Paket Scaling (Pricing Tiers)" className="bg-[#171826] text-[#FF5500] font-semibold">
                          {availablePlans.map((p) => (
                            <option key={p.id} value={p.name.replace("\n", " ")} className="bg-[#171826] text-white font-normal">
                              {p.number ? `${p.number} ` : ""}{p.name.replace("\n", " ")} ({p.priceMonthly || p.priceProject})
                            </option>
                          ))}
                        </optgroup>
                      ) : (
                        <optgroup label="Paket Populer" className="bg-[#171826] text-[#FF5500] font-semibold">
                          {DEFAULT_PACKAGES.map((pkg, idx) => (
                            <option key={idx} value={pkg} className="bg-[#171826] text-white font-normal">
                              {pkg}
                            </option>
                          ))}
                        </optgroup>
                      )}

                      {availableServices.length > 0 && (
                        <optgroup label="Layanan Utama" className="bg-[#171826] text-[#FF5500] font-semibold">
                          {availableServices.map((s) => (
                            <option key={s.id} value={s.name.replace("\n", " ")} className="bg-[#171826] text-white font-normal">
                              {s.name.replace("\n", " ")}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8EA0] pointer-events-none" />
                  </div>
                </div>

                {/* Field 5: Tell us about your brand */}
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                    Tell us about your brand
                  </label>
                  <textarea
                    rows={2}
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    placeholder="Your brand short description"
                    className="w-full h-[74px] sm:h-[88px] p-3 sm:p-3.5 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] resize-none outline-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[46px] sm:h-[50px] mt-2 rounded-[14px] bg-[#FF5500] hover:bg-[#E04B00] active:scale-[0.99] text-[13.5px] sm:text-[14px] font-medium text-white shadow-[0_4px_18px_rgba(255,85,0,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Menyimpan ke Sistem...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2]" />
                      <span>Send &amp; Schedule Consultation</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
