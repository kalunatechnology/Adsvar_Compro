"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer className="relative bg-black border-t border-zinc-900 pt-20 pb-12 overflow-hidden">
      {/* Pre-Footer CTA Banner matching adsvar.svg: y: 4802 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative adsvar-card p-8 sm:p-12 lg:p-16 overflow-hidden flex flex-col items-center text-center shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />

          <span className="adsvar-badge mb-4">Siap Bertransformasi?</span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-3xl tracking-tight leading-tight">
            Tingkatkan Skala Bisnis Anda dengan Standar Digital Kelas Dunia
          </h2>

          <p className="mt-4 text-zinc-400 text-base max-w-xl">
            Mari diskusikan bagaimana Adsvar dapat membantu merek Anda memenangkan persaingan pasar sekarang juga.
          </p>

          {/* Exact CTA buttons from SVG: w: 260px, h: 60px, rx: 12px and w: 165px, h: 59px */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button onClick={onOpenContact} className="adsvar-btn-primary gap-2">
              <span>Konsultasikan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="adsvar-btn-secondary"
            >
              Chat WhatsApp Langsung
            </a>
          </div>
        </div>
      </div>

      {/* Footer Navigation & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-[#FF5500] flex items-center justify-center font-black text-white text-lg shadow-md shadow-[#FF5500]/25">
                A
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                ADSVAR<span className="text-[#FF5500]">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mb-6">
              Studio produksi kreatif dan agensi rekayasa digital. Menggabungkan sinematografi vertikal, sistem web mutakhir, dan arsitektur brand premium.
            </p>
            <div className="flex items-center gap-3 text-zinc-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#16161F] border border-[#3F3F45] flex items-center justify-center hover:text-[#FF5500] hover:border-[#FF5500] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#16161F] border border-[#3F3F45] flex items-center justify-center hover:text-[#FF5500] hover:border-[#FF5500] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#16161F] border border-[#3F3F45] flex items-center justify-center hover:text-[#FF5500] hover:border-[#FF5500] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="#beranda" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#layanan" className="hover:text-white transition-colors">
                  Layanan Kami
                </Link>
              </li>
              <li>
                <Link href="#harga" className="hover:text-white transition-colors">
                  Paket & Harga
                </Link>
              </li>
              <li>
                <Link href="#portofolio" className="hover:text-white transition-colors">
                  Portofolio Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>Next.js Web Development</li>
              <li>ERP & Point of Sales</li>
              <li>Viral Video Reels & TikTok</li>
              <li>Brand Identity Design</li>
              <li>Performance Meta Ads</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>hello@adsvar.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <span>Semarang, Jawa Tengah, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 ADSVAR. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-zinc-400 cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
