import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND_IDENTITY, FOOTER_LINKS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rifqi Maulana — Software Engineer",
    template: "%s — Rifqi Maulana",
  },
  description:
    "Rifqi Maulana is a software engineer based in Indonesia, building reliable web products with Next.js, React, Node.js, and thoughtful interaction design.",
  applicationName: "Rifqi Maulana Portfolio",
  keywords: [
    "Rifqi Maulana",
    "software engineer",
    "web developer",
    "Next.js developer",
    "React developer",
    "Node.js",
    "NestJS",
    "TypeScript",
    "GSAP animations",
    "Indonesia",
  ],
  authors: [{ name: "Rifqi Maulana", url: SITE_URL }],
  creator: "Rifqi Maulana",
  publisher: "Rifqi Maulana",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rifqi Maulana",
    title: "Rifqi Maulana — Software Engineer",
    description:
      "Software engineer building reliable web products from interface to deployment.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rifqi Maulana — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rifqi Maulana — Software Engineer",
    description: "Reliable web products from interface to deployment.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: BRAND_IDENTITY.name,
  jobTitle: "Software Engineer",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  email: FOOTER_LINKS.email,
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "AWS",
    "GSAP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll>
          <RouteTransition />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
