import type { Metadata } from "next";
import { ServiceListSection } from "@/components/services/ServiceListSection";
import { FaqSection } from "@/components/services/FaqSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack software engineering services by Rifqi Maulana — web development, backend & API design, UI/UX, interactive GSAP animations and cloud infrastructure.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services",
    siteName: "Rifqi Maulana",
    title: "Services — Rifqi Maulana",
    description:
      "Web development, backend, UI/UX and interactive animation services.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Services — Rifqi Maulana",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServiceListSection />
      <FaqSection />
    </main>
  );
}
