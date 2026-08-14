"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { FOOTER_LINKS } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";
import { navigateTo } from "@/lib/navigation";

export function ContactHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady || prefersReducedMotion()) return;
      gsap.fromTo(
        section.querySelectorAll("[data-contact-reveal]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="contact-home-section">
      <div className="container">
        <p className="text-small" data-contact-reveal>
          Contact
        </p>
        <h2 className="contact-home-title" data-contact-reveal>
          Clear decisions from
          <br />
          first interaction to production.
        </h2>
        <div className="contact-home-actions" data-contact-reveal>
          <a
            className="contact-home-email"
            href={`mailto:${FOOTER_LINKS.email}`}
          >
            {FOOTER_LINKS.email}
          </a>
          <button
            type="button"
            className="contact-home-cta text-small"
            onClick={() => navigateTo("/contact")}
          >
            Start a project
          </button>
        </div>
      </div>
    </section>
  );
}
