import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project conversation with Rifqi Maulana or reach out directly on WhatsApp.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact",
    siteName: "Rifqi Maulana",
    title: "Contact — Rifqi Maulana",
    description: "Tell me what you are building and what you need next.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Contact — Rifqi Maulana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Rifqi Maulana",
    description: "Tell me what you are building and what you need next.",
    images: ["/og.png"],
  },
};

export default function Contact() {
  return (
    <main>
      <ContactPage />
    </main>
  );
}
