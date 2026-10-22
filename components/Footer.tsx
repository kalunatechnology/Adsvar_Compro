"use client";

import React from "react";
import Image from "next/image";

interface FooterProps {
  onOpenContact?: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer 
      id="tentang"
      aria-label="Tentang Kami dan Kontak Adsvar"
      className="relative w-full bg-[#111116] py-16 lg:py-24 px-4 sm:px-6 lg:px-[5%] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/background_cta.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Kiri: Tipografi & Tombol */}
        <div className="flex flex-col">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.15] tracking-tight">
            <span className="text-white">Your audience is</span>
            <br />
            <span className="text-white">already scrolling.</span>
            <br />
            <span className="text-[#848494]">Let’s give them a</span>
            <br />
            <span className="text-[#848494]">reason to stop.</span>
          </h2>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button 
              onClick={onOpenContact}
              className="w-full sm:w-auto px-6 py-3 rounded-[8px] bg-[#FF5500] hover:bg-[#E04B00] text-white font-medium text-[14px] transition-all shadow-[0_4px_14px_0_rgba(255,85,0,0.39)] cursor-pointer"
            >
              Book A Consultation &rarr;
            </button>
            
            <button className="w-full sm:w-auto px-7 py-3 rounded-[8px] bg-transparent border border-[#555] hover:border-[#888] hover:bg-white/5 text-white font-medium text-[14px] transition-all cursor-pointer">
              Visit Us
            </button>
          </div>
        </div>

        {/* Kanan: Logo & Informasi Kontak */}
        <div className="flex flex-col w-full lg:max-w-md lg:ml-auto">
          
          {/* Logo AdsVar dengan Tagline */}
          <div className="relative w-full max-w-[260px] h-[65px] mb-6">
            <Image 
              src="/logo_teks.svg" 
              alt="AdsVar - Your business one stop digital solution" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Garis Pemisah (Divider) */}
          <hr className="border-[#33333C] mb-8" />

          {/* Grid Informasi Kontak & Kantor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            
            {/* Kolom Kontak */}
            <div className="flex flex-col">
              <h4 className="text-white font-bold mb-5 tracking-wide text-[15px]">
                CONTACT
              </h4>
              <div className="space-y-4">
                {/* Nomor WhatsApp */}
                <div className="flex items-center gap-3 text-[#D1D1D6] hover:text-white transition-colors cursor-pointer text-[14px]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>+62 823-2230-8719</span>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3 text-[#D1D1D6] hover:text-white transition-colors cursor-pointer text-[14px]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>corporate@adsvar.id</span>
                </div>
              </div>
            </div>

            {/* Kolom Kantor */}
            <div className="flex flex-col">
              <h4 className="text-white font-bold mb-5 tracking-wide text-[15px]">
                OUR OFFICE
              </h4>
              <p className="text-[#D1D1D6] text-[14px] leading-[1.7] max-w-[200px]">
                Menara Rajawali 26th Floor, Mega Kuningan, Jakarta, Indonesia 12950
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}