"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { useHomeContext } from "@/context/HomeContext";
import { HOME_DESCRIPTION } from "@/lib/site";
import { BRAND_IDENTITY } from "@/lib/constants";

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isHomePageLoading } = useHomeContext();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isHomePageLoading) return;

      const wrapper = section.querySelector(".about-me-wrapper");
      const lines = section.querySelectorAll(".about-me-description .line");
      const pic = section.querySelector(".display-pic");

      if (pic && lines) {
        lines.forEach((line) => {
          const split = SplitText.create(line, { type: "words" });
          gsap.set(split.words, { y: "100%" });
          gsap.to(split.words, {
            y: "0%",
            duration: 1.7,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 90%",
            },
          });
        });

        gsap.fromTo(
          pic,
          { yPercent: -10 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      if (wrapper) {
        gsap.to(wrapper, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: document.querySelector(".services-section"),
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [isHomePageLoading] }
  );

  return (
    <section ref={sectionRef} className="about-me-section">
      <div className="about-me-wrapper">
        <div className="about-me-info">
          <p className="about-me-description text-medium split-n-wrap">
            {HOME_DESCRIPTION}
          </p>
          <Link href="/about-me" className="know-more">
            [Know More]
          </Link>
        </div>
        <div className="about-me-pic">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/menu/about.png"
            className="display-pic"
            alt={`Image of ${BRAND_IDENTITY.name}, a software engineer specialised in web development`}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </section>
  );
}
