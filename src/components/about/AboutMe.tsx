"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { HOME_DESCRIPTION } from "@/lib/site";
import { BRAND_IDENTITY } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady || prefersReducedMotion()) return;

      const wrapper = section.querySelector(".about-me-wrapper");
      const description = section.querySelector(".about-me-description");
      const pic = section.querySelector(".display-pic");

      if (pic && description) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1025px)", () => {
          const words = SplitText.create(description, {
            type: "words",
            mask: "words",
            wordsClass: "about-word",
          }).words;
          gsap.set(words, { y: "100%" });
          gsap.to(words, {
            y: "0%",
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: description,
              start: "top 90%",
            },
          });
        });

        gsap.fromTo(
          pic,
          { height: "0%" },
          {
            height: "100%",
            duration: 0.7,
            ease: "power1.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
            },
          }
        );

        return () => mm.revert();
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
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className="about-me-section"
      aria-labelledby="home-about-heading"
    >
      <div className="about-me-wrapper">
        <div className="about-me-info">
          <h2 id="home-about-heading" className="sr-only">
            About me
          </h2>
          <p className="about-me-description text-medium split-n-wrap">
            {HOME_DESCRIPTION}
          </p>
          <Link href="/about-me" className="know-more">
            [Know More]
          </Link>
        </div>
        <div className="about-me-pic">
          <Image
            src="/images/portofolio/rifqi.webp"
            className="display-pic image-reveal"
            alt={`Image of ${BRAND_IDENTITY.name}, a software engineer specialised in web development`}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
