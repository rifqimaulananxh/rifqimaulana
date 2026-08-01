"use client";

import { getLenis } from "@/hooks/useLenis";

export const ROUTE_NAMES: Record<string, string> = {
  "/": "Home",
  "/work": "Work",
  "/services": "Services",
  "/about-me": "About Me",
  "/contact": "Contact",
};

let pendingHash: string | null = null;

export function getPendingHash() {
  return pendingHash;
}

export function consumePendingHash() {
  const hash = pendingHash;
  pendingHash = null;
  return hash;
}

export function navigateTo(href: string) {
  if (typeof window === "undefined") return;
  const [path, hash] = href.split("#");
  const normalizedPath = path || "/";
  if (normalizedPath === window.location.pathname) {
    if (hash) {
      pendingHash = hash;
      window.dispatchEvent(new CustomEvent("route:scroll"));
    } else {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    return;
  }
  pendingHash = hash || null;
  window.dispatchEvent(new CustomEvent("route:navigate", { detail: href }));
}
