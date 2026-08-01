"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

export function scrollToTarget(target: string | number, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset });
  } else if (typeof target === "number") {
    window.scrollTo(0, target);
  } else {
    const el = document.querySelector(target);
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.top + offset);
    }
  }
}
