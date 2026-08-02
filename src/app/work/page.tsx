import type { Metadata } from "next";
import { WorkListSection } from "@/components/work/WorkListSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects and playground experiments by Rifqi Maulana — e-commerce builds, creative web apps, AI interfaces and interactive animations.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/work",
    siteName: "Rifqi Maulana",
    title: "Work — Rifqi Maulana",
    description:
      "Selected projects and playground experiments by Rifqi Maulana.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Work — Rifqi Maulana",
      },
    ],
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkListSection />
    </main>
  );
}
