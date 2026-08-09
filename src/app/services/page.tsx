import type { Metadata } from "next";
import { ServiceListSection } from "@/components/services/ServiceListSection";
import { FaqSection } from "@/components/services/FaqSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product interfaces, web applications, backend systems, data infrastructure, interaction design, and performance by Rifqi Maulana.",
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
      "Product interfaces, web applications, backend systems, and interaction design.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Services — Rifqi Maulana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Rifqi Maulana",
    description:
      "Product interfaces, web applications, backend systems, and interaction design.",
    images: ["/og.png"],
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
