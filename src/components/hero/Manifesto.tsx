"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const MANIFESTO =
  "I build reliable web products from interface to deployment. Clear systems, purposeful motion, and details that make complex things feel simple.";
const MANIFESTO_WORDS = MANIFESTO.split(" ");

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const words = gsap.utils.toArray<HTMLElement>(
        "[data-manifesto-word]",
        section
      );

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="manifesto-section"
      aria-labelledby="manifesto-heading"
    >
      <div className="manifesto-sticky">
        <div className="container manifesto-inner">
          <h2 id="manifesto-heading" className="sr-only">
            How I work
          </h2>
          <p className="manifesto-copy">
            {MANIFESTO_WORDS.map((word, index) => (
              <span key={`${word}-${index}`} data-manifesto-word>
                {word}
                {index < MANIFESTO_WORDS.length - 1 ? " " : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
