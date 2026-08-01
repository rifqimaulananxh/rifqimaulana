export type ServiceItem =
  | { title: string }
  | { imageSet: [string, string] };

export const SERVICES_DATA: ServiceItem[] = [
  { title: "React / Next.js" },
  { imageSet: ["/images/portofolio/porto-1.webp", "/images/portofolio/porto-2.webp"] },
  { title: "Node.js & NestJS" },
  { title: "TypeScript" },
  { imageSet: ["/images/portofolio/porto-3.webp", "/images/portofolio/porto-4.webp"] },
  { title: "PostgreSQL" },
  { title: "Tailwind CSS" },
  { imageSet: ["/images/portofolio/porto-5.webp", "/images/portofolio/porto-6.webp"] },
  { title: "AWS / Docker" },
  { title: "REST / GraphQL APIs" },
  { imageSet: ["/images/portofolio/porto-7.webp", "/images/portofolio/unsplash.webp"] },
  { title: "UI / UX" },
  { title: "Animation (GSAP)" },
  { imageSet: ["/images/portofolio/porto-1.webp", "/images/portofolio/porto-2.webp"] },
  { title: "CI/CD Pipelines" },
  { title: "SEO" },
];
