"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

let lenisInstance: Lenis | null = null;
const lenisReadyCallbacks = new Set<(lenis: Lenis) => void>();
let scrollLockCount = 0;
let originalBodyOverflow = "";
let originalDocumentOverflow = "";
let pendingLenisStop = () => {};

export function getLenis() {
  return lenisInstance;
}

export function whenLenisReady(cb: (lenis: Lenis) => void) {
  if (lenisInstance) {
    cb(lenisInstance);
    return () => {};
  }
  lenisReadyCallbacks.add(cb);
  return () => {
    lenisReadyCallbacks.delete(cb);
  };
}

export function lockScroll() {
  if (typeof document === "undefined") return () => {};

  if (scrollLockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    originalDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const stopLenis = (lenis: Lenis) => lenis.stop();
    const lenis = getLenis();
    if (lenis) {
      stopLenis(lenis);
    } else {
      pendingLenisStop = whenLenisReady(stopLenis);
    }
  }

  scrollLockCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    scrollLockCount = Math.max(0, scrollLockCount - 1);

    if (scrollLockCount === 0) {
      pendingLenisStop();
      pendingLenisStop = () => {};
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocumentOverflow;
      getLenis()?.start();
    }
  };
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;
    lenisReadyCallbacks.forEach((cb) => cb(lenis));
    lenisReadyCallbacks.clear();

    lenis.on("scroll", ScrollTrigger.update);
    const rafTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafTicker);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

export function scrollToTarget(target: string | number, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset });
  } else if (typeof target === "number") {
    window.scrollTo({
      top: target,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  } else {
    const el = document.querySelector(target);
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top + offset,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }
}
