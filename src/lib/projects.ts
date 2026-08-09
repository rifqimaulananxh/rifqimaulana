export type WorkType = "Project" | "Playground";

export interface CaseStudy {
  year: string;
  service: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string;
  role: string;
  href: string;
  image: string[];
  bgMediaUrl: string;
  type: WorkType;
  category: "web" | "backend" | "design" | "playground";
  caseStudy?: CaseStudy;
}

export const SELECTED_WORKS: Project[] = [
  {
    id: "modevelle",
    title: "MODEVELLE",
    description:
      "A Shopify storefront that gives editorial brand storytelling room to breathe without slowing down product discovery.",
    tags: "SHOPIFY, E-COMMERCE",
    role: "Web design and development",
    href: "/work/modevelle",
    image: [
      "/images/portofolio/porto-1.webp",
      "/images/portofolio/porto-2.webp",
    ],
    bgMediaUrl: "/images/portofolio/porto-1.webp",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2025",
      service: "E-commerce / Shopify",
      overview:
        "A Shopify storefront shaped around editorial storytelling and a more direct path from discovery to purchase.",
      challenge:
        "The brand needed a more considered storefront, but product discovery and checkout could not become secondary to the art direction.",
      approach: [
        "Built a flexible Liquid theme for campaign pages and product-led content.",
        "Used hierarchy, spacing, and imagery to make product choices easier to scan.",
        "Connected the visual direction to a more direct purchase flow across the storefront.",
      ],
      outcome:
        "A storefront that gives campaigns room to breathe while keeping products easy to compare and buy.",
    },
  },
  {
    id: "mad-world",
    title: "MAD WORLD",
    description:
      "A content-led Next.js experience where motion helps people explore without getting in the way.",
    tags: "NEXT.JS, CREATIVE WEB APP",
    role: "Full-stack engineering",
    href: "/work/mad-world",
    image: ["/images/portofolio/porto-3.webp"],
    bgMediaUrl: "/images/portofolio/porto-3.webp",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2025",
      service: "Creative web app",
      overview:
        "A content-led Next.js experience designed to keep discovery expressive, structured, and easy to follow.",
      challenge:
        "The experience needed to support a growing content surface while keeping a clear sense of pace and curiosity.",
      approach: [
        "Structured the application around reusable content and layout primitives.",
        "Used transitions to make discovery feel intentional instead of decorative.",
        "Kept the interface responsive and performant across content-heavy views.",
      ],
      outcome:
        "A flexible content experience that stays dependable while leaving room for expression.",
    },
  },
  {
    id: "aura-os",
    title: "AURA OS",
    description:
      "A React concept for an AI workspace, exploring calm interfaces for complex, high-context work.",
    tags: "REACT, WORKSPACE & AI UI",
    role: "Frontend architecture",
    href: "/work/aura-os",
    image: ["/images/portofolio/porto-4.webp"],
    bgMediaUrl: "/images/portofolio/porto-4.webp",
    type: "Project",
    category: "design",
    caseStudy: {
      year: "2025",
      service: "Product interface / React",
      overview:
        "A React concept for an AI workspace that uses hierarchy and motion to make advanced tools feel approachable.",
      challenge:
        "An AI workspace can quickly become dense with controls, so the interface needed to feel capable without feeling noisy.",
      approach: [
        "Built a calm layout system with clear hierarchy between work, context, and actions.",
        "Used motion to communicate state changes and keep the workspace responsive.",
        "Revealed complexity only when it was useful to the person working.",
      ],
      outcome:
        "A focused workspace concept that makes advanced functionality easier to understand and navigate.",
    },
  },
  {
    id: "pulse-ai",
    title: "PULSE AI",
    description:
      "An analytics interface that turns real-time signals into clearer paths to action.",
    tags: "WEB3, DATA ANALYTICS",
    role: "UI/UX and interactive design",
    href: "/work/pulse-ai",
    image: ["/images/portofolio/porto-5.webp"],
    bgMediaUrl: "/images/portofolio/porto-5.webp",
    type: "Project",
    category: "design",
    caseStudy: {
      year: "2025",
      service: "Analytics / Interaction design",
      overview:
        "An analytics interface designed to help people move from a live signal to the detail behind it.",
      challenge:
        "Real-time data is only useful when people can quickly understand what changed and why it matters.",
      approach: [
        "Organized the experience around an actionable overview instead of raw data density.",
        "Created a clear path from a signal to the detail behind it.",
        "Balanced high-information views with visual rhythm and clear decision points.",
      ],
      outcome:
        "An analytics experience that gives complex information a clearer structure and a more direct path to insight.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return SELECTED_WORKS.find((project) => project.id === slug);
}
