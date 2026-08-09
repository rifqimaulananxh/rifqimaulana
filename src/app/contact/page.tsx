import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Rifqi Maulana what you are building, where you are stuck, and what you need next.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact",
    siteName: "Rifqi Maulana",
    title: "Contact — Rifqi Maulana",
    description: "Share what you are building, where you are stuck, and what you need next.",
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
    description: "Share what you are building, where you are stuck, and what you need next.",
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
