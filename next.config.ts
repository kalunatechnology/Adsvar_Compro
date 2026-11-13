import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // 1. Host Redirection to Canonical Apex/WWW Domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "adsvar-compro.vercel.app",
          },
        ],
        destination: "https://www.adsvar.id/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "adsvar.id",
          },
        ],
        destination: "https://www.adsvar.id/:path*",
        permanent: true,
      },

      // 2. Canonical Sitelinks Route Alias Redirections (Permanent 308)
      {
        source: "/layanan",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/paket",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/harga",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/portofolio",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/tentang",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/konsultasi",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/audit",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/free-audit",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/kontak",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
