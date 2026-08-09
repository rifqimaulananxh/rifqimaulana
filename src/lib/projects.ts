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
      "A custom Shopify storefront with Liquid theming, editorial product pages, and a clearer purchase journey.",
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
        "A custom Shopify storefront with Liquid theming, editorial product pages, and a clearer purchase journey.",
      challenge:
        "The storefront needed to feel editorial without making the path from product discovery to purchase feel complicated.",
      approach: [
        "Created a flexible Liquid structure for campaign and product-led pages.",
        "Used hierarchy, spacing, and imagery to make product decisions easier to scan.",
        "Connected the visual direction with a more direct purchase flow across the storefront.",
      ],
      outcome:
        "A focused commerce experience that gives the brand more room to tell its story while keeping buying decisions clear.",
    },
  },
  {
    id: "mad-world",
    title: "MAD WORLD",
    description:
      "A Next.js web app built around content-first architecture, with motion used to guide discovery.",
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
        "A Next.js web app built around content-first architecture, with motion used to guide discovery.",
      challenge:
        "The experience needed to support a growing content surface while preserving a sense of pace and curiosity.",
      approach: [
        "Structured the application around reusable content and layout primitives.",
        "Designed transitions to make discovery feel intentional instead of decorative.",
        "Kept the interface responsive and performant across content-heavy views.",
      ],
      outcome:
        "A content-led web experience where the system stays dependable and the interface still feels expressive.",
    },
  },
  {
    id: "aura-os",
    title: "AURA OS",
    description:
      "A React concept for an AI workspace, exploring ambient UI and fluid micro-interactions.",
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
        "A React concept for an AI workspace, exploring ambient UI and fluid micro-interactions.",
      challenge:
        "An AI workspace can quickly become dense with controls, so the interface needed to feel capable without feeling noisy.",
      approach: [
        "Built a calm layout system with clear hierarchy between work, context, and actions.",
        "Used motion to communicate state changes and keep the workspace feeling responsive.",
        "Designed interaction patterns that reveal complexity only when it is useful.",
      ],
      outcome:
        "A focused workspace concept that makes advanced functionality feel approachable and easy to navigate.",
    },
  },
  {
    id: "pulse-ai",
    title: "PULSE AI",
    description:
      "A data analytics tool with an interactive interface for exploring real-time insights.",
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
        "A data analytics tool with an interactive interface for exploring real-time insights.",
      challenge:
        "Real-time data is only useful when people can quickly understand what changed and why it matters.",
      approach: [
        "Organized the experience around an actionable overview instead of raw data density.",
        "Created interaction patterns for moving from a signal to the detail behind it.",
        "Balanced high-information views with visual rhythm and clear decision points.",
      ],
      outcome:
        "An analytics experience that gives complex information a clearer visual structure and a more direct path to insight.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return SELECTED_WORKS.find((project) => project.id === slug);
}
