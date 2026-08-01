export const BRAND_IDENTITY = {
  name: "RIFQI MAULANA",
  logo: "RM",
  role: "SOFTWARE ENGINEER",
  label: "[ SOFTWARE ENGINEER ]",
  crosshairText: "SOFTWARE ENGINEER",
  headlineDesktop: "Engineering Robust",
  headlineMobileTop: "Engineering",
  headlineMobileBottom: "Robust",
  headlineRight: "software solutions",
  location: "INDONESIA",
  timezone: "Asia/Jakarta", // WIB
  timezoneLabel: "WIB",
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "AWS",
  ],
};

export const HERO_FEATURES = [
  {
    image: "/images/portofolio/porto-3.webp",
    title: "Pixel perfect execution",
  },
  {
    image: "/images/portofolio/porto-4.webp",
    title: "High performance",
  },
  {
    image: "/images/portofolio/porto-5.webp",
    title: "Scalable systems",
  },
  {
    image: "/images/portofolio/porto-6.webp",
    title: "Clean architecture",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/", image: "/images/portofolio/porto-1.webp" },
  { label: "Work", href: "/work", image: "/images/portofolio/porto-2.webp" },
  { label: "Services", href: "/services", image: "/images/portofolio/porto-3.webp" },
  { label: "FAQ", href: "/services#faq", image: "/images/portofolio/porto-4.webp" },
  { label: "About me", href: "/about-me", image: "/images/portofolio/porto-5.webp" },
  { label: "Contact", href: "/contact", image: "/images/portofolio/porto-6.webp" },
];

export const FOOTER_LINKS = {
  email: "rifqimaulana.dev@gmail.com",
  whatsapp: "Quick chat",
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
};

export const WORK_CATEGORIES = [
  { label: "All Works", key: "all" },
  { label: "[ React / Next.JS ]", key: "web" },
  { label: "[ Node.js ]", key: "backend" },
  { label: "[ UI / UX ]", key: "design" },
  { label: "[ Playground ]", key: "playground" },
];

export const WORK_CATEGORY_KEYS = WORK_CATEGORIES.map((c) => c.key);
