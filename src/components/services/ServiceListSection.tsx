"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SERVICES_PAGE } from "@/lib/pages";

export function ServiceListSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".service-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.2,
          scrollTrigger: { trigger: section, start: "top 70%" },
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
              <h1># Services</h1>
              <span className="text-small-1">What I can help you with?</span>
            </div>
          </div>
          <span className="full-line" />
          <div className="service-container">
            {SERVICES_PAGE.map((col, ci) => (
              <div key={ci} className="service-list">
                <div className="heading text-medium">{col.heading}</div>
                {col.items.map((item, i) => (
                  <div key={`${ci}-${i}`} className="service-item">
                    <div className="arrow-icon-wrapper">
                      <Image
                        className="arrow-icon"
                        src="/icons/arrow.svg"
                        alt="arrow"
                        width={28}
                        height={28}
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
