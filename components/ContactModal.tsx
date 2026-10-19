"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import type { Service, Project, PricingPlan } from "@/lib/types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: Service | Project | PricingPlan | null;
  defaultService?: string;
}

function AdsvarLogoMark({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Adsvar_icon.svg"
      alt="Adsvar Icon"
      className={`${className} object-contain shrink-0`}
    />
  );
}

const POPULAR_SERVICES = [
  "AI-Powered Content Creation",
  "Short-Form Video & Reels",
  "High-Impact Visuals & Brand",
  "Paid Acquisition & Performance Ads",
  "Starter Landing Page",
  "Growth Scale Retainer",
  "Enterprise Custom System",
];

export default function ContactModal({
  isOpen,
  onClose,
  selectedItem,
  defaultService = "",
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update selected item name when modal opens or item changes
  useEffect(() => {
    if (selectedItem) {
      if ("name" in selectedItem && selectedItem.name) {
        setService(selectedItem.name.replace("\n", " "));
      } else if ("title" in selectedItem && selectedItem.title) {
        setService(selectedItem.title);
      }
    } else if (defaultService) {
      setService(defaultService);
    }
  }, [selectedItem, defaultService, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          contact: contact.trim(),
          service: service.trim() || "Konsultasi Umum",
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gagal mengirim formulir konsultasi.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errObj = err as Error;
      setErrorMessage(errObj.message || "Terjadi kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName("");
    setContact("");
    setMessage("");
    setErrorMessage("");
    onClose();
  };

  const waText = encodeURIComponent(
    `Halo Adsvar Digital, saya ${name || "klien"} tertarik untuk konsultasi mengenai ${service || "layanan"}. ${
      message ? `Detail: ${message}` : ""
    }`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={handleResetAndClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg rounded-[24px] bg-[#16161F] border border-[#2D2D38] p-6 sm:p-8 text-white shadow-2xl transition-all duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle orange ambient glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-52 h-52 bg-[#FF5500]/15 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#20202C] text-zinc-400 hover:text-white transition-colors"
          aria-label="Tutup modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E35F21]/15 border border-[#E35F21]/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#E35F21]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Permintaan Konsultasi Diterima!
            </h3>
            <p className="text-xs sm:text-sm text-[#8B8B97] leading-relaxed max-w-sm mx-auto mb-6">
              Data Anda telah tersimpan dengan aman di sistem SQLite kami. Tim Adsvar akan segera menghubungi{" "}
              <span className="text-white font-medium">{contact || "Anda"}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/6282322308719?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Lanjutkan via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#252530] hover:bg-[#30303D] text-white text-xs font-medium transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <AdsvarLogoMark className="w-4 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E35F21]">
                BOOK A CONSULTATION
              </span>
            </div>

            <h3 className="text-2xl sm:text-[26px] font-semibold text-white tracking-tight mb-2">
              Mulai Langkah Transformasi Brand
            </h3>
            <p className="text-xs sm:text-sm text-[#8B8B97] leading-relaxed mb-6">
              Diskusikan target kampanye, arsitektur web, atau produksi video reels eksklusif bersama tim kami.
            </p>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Nama Lengkap / Brand
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Sarah — Aurora Living"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#2B2B36] focus:border-[#FF5500] focus:outline-none text-xs text-white placeholder-zinc-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Nomor WhatsApp / Email Bisnis
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Contoh: +62 812-3456-7890 atau name@brand.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#2B2B36] focus:border-[#FF5500] focus:outline-none text-xs text-white placeholder-zinc-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center justify-between">
                  <span>Layanan / Paket yang Diminati</span>
                  <Sparkles className="w-3 h-3 text-[#FF5500]" />
                </label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Pilih atau ketik layanan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#2B2B36] focus:border-[#FF5500] focus:outline-none text-xs text-white placeholder-zinc-600 mb-2 transition-colors"
                />

                {/* Quick suggestions pills */}
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SERVICES.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setService(s)}
                      className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                        service === s
                          ? "bg-[#FF5500]/15 border-[#FF5500] text-[#FF5500]"
                          : "bg-[#101017] border-[#2B2B36] text-zinc-400 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Catatan Kebutuhan Singkat (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan gambaran singkat kebutuhan atau timeline yang diharapkan..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-[#2B2B36] focus:border-[#FF5500] focus:outline-none text-xs text-white placeholder-zinc-600 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-xs font-semibold text-white transition-all shadow-[0_4px_14px_rgba(255,85,0,0.39)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Menyimpan ke Sistem...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim & Jadwalkan Konsultasi</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
