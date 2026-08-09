"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { SERVICES_PAGE, SERVICES_QUOTE } from "@/lib/pages";
import { prefersReducedMotion } from "@/lib/motion";

export function ServiceListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      const quote = section.querySelector(".services-quote");
      if (quote) {
        const words = SplitText.create(quote, { type: "words" }).words;
        gsap.set(words, { yPercent: 110 });
        gsap.to(words, {
          yPercent: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        });
      }

      gsap.fromTo(
        section.querySelectorAll(".accordion-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 65%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="services-list-section">
      <div className="container">
        <div className="service-wrapper">
          <div className="section-heading">
            <div className="sub-heading-wrapper">
              <h1>Capabilities</h1>
              <span className="text-small-1">How I can help</span>
            </div>
          </div>

          <p className="services-quote text-medium split-n-wrap">
            {SERVICES_QUOTE}
          </p>

          <div className="accordion-wrapper">
            {SERVICES_PAGE.map((col, ci) => {
              const isOpen = openIndex === ci;
              return (
                <div
                  key={ci}
                  className={`accordion-item ${isOpen ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="accordion-heading"
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${ci}`}
                    onClick={() => setOpenIndex(isOpen ? null : ci)}
                  >
                    <span className="accordion-index">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <span className="accordion-title text-medium">
                      {col.heading}
                    </span>
                    <span className="accordion-toggle">+</span>
                  </button>
                  <div
                    id={`service-panel-${ci}`}
                    className="accordion-body"
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <div className="accordion-body-inner">
                      <p className="accordion-description text-small">
                        {col.description}
                      </p>
                      <ul className="accordion-list">
                        {col.items.map((item, i) => (
                          <li key={`${ci}-${i}`} className="text-medium">
                            <span className="text-small-1">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
