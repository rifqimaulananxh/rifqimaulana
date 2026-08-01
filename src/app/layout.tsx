import type { Metadata, Viewport } from "next";
import { Jost, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND_IDENTITY, FOOTER_LINKS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rifqi Maulana — Software Engineer",
    template: "%s — Rifqi Maulana",
  },
  description:
    "Rifqi Maulana is a software engineer delivering high performance web solutions — from Next.js front-ends to scalable Node.js back-ends and GSAP-driven interfaces.",
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
      "Software engineer crafting robust, high performance web solutions — front-end, back-end and everything in between.",
    images: [
      {
        url: "/images/portofolio/rifqi.webp",
        width: 741,
        height: 1600,
        alt: "Rifqi Maulana — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rifqi Maulana — Software Engineer",
    description:
      "Software engineer crafting robust, high performance web solutions.",
    images: ["/images/portofolio/rifqi.webp"],
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
      className={`${jost.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f2f2f2] text-black">
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
