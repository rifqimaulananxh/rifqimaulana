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
    title: "Work — Rifqi Maulana",
    description:
      "Selected projects and playground experiments by Rifqi Maulana.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkListSection />
    </main>
  );
}
