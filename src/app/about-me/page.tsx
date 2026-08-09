import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Rifqi Maulana, a software engineer in Indonesia working across product interfaces and backend systems.",
  alternates: {
    canonical: "/about-me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about-me",
    siteName: "Rifqi Maulana",
    title: "About Me — Rifqi Maulana",
    description: "The journey, working principles, and product approach behind Rifqi Maulana.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "About Me — Rifqi Maulana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me — Rifqi Maulana",
    description:
      "The journey, working principles, and product approach behind Rifqi Maulana.",
    images: ["/og.png"],
  },
};

export default function AboutMePage() {
  return <AboutPage />;
}
