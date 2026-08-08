export type WorkType = "Project" | "Playground";

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
}

export const SELECTED_WORKS: Project[] = [
  {
    id: "modevelle",
    title: "MODEVELLE",
    description:
      "A custom Shopify storefront with Liquid theming, editorial product pages, and a clearer purchase journey.",
    tags: "SHOPIFY, E-COMMERCE",
    role: "Web design and development",
    href: "#modevelle",
    image: [
      "/images/portofolio/porto-1.webp",
      "/images/portofolio/porto-2.webp",
    ],
    bgMediaUrl: "/images/portofolio/porto-1.webp",
    type: "Project",
    category: "web",
  },
  {
    id: "mad-world",
    title: "MAD WORLD",
    description:
      "A Next.js web app built around content-first architecture, with motion used to guide discovery.",
    tags: "NEXT.JS, CREATIVE WEB APP",
    role: "Full-stack engineering",
    href: "#mad-world",
    image: ["/images/portofolio/porto-3.webp"],
    bgMediaUrl: "/images/portofolio/porto-3.webp",
    type: "Project",
    category: "web",
  },
  {
    id: "aura-os",
    title: "AURA OS",
    description:
      "A React concept for an AI workspace, exploring ambient UI and fluid micro-interactions.",
    tags: "REACT, WORKSPACE & AI UI",
    role: "Frontend architecture",
    href: "#aura-os",
    image: ["/images/portofolio/porto-4.webp"],
    bgMediaUrl: "/images/portofolio/porto-4.webp",
    type: "Project",
    category: "design",
  },
  {
    id: "pulse-ai",
    title: "PULSE AI",
    description:
      "A data analytics tool with an interactive interface for exploring real-time insights.",
    tags: "WEB3, DATA ANALYTICS",
    role: "UI/UX and interactive design",
    href: "#pulse-ai",
    image: ["/images/portofolio/porto-5.webp"],
    bgMediaUrl: "/images/portofolio/porto-5.webp",
    type: "Project",
    category: "design",
  },
];
