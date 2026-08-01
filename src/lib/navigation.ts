"use client";

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
  if (path === window.location.pathname) {
    if (hash) {
      pendingHash = hash;
      window.dispatchEvent(new CustomEvent("route:scroll"));
    }
    return;
  }
  pendingHash = hash || null;
  window.dispatchEvent(new CustomEvent("route:navigate", { detail: href }));
}
