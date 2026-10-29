"use client";

import React from "react";

interface FooterProps {
  onOpenContact?: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer 
      id="tentang"
      aria-label="About Us and Adsvar Contact"
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
            <span className="text-white">Your ads are running.</span>
            <br />
            <span className="text-[#848494]">Are they making money?</span>
          </h2>

          <p className="mt-4 text-[13.5px] sm:text-[14.5px] text-[#A1A1AA] font-normal leading-relaxed max-w-md">
            Send us your store or ad account link. We&apos;ll review it for free and tell you what to fix first.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button 
              type="button"
              onClick={onOpenContact}
              className="w-full sm:w-auto px-6 py-3 rounded-[8px] bg-[#FF5500] hover:bg-[#E04B00] text-white font-medium text-[14px] transition-all shadow-[0_4px_14px_0_rgba(255,85,0,0.39)] cursor-pointer"
            >
              Get a Free Ads Audit &rarr;
            </button>
            
            <a
              href="https://wa.me/6282322308719?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20your%20team%20regarding%20Adsvar%20Digital%27s%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-[8px] bg-transparent border border-[#555] hover:border-[#888] hover:bg-white/5 text-white font-medium text-[14px] transition-all cursor-pointer text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Kanan: Logo & Informasi Kontak */}
        <div className="flex flex-col w-full lg:max-w-md lg:ml-auto">
          
