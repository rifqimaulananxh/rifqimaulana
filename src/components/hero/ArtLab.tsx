"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";
import { scrollToTarget } from "@/hooks/useLenis";

const ART_ITEMS = [
  {
    src: "/images/portofolio/porto-6.webp",
    label: "Depth Scroll",
  },
  {
    src: "/images/portofolio/porto-7.webp",
    label: "3D Scroll",
  },
  {
    src: "/images/portofolio/porto-1.webp",
    label: "Immersive Sphere",
  },
];

export function ArtLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady || prefersReducedMotion()) return;
      gsap.fromTo(
        section.querySelectorAll(".art-lab-image"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  const handleScrollToPlayground = () => {
    scrollToTarget("#playground", -window.innerHeight * 0.12);
  };

  return (
    <section ref={sectionRef} className="art-lab-section">
      <div className="container art-lab-grid">
        <div className="art-lab-copy">
          <p className="text-small">The Art Lab</p>
          <h2 className="art-lab-title">
            Where structure
            <br />
            meets instinct.
          </h2>
          <p className="art-lab-description">
            Experiments, motion studies, and interactive sketches pushed past
            the grid — built to break the rules so the products don&apos;t have
            to.
          </p>
          <button
            type="button"
            className="art-lab-cta text-small"
            onClick={handleScrollToPlayground}
          >
            View Playground
          </button>
        </div>
        <div className="art-lab-collage">
          {ART_ITEMS.map((item) => (
            <figure key={item.src} className="art-lab-figure">
              <div className="art-lab-image">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <figcaption className="text-small">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
