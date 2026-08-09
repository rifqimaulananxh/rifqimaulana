import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_IDENTITY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <section
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 24,
          minHeight: "70vh",
          justifyContent: "center",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <span className="text-x-small" style={{ letterSpacing: "0.3em" }}>
          [ ERROR · 404 ]
        </span>
        <h1 style={{ fontSize: "clamp(80px, 14vw, 200px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
          404
        </h1>
        <p className="text-small" style={{ maxWidth: 420, lineHeight: 1.6 }}>
          Page not found — the page you&apos;re looking for doesn&apos;t exist or
          has moved. Let&apos;s get you back to something useful.
        </p>
        <Link
          href="/"
          className="text-small"
          style={{
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          Back to home ({BRAND_IDENTITY.logo})
        </Link>
      </section>
    </main>
  );
}
