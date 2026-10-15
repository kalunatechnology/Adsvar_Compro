"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080C]/85 backdrop-blur-md border-b border-[#3F3F45]/50 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7733] to-[#FF5500] flex items-center justify-center font-black text-xl text-white shadow-md shadow-[#FF5500]/25 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white flex items-center gap-1">
                ADSVAR<span className="text-[#FF5500]">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-medium">
                Production & Tech
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link
              href="#beranda"
              className="hover:text-white transition-colors duration-200"
            >
              Beranda
            </Link>
            <Link
              href="#layanan"
              className="hover:text-white transition-colors duration-200"
            >
              Layanan
            </Link>
            <Link
              href="#harga"
              className="hover:text-white transition-colors duration-200"
            >
              Paket & Harga
            </Link>
            <Link
              href="#portofolio"
              className="hover:text-white transition-colors duration-200"
            >
              Portofolio
            </Link>
            <Link
              href="#tentang"
              className="hover:text-white transition-colors duration-200"
            >
              Tentang
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#FF6F00] to-[#FF5500] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF5500]/30 hover:shadow-[#FF5500]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Konsultasi Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 pt-2 border-t border-zinc-800/80 flex flex-col gap-3 text-sm font-medium text-zinc-200 bg-[#101018] px-4 rounded-2xl shadow-xl">
            <Link
              href="#beranda"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5500]"
            >
              Beranda
            </Link>
            <Link
              href="#layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5500]"
            >
              Layanan
            </Link>
            <Link
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5500]"
            >
              Paket & Harga
            </Link>
            <Link
              href="#portofolio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5500]"
            >
              Portofolio
            </Link>
            <Link
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5500]"
            >
              Tentang
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#FF6F00] to-[#FF5500] py-3 text-center font-semibold text-white shadow-md shadow-[#FF5500]/30"
            >
              Konsultasi Sekarang
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
