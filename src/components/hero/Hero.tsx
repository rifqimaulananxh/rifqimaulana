"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BRAND_IDENTITY } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

const HEADLINE_WORDS = ["Building", "reliable", "web", "products"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const navbar = document.querySelector(".navbar");
      const titleLines = section.querySelectorAll(".hero-title-line");
      const content = section.querySelectorAll("[data-hero-content]");
      const image = section.querySelector(".hero-visual-image");
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
      if (image) {
        gsap.fromTo(
          image,
          { height: "0%" },
          {
            height: "100%",
            duration: 0.7,
            ease: "power1.out",
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="home-hero-redesign">
      <div className="container hero-redesign-grid">
        <div className="hero-redesign-copy">
          <div className="hero-kicker text-small" data-hero-content>
            <span>{BRAND_IDENTITY.name}</span>
            <span>{BRAND_IDENTITY.label}</span>
          </div>
          <h1 className="hero-title" aria-label="Building reliable web products">
            {HEADLINE_WORDS.map((word) => (
              <span key={word} className="hero-title-mask">
                <span className="hero-title-line">{word}</span>
              </span>
            ))}
          </h1>
          <div className="hero-redesign-footer text-small" data-hero-content>
            <span>From interface to deployment</span>
            <Link href="/work">[ View selected work ]</Link>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/images/portofolio/rifqi.webp"
            alt={`Portrait of ${BRAND_IDENTITY.name}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
            className="hero-visual-image image-reveal"
          />
          <div className="hero-visual-caption text-small" aria-hidden="true">
            <span>Software engineer / Indonesia</span>
            <span>01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
