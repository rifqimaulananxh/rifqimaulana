"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/hooks/useLenis";
import {
  ROUTE_NAMES,
  consumePendingHash,
} from "@/lib/navigation";

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef<string | null>(null);
  const navigatingRef = useRef(false);
  const [label, setLabel] = useState("Home");

  const playIn = useCallback(
    (href: string) => {
      if (navigatingRef.current) return;
      navigatingRef.current = true;
      const panel = panelRef.current;
      if (!panel) return;

      const [path] = href.split("#");
      setLabel(ROUTE_NAMES[path] || "Home");

      const lenis = getLenis();
      lenis?.stop();

      gsap.set(panel, { visibility: "visible" });
      gsap.to(panel, {
        top: "0%",
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [router]
  );

  useEffect(() => {
    const handler = (e: Event) => {
      playIn((e as CustomEvent<string>).detail);
    };
    window.addEventListener("route:navigate", handler);
    return () => window.removeEventListener("route:navigate", handler);
  }, [playIn]);

  useEffect(() => {
    const handler = () => {
      const hash = consumePendingHash();
      if (hash) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(`#${hash}`, { duration: 1.2 });
        } else {
          scrollToTarget(`#${hash}`);
        }
      }
    };
    window.addEventListener("route:scroll", handler);
    return () => window.removeEventListener("route:scroll", handler);
  }, []);

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname;
      setLabel(ROUTE_NAMES[pathname] || "Home");
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const lenis = getLenis();
    const hash = consumePendingHash();

    lenis?.start();
    if (lenis) {
      if (hash) {
        lenis.scrollTo(`#${hash}`, { duration: 1.2 });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    } else if (hash) {
      scrollToTarget(`#${hash}`);
    } else {
      window.scrollTo(0, 0);
    }

    ScrollTrigger.refresh();

    const panel = panelRef.current;
    if (panel) {
      const timeoutId = window.setTimeout(() => {
        gsap.to(panel, {
          top: "100%",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(panel, { visibility: "hidden" });
            navigatingRef.current = false;
          },
        });
      }, 400);
      return () => window.clearTimeout(timeoutId);
    }
    navigatingRef.current = false;
  }, [pathname]);

  return (
    <div className="transition" data-transition-wrap="true">
      <div ref={panelRef} className="transition__panel">
        <span className="transition__label">
          <span>[ </span>
          <span data-transition-label-text="true">{label}</span>
          <span> ]</span>
        </span>
      </div>
    </div>
  );
}
