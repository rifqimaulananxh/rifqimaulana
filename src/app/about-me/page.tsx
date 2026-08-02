import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Software engineer Rifqi Maulana — a full-stack developer based in Indonesia focused on animations, smooth transitions and clean architecture.",
  alternates: {
    canonical: "/about-me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about-me",
    siteName: "Rifqi Maulana",
    title: "About Me — Rifqi Maulana",
    description: "The journey, background and formula behind Rifqi Maulana.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "About Me — Rifqi Maulana",
      },
    ],
  },
};

export default function AboutMePage() {
  return <AboutPage />;
}
