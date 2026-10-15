"use client";

import { useState } from "react";
import { X, Send, Phone, Mail, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import Image from "next/image";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "Web & Software Engineering",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Save to SQLite database via API
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);

      // 2. Open WhatsApp directly with formatted message
      setTimeout(() => {
        const text = `Halo Adsvar, saya ${formData.name} ingin berkonsultasi mengenai ${formData.service}. ${
          formData.message ? `Catatan: ${formData.message}` : ""
        }`;
        window.open(
          `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`,
          "_blank"
        );
        setSubmitting(false);
        setSubmitted(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Gagal mengirim:", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-[24px] bg-[#14141E] border border-[#3F3F45] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FF7733] via-[#FF5500] to-[#863A00]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#20202F] text-zinc-300 hover:text-white transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <span className="adsvar-badge">Mulai Kolaborasi</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
              Konsultasikan Proyek Anda Bersama Adsvar
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Data Anda tersimpan secara aman di sistem database kami dan langsung terhubung dengan tim teknis & kreatif kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            {/* Form Column */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Nama Lengkap / Brand
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso (PT Maju Jaya)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-[12px] bg-black border border-[#3F3F45] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Nomor WhatsApp / Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="0812xxxxxx atau email@perusahaan.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-[12px] bg-black border border-[#3F3F45] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Layanan yang Dibutuhkan
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-[12px] bg-black border border-[#3F3F45] text-sm text-white focus:outline-none focus:border-[#FF5500]"
                >
                  <option value="Web & Software Engineering">Web & Software Engineering (Next.js/ERP)</option>
                  <option value="Video Reels & Commercial Production">Video Reels & Commercial Production</option>
                  <option value="Brand Architecture & Packaging">Brand Architecture & Packaging</option>
                  <option value="Performance Ads & Funnel Growth">Performance Ads (Meta / TikTok)</option>
                  <option value="Growth Scale (Paket Lengkap)">Growth Scale (Paket Lengkap)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Catatan Proyek (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan gambaran singkat kebutuhan proyek Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-[12px] bg-black border border-[#3F3F45] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5500] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || submitted}
                className="adsvar-btn-primary w-full h-[50px] gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Tersimpan! Menghubungkan ke WA...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Simpan & Terhubung ke WhatsApp</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Contact Card / Embedded SVG Card */}
            <div className="md:col-span-2 p-5 rounded-[20px] bg-[#1C1C28] border border-[#3F3F45] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-[10px] bg-[#FF5500] text-white flex items-center justify-center font-black text-sm">
                    A
                  </div>
                  <div>
                    <span className="font-black text-white text-sm block leading-none">
                      ADSVAR
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium tracking-wider">
                      PRODUCTION STUDIO
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Pusat produksi konten visual sinematik, arsitektur web modern, dan sistem database cloud terintegrasi.
                </p>

                <div className="space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>hello@adsvar.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>Semarang, Jawa Tengah, ID</span>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Adsvar,%20saya%20ingin%20konsultasi%20layanan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-[12px] bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp Langsung</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
