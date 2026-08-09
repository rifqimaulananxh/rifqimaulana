"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { BRAND_IDENTITY } from "@/lib/constants";
import { getLenis, whenLenisReady } from "@/hooks/useLenis";
import { markIntroReady } from "@/lib/intro";

const INTRO_DURATION = 2800;
const INTRO_ROLE = BRAND_IDENTITY.label.replace(/\[|\]/g, "").trim();
const INTRO_LINES = [
  ...BRAND_IDENTITY.name.split(" "),
  ...INTRO_ROLE.split(" "),
];

export function IntroPreloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) {
      setIsComplete(true);
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalDocumentOverflow = document.documentElement.style.overflow;
    let isUnlocked = false;
    let lenisWasStopped = false;
    let unsubscribe = () => {};

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const stopLenis = (lenis: Lenis) => {
      if (isUnlocked) return;
      lenis.stop();
      lenisWasStopped = true;
    };

    const currentLenis = getLenis();
    if (currentLenis) {
      currentLenis.stop();
      lenisWasStopped = true;
    }
    unsubscribe = whenLenisReady(stopLenis);

    const unlock = () => {
      if (isUnlocked) return;
      isUnlocked = true;
      unsubscribe();
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocumentOverflow;
      if (lenisWasStopped) getLenis()?.start();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionTimeout = window.setTimeout(() => {
        unlock();
        markIntroReady();
        setIsComplete(true);
      }, 0);

      return () => {
        window.clearTimeout(reducedMotionTimeout);
        unlock();
      };
    }

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName !== "intro-preloader-curtain") return;
      unlock();
      markIntroReady();
      setIsComplete(true);
    };

    preloader.addEventListener("animationend", handleAnimationEnd);

    // CSS starts at first paint; this fallback also handles hydration after animationend.
    const rootAnimation = preloader.getAnimations()[0];
    const elapsed =
      typeof rootAnimation?.currentTime === "number"
        ? rootAnimation.currentTime
        : 0;
    const timeoutId = window.setTimeout(() => {
      if (!isUnlocked) {
        unlock();
        markIntroReady();
        setIsComplete(true);
      }
    }, Math.max(INTRO_DURATION - elapsed + 100, 0));

    return () => {
      window.clearTimeout(timeoutId);
      preloader.removeEventListener("animationend", handleAnimationEnd);
      unlock();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div ref={preloaderRef} className="intro-preloader" aria-hidden="true">
      <div className="intro-preloader__center">
        <div className="intro-preloader__word-stack">
          {INTRO_LINES.map((line) => (
            <div className="intro-preloader__line-mask" key={line}>
              <span className="intro-preloader__line">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
