import type { Metadata } from "next";
import { WorkListSection } from "@/components/work/WorkListSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected web products, interfaces, and interactive experiments by Rifqi Maulana.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/work",
    siteName: "Rifqi Maulana",
    title: "Work — Rifqi Maulana",
    description: "Selected web products, interfaces, and interactive experiments.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Work — Rifqi Maulana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Rifqi Maulana",
    description:
      "Selected web products, interfaces, and interactive experiments by Rifqi Maulana.",
    images: ["/og.png"],
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkListSection />
    </main>
  );
}
