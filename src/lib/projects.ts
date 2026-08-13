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
    id: "architecture-bureau",
    title: "ARCHITECTURE BUREAU",
    description:
      "An editorial architectural showcase featuring tactile SVG plan reveals, site topography stories, and synchronized Lenis scroll physics.",
    tags: "NEXT.JS 16, GSAP SCROLLTRIGGER, EDITORIAL UI",
    role: "Art direction & Frontend Architecture",
    href: "/work/architecture-bureau",
    image: [
      "/images/projects/architecture-bureau.jpg",
      "/images/projects/architecture-bureau-2.jpg",
      "/images/projects/architecture-bureau-3.jpg",
    ],
    bgMediaUrl: "/images/projects/architecture-bureau.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Editorial Digital Showcase / Next.js",
      overview:
        "A high-craft architectural case study centered on the 'Casa Larga' mountain site outside Medellín, giving drawings, materials, and spatial thresholds a deliberate, tactile visual pace.",
      challenge:
        "Standard agency sites rush user attention through high-contrast banners. The challenge was orchestrating technical CAD line drawings, thermal mass concrete specs, and forest photography with zero visual clutter or performance degradation.",
      approach: [
        "Architected custom SVG line-drawing stroke animations (.plan-svg) triggered cleanly via GSAP ScrollTrigger.",
        "Synchronized Lenis momentum scroll physics with header auto-hide behavior and graceful reduced-motion fallbacks.",
        "Refactored code into isolated modular primitives (PlanSvg, ImageReveal, InquiryModal) for strict maintainability.",
      ],
      outcome:
        "A serene, editorial-grade architecture showcase that communicates spatial precision and converts visitors via a seamless inquiry modal.",
    },
  },
  {
    id: "frame-estate",
    title: "FRAME ESTATE",
    description:
      "A modern timber-frame construction platform built to clarify scope, material origin, and phase handovers.",
    tags: "NEXT.JS 16, PARALLAX SCROLL, B2B BRANDING",
    role: "Brand Experience & Frontend Engineering",
    href: "/work/frame-estate",
    image: [
      "/images/projects/frame-estate.jpg",
      "/images/projects/frame-estate-2.jpg",
      "/images/projects/frame-estate-3.jpg",
    ],
    bgMediaUrl: "/images/projects/frame-estate.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "B2B Construction Platform / Next.js",
      overview:
        "A responsive construction platform concept built to translate complex architectural frame building processes into a transparent, step-by-step digital journey.",
      challenge:
        "Commercial construction leads often drop off due to opaque project stages and impersonal contact forms.",
      approach: [
        "Engineered staggered card reveals, magnetic micro-interactions, and visual material breakdowns.",
        "Built a dedicated local-first consultation flow with immediate feedback and accessible modal states.",
        "Created production-grade SEO infrastructure with auto-generated sitemaps, canonical tags, and asset attribution.",
      ],
      outcome:
        "An authoritative B2B construction brand experience that transforms complex building phases into a clear conversion funnel.",
    },
  },
  {
    id: "harmony-sound",
    title: "HARMONY SOUND",
    description:
      "An editorial e-commerce concept for a premium audio atelier with a working cart, live product filtering, and a bespoke CSS design system.",
    tags: "NEXT.JS 16, REACT 19, BESPOKE CSS",
    role: "Design & Frontend Engineering",
    href: "/work/harmony-sound",
    image: [
      "/images/projects/harmony-sound.jpg",
      "/images/projects/harmony-sound-2.jpg",
      "/images/projects/harmony-sound-3.jpg",
    ],
    bgMediaUrl: "/images/projects/harmony-sound.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "E-commerce Concept / Next.js",
      overview:
        "An editorial storefront for a premium audio atelier, built so the products carry the page without a template system doing the talking.",
      challenge:
        "Product pages too easily become grids of features. The store needed real commerce behavior without losing a calm, editorial pace.",
      approach: [
        "Built a working cart drawer with quantity controls, line removal, live subtotals, and full dialog accessibility.",
        "Implemented live category filtering and free-text search through a single memoized pass, with an accessible empty state.",
        "Designed a bespoke CSS system with Lenis smooth scroll and IntersectionObserver reveals, fully reduced-motion aware.",
      ],
      outcome:
        "An e-commerce concept where art direction and checkout behavior coexist without either one dominating.",
    },
  },
  {
    id: "ockham",
    title: "OCKHAM",
    description:
      "A brutalist video production portfolio with a custom motion engine and a scripted ffmpeg + sharp pipeline that renders a 15-second ad.",
    tags: "NEXT.JS 16, LENIS, FFMPEG PIPELINE",
    role: "Creative Engineering",
    href: "/work/ockham",
    image: [
      "/images/projects/ockham.jpg",
      "/images/projects/ockham-2.jpg",
      "/images/projects/ockham-3.jpg",
    ],
    bgMediaUrl: "/images/projects/ockham.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Creative Portfolio / Next.js",
      overview:
        "A brutalist portfolio for a video production company, built around a hand-rolled motion system and an automated ad-render pipeline.",
      challenge:
        "The site had to feel like the work it sells: direct, heavy, and a little raw. Off-the-shelf animation libraries would have softened it.",
      approach: [
        "Wrote a custom motion engine on Lenis with magnetic buttons, parallax offsets, text reveals, a scroll progress bar, and modal-aware scroll pausing.",
        "Built a render script that generates 360 SVG frames and pipes them through ffmpeg to produce a 15-second MP4 from the command line.",
        "Shipped a generated Open Graph image, JSON-LD, sitemap, and robots, with security headers on every response.",
      ],
      outcome:
        "A portfolio whose animation system and content pipeline are as handmade as the work it presents.",
    },
  },
  {
    id: "the-ordinary",
    title: "THE ORDINARY",
    description:
      "An ingredient-led skincare landing page with masked-line type, a working cart and search, and product-level structured data.",
    tags: "NEXT.JS 16, LENIS, JSON-LD",
    role: "Design & Frontend Engineering",
    href: "/work/the-ordinary",
    image: [
      "/images/projects/the-ordinary.jpg",
      "/images/projects/the-ordinary-2.jpg",
      "/images/projects/the-ordinary-3.jpg",
    ],
    bgMediaUrl: "/images/projects/the-ordinary.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Brand Landing Page / Next.js",
      overview:
        "A clinical, ingredient-led skincare landing page that lets typography and restraint do the talking.",
      challenge:
        "Skincare marketing is noisy. The page had to feel scientific and honest while still moving product.",
      approach: [
        "Used slow masked-line headline reveals and clip-path image wipes driven by a single IntersectionObserver.",
        "Built a working cart with a count badge, a search bar, and drawer panels for menu, account, and cart with scroll lock.",
        "Added product-level JSON-LD with real pricing and a generated Open Graph image for richer search results.",
      ],
      outcome:
        "A landing page that reads as credible first, promotional second.",
    },
  },
  {
    id: "parana-property-group",
    title: "PARANÁ PROPERTY GROUP",
    description:
      "A corporate real estate site for Paraná with a cinematic hero, a cyclic property gallery, and an accessible inquiry flow.",
    tags: "NEXT.JS 16, REACT 19",
    role: "Design & Frontend Engineering",
    href: "/work/parana-property-group",
    image: [
      "/images/projects/parana.jpg",
      "/images/projects/parana-2.jpg",
      "/images/projects/parana-3.jpg",
    ],
    bgMediaUrl: "/images/projects/parana.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Corporate Real Estate / Next.js",
      overview:
        "A confident, single-page presence for a property group, built around strong imagery and a direct path to inquiry.",
      challenge:
        "Real estate sites bury the ask under listings and carousels. This one needed presence without friction.",
      approach: [
        "Composed a cinematic hero with an active-nav state and a scroll cue that guides the visitor downward.",
        "Built a cyclic gallery carousel and an inquiry modal with a success state, Escape handling, and body scroll lock.",
        "Kept motion to CSS transitions and focus-visible states so the page stays fast and quiet.",
      ],
      outcome: "A presence that sells the developer, not just the property.",
    },
  },
  {
    id: "open-trip",
    title: "OPEN TRIP",
    description:
      "A travel booking concept for open trips across Indonesia with a dual filter system and a trip detail modal.",
    tags: "NEXT.JS 16, REACT 19",
    role: "Frontend Engineering",
    href: "/work/open-trip",
    image: [
      "/images/projects/open-trip.jpg",
      "/images/projects/open-trip-2.jpg",
      "/images/projects/open-trip-3.jpg",
    ],
    bgMediaUrl: "/images/projects/open-trip.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Travel Booking Concept / Next.js",
      overview:
        "An open-trip operator site that makes deciding between trips easier, with search and filters that actually change the list.",
      challenge:
        "Trip listing pages fail when filters are decorative. Every control on this page had to drive the results.",
      approach: [
        "Built a hero search bar and a destination filter bar that both feed a single filtering layer over the trip list.",
        "Added a no-results state with a reset action and a live result count announced to screen readers.",
        "Wrapped trip details in an accessible modal with a mailto booking handoff.",
      ],
      outcome:
        "A travel site where narrowing from a full list to one trip takes two deliberate clicks.",
    },
  },
  {
    id: "meat-master",
    title: "MEAT MASTER",
    description:
      "A Russian-language restaurant site with a working dish carousel, reservation form, and Lenis-powered anchor routing.",
    tags: "NEXT.JS 16, LENIS, RUSSIAN LOCALE",
    role: "Design & Frontend Engineering",
    href: "/work/meat-master",
    image: [
      "/images/projects/meat-master.jpg",
      "/images/projects/meat-master-2.jpg",
      "/images/projects/meat-master-3.jpg",
    ],
    bgMediaUrl: "/images/projects/meat-master.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Restaurant Website / Next.js",
      overview:
        "A wood-fire restaurant site built around the two things people actually want: the menu and the reservation.",
      challenge:
        "Restaurant sites usually bury the menu and the booking under prose. This one had to keep both one scroll away.",
      approach: [
        "Built a category-tabbed dish carousel with a working add-to-cart count and interactive delivery slot selection.",
        "Implemented a validated reservation form with a success state and hash links routed through Lenis smooth scroll.",
        "Shipped Restaurant JSON-LD, a generated Open Graph image, sitemap, and robots for local search.",
      ],
      outcome:
        "A restaurant site that treats the menu as the hero and the reservation as the goal.",
    },
  },
  {
    id: "luvbag-fitness",
    title: "LUVBAG FITNESS",
    description:
      "A fitness equipment storefront with a live product customizer that swaps color, quantity, and cart state in place.",
    tags: "NEXT.JS 16, REACT 19, LENIS",
    role: "Design & Frontend Engineering",
    href: "/work/luvbag-fitness",
    image: [
      "/images/projects/luvbag.jpg",
      "/images/projects/luvbag-2.jpg",
      "/images/projects/luvbag-3.jpg",
    ],
    bgMediaUrl: "/images/projects/luvbag.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "E-commerce Storefront / Next.js",
      overview:
        "A storefront for fitness equipment built around one idea: let the customer configure before they commit.",
      challenge:
        "Static product grids make gear feel interchangeable. The store needed a moment of configuration.",
      approach: [
        "Built a product customizer where color swatches restyle the stage image and a quantity stepper updates the cart count live.",
        "Wrapped product details in an accessible modal with focus management and scroll lock, plus a persistent cart toast.",
        "Shipped Organization, WebSite, and Product JSON-LD with real offers and availability.",
      ],
      outcome:
        "A storefront that turns a purchase into a small, satisfying assembly.",
    },
  },
  {
    id: "taste-of-adventure",
    title: "TASTE OF ADVENTURE",
    description:
      "A contemporary restaurant site with tabbed menus, parallax imagery, magnetic CTAs, and a focus-trapped menu modal.",
    tags: "NEXT.JS 16, LENIS, PARALLAX",
    role: "Design & Frontend Engineering",
    href: "/work/taste-of-adventure",
    image: [
      "/images/projects/taste-of-adventure.jpg",
      "/images/projects/taste-of-adventure-2.jpg",
      "/images/projects/taste-of-adventure-3.jpg",
    ],
    bgMediaUrl: "/images/projects/taste-of-adventure.jpg",
    type: "Project",
    category: "web",
    caseStudy: {
      year: "2026",
      service: "Restaurant Website / Next.js",
      overview:
        "A restaurant site built around appetite: full-bleed photography, tabbed menus, and an unmissable reservation.",
      challenge:
        "A restaurant site must feel like walking into the room, not like reading a brochure.",
      approach: [
        "Built a tabbed dish menu with full ARIA tab semantics and a focus-trapped full-menu modal that pauses Lenis while open.",
        "Added parallax on key imagery, magnetic CTAs, and a scroll progress bar, all reduced-motion aware.",
        "Routed every anchor link through Lenis with focus management for keyboard users.",
      ],
      outcome:
        "A site with the warmth of the room and the clarity of a good menu.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return SELECTED_WORKS.find((project) => project.id === slug);
}
