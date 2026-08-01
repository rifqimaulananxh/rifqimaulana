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
    image: "/images/menu/rose.png",
    title: "Pixel perfect execution",
  },
  {
    image: "/images/menu/work.png",
    title: "High performance",
  },
  {
    image: "/images/menu/home.png",
    title: "Scalable systems",
  },
  {
    image: "/images/menu/about.png",
    title: "Clean architecture",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/", image: "/images/menu/home.png" },
  { label: "Work", href: "/work", image: "/images/menu/work.png" },
  { label: "Services", href: "/services", image: "/images/menu/rose.png" },
  { label: "FAQ", href: "/services#faq", image: "/images/menu/work.png" },
  { label: "About me", href: "/about-me", image: "/images/menu/about.png" },
  { label: "Contact", href: "/contact", image: "/images/menu/rose.png" },
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
