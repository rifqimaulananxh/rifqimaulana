import type { Project } from "./projects";

export const PLAYGROUND_ITEMS: Project[] = [
  {
    id: "depth-scroll",
    title: "Depth Scroll",
    description:
      "Gallery display where images are placed in z-axis for realistic 3d feel",
    tags: "EXPERIMENT",
    role: "WebGL / Three.js",
    href: "#depth-scroll",
    image: ["/images/menu/home.png"],
    bgMediaUrl: "/images/menu/home.png",
    type: "Playground",
    category: "playground",
  },
  {
    id: "3d-scroll",
    title: "3D Scroll",
    description:
      "Scroll animation where a 3D model changes its sizes and position according to scroll",
    tags: "EXPERIMENT",
    role: "Three.js",
    href: "#3d-scroll",
    image: ["/images/menu/work.png"],
    bgMediaUrl: "/images/menu/work.png",
    type: "Playground",
    category: "playground",
  },
  {
    id: "hover-effect",
    title: "Hover Effect",
    description:
      "A hover effect that dynamically changes the background image, featuring an infinite scroll.",
    tags: "EXPERIMENT",
    role: "GSAP",
    href: "#hover-effect",
    image: ["/images/menu/rose.png"],
    bgMediaUrl: "/images/menu/rose.png",
    type: "Playground",
    category: "playground",
  },
  {
    id: "immersive-sphere",
    title: "Immersive Sphere",
    description:
      "An interactive 2D sphere that provides a realistic 3D feel.",
    tags: "EXPERIMENT",
    role: "Canvas 2D",
    href: "#immersive-sphere",
    image: ["/images/menu/about.png"],
    bgMediaUrl: "/images/menu/about.png",
    type: "Playground",
    category: "playground",
  },
  {
    id: "svg-path",
    title: "SVG Path",
    description:
      "A scroll-driven SVG path animation that reveals content throughout the page.",
    tags: "EXPERIMENT",
    role: "GSAP ScrollTrigger",
    href: "#svg-path",
    image: ["/images/menu/work.png"],
    bgMediaUrl: "/images/menu/work.png",
    type: "Playground",
    category: "playground",
  },
  {
    id: "scroll-video",
    title: "Scroll Video",
    description:
      "Turned a video into scroll animation. The video seems to be played on scroll.",
    tags: "EXPERIMENT",
    role: "GSAP ScrollTrigger",
    href: "#scroll-video",
    image: ["/images/menu/home.png"],
    bgMediaUrl: "/images/menu/home.png",
    type: "Playground",
    category: "playground",
  },
];