          {/* Logo AdsVar dengan Tagline Baru */}
          <div className="flex flex-col mb-6">
            <div className="relative w-[210px] h-[40px]">
              <svg viewBox="0 0 370 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="Adsvar">
                <path d="M346.389 60.711V28.4281H342.52V20.6909H350.524V28.1613H353.325C354.437 25.7157 356.149 23.8036 358.461 22.4251C360.818 21.0467 363.575 20.3574 366.732 20.3574H370V26.7606H366.331C362.33 26.7606 359.239 27.939 357.06 30.2957C354.882 32.6525 353.792 35.8318 353.792 39.8338V60.711H346.389Z" fill="white"/>
                <path d="M311.788 61.4445C307.252 61.4445 303.673 60.3329 301.049 58.1095C298.47 55.8417 297.181 52.8847 297.181 49.2384C297.181 45.4143 298.47 42.4572 301.049 40.3673C303.628 38.2329 307.341 37.1657 312.188 37.1657H325.861V35.3648C325.861 29.1839 322.46 26.0935 315.656 26.0935C310.098 26.0935 306.741 28.1834 305.585 32.3633H298.048C298.715 28.4058 300.605 25.3376 303.717 23.1587C306.874 20.9798 310.898 19.8904 315.79 19.8904C321.348 19.8904 325.594 21.2021 328.529 23.8257C331.508 26.4492 332.998 30.2289 332.998 35.1647V52.9736H336.6V60.7108H328.596V54.5744H325.794C324.416 56.7088 322.526 58.3986 320.125 59.6436C317.724 60.8442 314.945 61.4445 311.788 61.4445ZM312.788 55.4415C315.189 55.4415 317.39 54.9524 319.391 53.9741C321.392 52.9958 322.971 51.6618 324.127 49.9721C325.283 48.2824 325.861 46.437 325.861 44.436V42.6351H312.655C307.052 42.6351 304.251 44.725 304.251 48.9049C304.251 50.9059 305.007 52.5067 306.519 53.7073C308.03 54.8634 310.12 55.4415 312.788 55.4415Z" fill="white"/>
                <path d="M267.477 60.7111L245.133 6.68408H253.403L272.079 52.7071H272.412L291.021 6.68408H299.025L276.681 60.7111H267.477Z" fill="white"/>
                <path d="M231.431 61.5112C225.873 61.5112 221.493 60.3551 218.291 58.0428C215.09 55.7305 213.333 52.5067 213.022 48.3713H220.426C220.737 50.817 221.804 52.6179 223.627 53.774C225.45 54.9301 228.141 55.5082 231.698 55.5082C237.923 55.5082 241.036 53.5517 241.036 49.6386C241.036 48.0378 240.547 46.815 239.568 45.9701C238.635 45.0808 237.034 44.436 234.766 44.0358L226.028 42.435C218.603 41.0565 214.89 37.5214 214.89 31.8297C214.89 28.139 216.29 25.2264 219.092 23.092C221.893 20.9576 225.717 19.8904 230.564 19.8904C235.589 19.8904 239.568 20.9798 242.503 23.1587C245.482 25.3376 247.172 28.4058 247.572 32.3633H240.302C239.857 30.14 238.812 28.4947 237.167 27.4275C235.566 26.3603 233.299 25.8267 230.364 25.8267C227.651 25.8267 225.539 26.2936 224.028 27.2274C222.56 28.1612 221.826 29.5174 221.826 31.2961C221.826 32.6746 222.293 33.764 223.227 34.5644C224.205 35.3203 225.762 35.8984 227.896 36.2986L236.634 37.9661C240.547 38.6776 243.415 39.9449 245.238 41.768C247.061 43.5911 247.972 46.0368 247.972 49.105C247.972 53.0181 246.549 56.064 243.704 58.2429C240.858 60.4218 236.767 61.5112 231.431 61.5112Z" fill="white"/>
                <path d="M182.698 61.5113C178.696 61.5113 175.272 60.6664 172.426 58.9767C169.625 57.287 167.468 54.8858 165.956 51.7731C164.489 48.6604 163.755 44.9697 163.755 40.7009C163.755 36.4321 164.489 32.7414 165.956 29.6287C167.424 26.516 169.513 24.1148 172.226 22.4251C174.983 20.7353 178.251 19.8905 182.031 19.8905C185.232 19.8905 187.989 20.513 190.301 21.7581C192.658 23.0031 194.437 24.804 195.637 27.1608H195.904V4.68286H203.374V52.9737H207.243V60.7109H199.239V54.5745H196.438C195.104 56.8423 193.28 58.5765 190.968 59.7771C188.656 60.9332 185.899 61.5113 182.698 61.5113ZM183.831 55.1081C187.478 55.1081 190.39 54.0631 192.569 51.9732C194.792 49.8833 195.904 47.1041 195.904 43.6357V37.7661C195.904 34.2977 194.792 31.5185 192.569 29.4286C190.39 27.3386 187.478 26.2937 183.831 26.2937C179.83 26.2937 176.717 27.561 174.494 30.0956C172.315 32.6302 171.225 36.1653 171.225 40.7009C171.225 45.2365 172.315 48.7716 174.494 51.3062C176.717 53.8408 179.83 55.1081 183.831 55.1081Z" fill="white"/>
                <path d="M106.228 60.7111L129.373 6.68408H137.843L160.921 60.7111H153.251L146.314 44.5697H120.635L113.765 60.7111H106.228ZM123.103 38.0331H143.98L133.775 13.8877H133.441L123.103 38.0331Z" fill="white"/>
                <path d="M67.6719 60.7026H51.5234L46.1641 19.5142H31.1396L16.1484 60.7017H0L16.5693 15.1782H32.7217L38.2441 0.00439453H59.7744L67.6719 60.7026Z" fill="url(#paint0_linear_footer)"/>
                <path d="M89.7796 45.5238H89.1351L89.1328 45.5302H72.8945L67.3742 60.6975H51.2257L56.7487 45.5229H56.8386L58.414 41.1942H75.208L90.2012 0H106.349L89.7796 45.5238Z" fill="#D9D9D9"/>
                <path d="M89.7796 45.5238H89.1351L89.1328 45.5302H72.8945L67.3742 60.6975H51.2257L56.7487 45.5229H56.8386L58.414 41.1942H75.208L90.2012 0H106.349L89.7796 45.5238Z" fill="url(#paint1_linear_footer)"/>
                <defs>
                  <linearGradient id="paint0_linear_footer" x1="33.8358" y1="0.00439453" x2="33.8358" y2="60.7027" gradientUnits="userSpaceOnUse">
                    <stop offset="0.264423" stopColor="#FF994B"/>
                    <stop offset="1" stopColor="#FFD99F"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_footer" x1="89.8762" y1="0" x2="89.8762" y2="60.7052" gradientUnits="userSpaceOnUse">
                    <stop offset="0.264423" stopColor="white"/>
                    <stop offset="1" stopColor="#FF8F52"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#A1A1AA] font-normal tracking-wide mt-2">
              Performance ads, powered by a creative engine.
            </p>
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
                <a
                  href="https://wa.me/6282322308719?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20your%20team%20regarding%20Adsvar%20Digital%27s%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#D1D1D6] hover:text-[#FF5500] transition-colors cursor-pointer text-[14px]"
                  aria-label="Contact Adsvar on WhatsApp"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>+62 823-2230-8719</span>
                </a>
                {/* Email */}
                <a
                  href="mailto:corporate@adsvar.id"
                  className="flex items-center gap-3 text-[#D1D1D6] hover:text-[#FF5500] transition-colors cursor-pointer text-[14px]"
                  aria-label="Send Email to Adsvar"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>corporate@adsvar.id</span>
                </a>
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