import React from "react";

interface AdsvarEmblemProps {
  className?: string;
  glow?: boolean;
}

/**
 * Pure Vector Emblem of the Adsvar Wings.
 * Renders edge-to-edge without the 512px squircle background card,
 * ensuring maximum sharpness and visibility at small sizes (10px–24px).
 */
export default function AdsvarEmblem({
  className = "h-3.5 w-auto",
  glow = false,
}: AdsvarEmblemProps) {
  return (
    <svg
      viewBox="0 0 44 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 ${glow ? "drop-shadow-[0_2px_8px_rgba(255,85,0,0.5)]" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="emblemLeftGrad" x1="0" y1="0" x2="28" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB370" />
          <stop offset="100%" stopColor="#FF5500" />
        </linearGradient>
        <linearGradient id="emblemRightGrad" x1="20" y1="0" x2="44" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF5500" />
          <stop offset="100%" stopColor="#FF9040" />
        </linearGradient>
      </defs>
      <path
        d="M27.5518 24.7139H20.9775L18.7949 7.94434H12.6777L6.57422 24.7139H0L6.74609 6.17969H13.3223L15.5703 0.00195312H24.3359L27.5518 24.7139Z"
        fill="url(#emblemLeftGrad)"
      />
      <path
        d="M36.5525 18.5342H36.2898L36.2888 18.5369H29.6774L27.4299 24.7119H20.8557L23.1042 18.5342H23.1413L23.7829 16.7713H30.6199L36.7241 0H43.2983L36.5525 18.5342Z"
        fill="url(#emblemRightGrad)"
      />
    </svg>
  );
}
