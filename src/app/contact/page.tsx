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
    title: "Contact — Rifqi Maulana",
    description: "Let's build something that makes your business grow.",
    url: "/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}
