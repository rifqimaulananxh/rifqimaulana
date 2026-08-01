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
    title: "About Me — Rifqi Maulana",
    description: "The journey, background and formula behind Rifqi Maulana.",
    url: "/about-me",
  },
};

export default function AboutMePage() {
  return <AboutPage />;
}
