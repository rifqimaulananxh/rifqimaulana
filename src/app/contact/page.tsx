import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rifqi Maulana for your next web project — start a project inquiry or chat on WhatsApp.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact",
    siteName: "Rifqi Maulana",
    title: "Contact — Rifqi Maulana",
    description: "Let's build something that makes your business grow.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Contact — Rifqi Maulana",
      },
    ],
  },
};

export default function Contact() {
  return <ContactPage />;
}
