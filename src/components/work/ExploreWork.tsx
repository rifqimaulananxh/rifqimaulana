"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { navigateTo } from "@/lib/navigation";

export function ExploreWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const text = section.querySelector(".explore-text");
      if (!text) return;

      gsap.fromTo(
        text,
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="work-scroll-section">
      <div
        className="explore-link"
        onClick={() => navigateTo("/work")}
        style={{ cursor: "pointer" }}
      >
        <span className="explore-text">Explore all work</span>
      </div>
    </section>
  );
}
