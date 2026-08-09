export type ServiceItem =
  | { title: string }
  | { imageSet: [string, string] };

export const SERVICES_DATA: ServiceItem[] = [
  { title: "Product interfaces" },
  { imageSet: ["/images/portofolio/porto-1.webp", "/images/portofolio/porto-2.webp"] },
  { title: "Backend systems" },
  { title: "Data & infrastructure" },
  { imageSet: ["/images/portofolio/porto-3.webp", "/images/portofolio/porto-4.webp"] },
  { title: "Motion & interaction" },
  { title: "Performance & discoverability" },
  { imageSet: ["/images/portofolio/porto-5.webp", "/images/portofolio/porto-6.webp"] },
  { title: "Technical direction" },
  { title: "Long-term support" },
  { imageSet: ["/images/portofolio/porto-7.webp", "/images/portofolio/unsplash.webp"] },
];
