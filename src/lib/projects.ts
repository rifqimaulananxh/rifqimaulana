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
      "A full-fledged e-commerce experience with custom Shopify liquid theming, product storytelling and a buttery smooth shopping journey.",
    tags: "SHOPIFY CUSTOM, ECOMMERCE",
    role: "Web Design & Development",
    href: "#modevelle",
    image: [
      "/images/restoration/restoration-1.webp",
      "/images/restoration/restoration-2.webp",
    ],
    bgMediaUrl: "/images/restoration/restoration-1.webp",
    type: "Project",
    category: "web",
  },
  {
    id: "mad-world",
    title: "MAD WORLD",
    description:
      "A creative web app built with Next.js that blends bold motion design with content-first architecture.",
    tags: "NEXT.JS, CREATIVE WEB APP",
    role: "Fullstack Engineering",
    href: "#mad-world",
    image: ["/images/restoration/restoration-3.webp"],
    bgMediaUrl: "/images/restoration/restoration-3.webp",
    type: "Project",
    category: "web",
  },
  {
    id: "aura-os",
    title: "AURA OS",
    description:
      "A workspace & AI UI concept built with React, exploring ambient interfaces and fluid micro-interactions.",
    tags: "REACT, WORKSPACE & AI UI",
    role: "Frontend Architecture",
    href: "#aura-os",
    image: ["/images/restoration/restoration-4.webp"],
    bgMediaUrl: "/images/restoration/restoration-4.webp",
    type: "Project",
    category: "design",
  },
  {
    id: "pulse-ai",
    title: "PULSE AI",
    description:
      "A data analytics tooling with an interactive, design-led interface for exploring insights in real time.",
    tags: "WEB3, DATA ANALYTICS",
    role: "UI/UX & Interactive Design",
    href: "#pulse-ai",
    image: ["/images/restoration/restoration-5.webp"],
    bgMediaUrl: "/images/restoration/restoration-5.webp",
    type: "Project",
    category: "design",
  },
];
