export type ServiceItem =
  | { title: string }
  | { imageSet: [string, string] };

export const SERVICES_DATA: ServiceItem[] = [
  { title: "React / Next.js" },
  { imageSet: ["/images/menu/home.png", "/images/menu/work.png"] },
  { title: "Node.js & NestJS" },
  { title: "TypeScript" },
  { imageSet: ["/images/menu/rose.png", "/images/menu/about.png"] },
  { title: "PostgreSQL" },
  { title: "Tailwind CSS" },
  { imageSet: ["/images/menu/about.png", "/images/menu/home.png"] },
  { title: "AWS / Docker" },
  { title: "REST / GraphQL APIs" },
  { imageSet: ["/images/menu/work.png", "/images/menu/rose.png"] },
  { title: "UI / UX" },
  { title: "Animation (GSAP)" },
  { imageSet: ["/images/menu/home.png", "/images/menu/about.png"] },
  { title: "CI/CD Pipelines" },
  { title: "SEO" },
];
