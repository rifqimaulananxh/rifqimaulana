"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface StackItem {
  name: string;
  logo: string;
}

const STACK_ITEMS: StackItem[] = [
  { name: "Next.js", logo: "N" },
  { name: "React", logo: "R" },
  { name: "TypeScript", logo: "TS" },
  { name: "Tailwind CSS", logo: "TW" },
  { name: "TanStack Query", logo: "TQ" },
  { name: "NestJS", logo: "N" },
  { name: "Prisma ORM", logo: "P" },
  { name: "Swagger", logo: "S" },
  { name: "PostgreSQL", logo: "PG" },
  { name: "Redis", logo: "R" },
  { name: "JWT", logo: "JWT" },
  { name: "Docker", logo: "D" },
];

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const group = groupRef.current;
      if (!section || !track || !group) return;
      if (prefersReducedMotion()) {
        return;
      }

      const tween = gsap.to(track, {
        x: () => -group.offsetWidth,
        duration: () => group.offsetWidth / 50,
        ease: "none",
        repeat: -1,
      });
      const viewport = section.querySelector(".stack-marquee-viewport");
      const pause = () => tween.pause();
      const resume = () => tween.resume();
      viewport?.addEventListener("mouseenter", pause);
      viewport?.addEventListener("mouseleave", resume);

      return () => {
        viewport?.removeEventListener("mouseenter", pause);
        viewport?.removeEventListener("mouseleave", resume);
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="stack-section" aria-labelledby="stack-heading">
      <div className="container stack-intro">
        <h2 id="stack-heading">Stack</h2>
        <p>
          The tools I use to shape interfaces, build dependable systems, and
          take products into production.
        </p>
      </div>
      <div className="stack-marquee-viewport" aria-label="Technology stack">
        <div ref={trackRef} className="stack-marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? groupRef : undefined}
              className="stack-marquee-group"
              aria-hidden={copy === 1}
            >
              {STACK_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item.name}`}
                  className="stack-marquee-item"
                >
                  <span className="stack-logo" aria-hidden="true">
                    {item.logo}
                  </span>
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
