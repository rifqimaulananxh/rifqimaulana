import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Rifqi Maulana, a software engineer based in Indonesia building reliable web products and thoughtful interfaces.",
  alternates: {
    canonical: "/about-me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about-me",
    siteName: "Rifqi Maulana",
    title: "About Me — Rifqi Maulana",
    description: "The journey, background, and working principles behind Rifqi Maulana.",
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
