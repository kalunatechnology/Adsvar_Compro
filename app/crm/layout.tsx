import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Internal Dashboard | Adsvar",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
