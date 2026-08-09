"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { FAQ_ITEMS } from "@/lib/pages";
import { navigateTo } from "@/lib/navigation";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady || prefersReducedMotion()) return;

      gsap.fromTo(
        section.querySelectorAll(".faq-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} className="faq-section" id="faq">
      <div className="container">
        <div className="faq-wrapper">
          <div className="heading-wrapper">
            <h2 className="faq-heading">FAQ</h2>
            <div className="sub-heading-wrapper">
              <span className="text-x-small">
                Can&apos;t find the answer you&apos;re looking for?
              </span>
              <a
                className="get-in-touch text-x-small"
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/contact");
                }}
              >
                Get in touch
              </a>
            </div>
          </div>
          <div className="accordion-wrapper">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="question-wrapper"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span className="question">{item.q}</span>
                    <span className="icon" />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className="answer-wrapper"
                    role="region"
                    aria-hidden={!isOpen}
                  >
                      <div className="answer-inner">
                        <p>{item.a}</p>
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
