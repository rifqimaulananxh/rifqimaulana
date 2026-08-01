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
    title: "Services — Rifqi Maulana",
    description:
      "Web development, backend, UI/UX and interactive animation services.",
    url: "/services",
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
