"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady, useRouteReady } from "@/lib/intro";

const HEADLINE_WORDS = ["Building", "useful", "web", "products"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();
  const routeReady = useRouteReady();
  const revealReady = introReady || routeReady;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !revealReady) return;

      const navbar = document.querySelector(".navbar");
      const titleLines = section.querySelectorAll(".hero-title-line");
      const content = section.querySelectorAll("[data-hero-content]");
      const revealTargets = [
        ...Array.from(content),
        ...(navbar ? [navbar] : []),
      ];

      if (prefersReducedMotion()) {
        return;
      }

      gsap.fromTo(
        titleLines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.35,
          stagger: 0.1,
          ease: "power4.out",
        }
      );
      gsap.fromTo(
        revealTargets,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef, dependencies: [revealReady], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="home-hero-redesign">
      <div className="container hero-redesign-grid">
        <div className="hero-redesign-copy">
          <h1 className="hero-title" aria-label="Building useful web products">
            {HEADLINE_WORDS.map((word) => (
              <span key={word} className="hero-title-mask">
                <span className="hero-title-line">{word}</span>
              </span>
            ))}
          </h1>
          <div className="hero-redesign-footer text-small" data-hero-content>
            <span>Clear decisions from first interaction to production.</span>
          </div>
        </div>
        <div className="hero-graphic" data-hero-content>
          <Image
            src="/images/projects/architecture-bureau.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="hero-graphic-image"
          />
        </div>
      </div>
    </section>
  );
}
