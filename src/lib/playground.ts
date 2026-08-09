import type { Project } from "./projects";

export const PLAYGROUND_ITEMS: Project[] = [
  {
    id: "depth-scroll",
    title: "Depth Scroll",
    description:
      "A depth-based gallery experiment that layers images along the z-axis to create a convincing 3D effect.",
    tags: "EXPERIMENT",
    role: "WebGL / Three.js",
    href: "#depth-scroll",
    image: ["/images/portofolio/porto-6.webp"],
    bgMediaUrl: "/images/portofolio/porto-6.webp",
    type: "Playground",
    category: "playground",
  },
  {
    id: "3d-scroll",
    title: "3D Scroll",
    description:
      "A scroll-driven study where a 3D model changes scale and position as the page moves.",
    tags: "EXPERIMENT",
    role: "Three.js",
    href: "#3d-scroll",
    image: ["/images/portofolio/porto-7.webp"],
    bgMediaUrl: "/images/portofolio/porto-7.webp",
    type: "Playground",
    category: "playground",
  },
  {
    id: "hover-effect",
    title: "Hover Effect",
    description:
      "A hover study that shifts the background image while the gallery keeps moving underneath.",
    tags: "EXPERIMENT",
    role: "GSAP",
    href: "#hover-effect",
    image: ["/images/portofolio/unsplash.webp"],
    bgMediaUrl: "/images/portofolio/unsplash.webp",
    type: "Playground",
    category: "playground",
  },
  {
    id: "immersive-sphere",
    title: "Immersive Sphere",
    description:
      "A 2D canvas experiment that uses light and motion to suggest a three-dimensional sphere.",
    tags: "EXPERIMENT",
    role: "Canvas 2D",
    href: "#immersive-sphere",
    image: ["/images/portofolio/porto-1.webp"],
    bgMediaUrl: "/images/portofolio/porto-1.webp",
    type: "Playground",
    category: "playground",
  },
  {
    id: "svg-path",
    title: "SVG Path",
    description:
      "A scroll-driven SVG study that reveals a path and its content as you move through the page.",
    tags: "EXPERIMENT",
    role: "GSAP ScrollTrigger",
    href: "#svg-path",
    image: ["/images/portofolio/porto-2.webp"],
    bgMediaUrl: "/images/portofolio/porto-2.webp",
    type: "Playground",
    category: "playground",
  },
  {
    id: "scroll-video",
    title: "Scroll Video",
    description:
      "A scroll-driven video study that scrubs through footage in step with the page.",
    tags: "EXPERIMENT",
    role: "GSAP ScrollTrigger",
    href: "#scroll-video",
    image: ["/images/portofolio/porto-3.webp"],
    bgMediaUrl: "/images/portofolio/porto-3.webp",
    type: "Playground",
    category: "playground",
  },
];
