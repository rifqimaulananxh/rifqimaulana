"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { SERVICES_DATA } from "@/lib/services";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();
  let imageCount = 0;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady || prefersReducedMotion()) return;

      const imgEls = section.querySelectorAll(".service-img-wrapper");
      const mm = gsap.matchMedia();
      const textSplit = SplitText.create(section.querySelectorAll(".service-text"), {
        type: "words",
        wordsClass: "service-word",
      });
      const words = textSplit.words;
      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => section.classList.add("is-visible"),
        onEnterBack: () => section.classList.add("is-visible"),
        onLeave: () => section.classList.remove("is-visible"),
        onLeaveBack: () => section.classList.remove("is-visible"),
      });

      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      mm.add("(max-width: 1024px)", () => {
        imgEls.forEach((el) => {
          gsap.fromTo(
            el,
            { height: "0px" },
            {
              height: "25px",
              duration: 0.7,
              ease: "power1.out",
              scrollTrigger: { trigger: el, start: "top bottom" },
            }
          );
        });
      });

      mm.add("(min-width: 1025px)", () => {
        imgEls.forEach((el) => {
          gsap.fromTo(
            el,
            { height: "0px" },
            {
              height: "75px",
              duration: 0.7,
              ease: "power1.out",
              scrollTrigger: { trigger: el, start: "top bottom" },
            }
          );
        });
      });

      return () => {
        sectionTrigger.kill();
        section.classList.remove("is-visible");
        textSplit.revert();
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      id="Services"
      className="services-section"
      aria-labelledby="home-services-heading"
    >
      <div className="container">
        <h2 id="home-services-heading" className="sr-only">
          Services
        </h2>
        <div className="service-list">
          {SERVICES_DATA.map((item, i) => {
            if ("title" in item) {
              return (
                <span key={`service-${i}`} className="service-item">
                  <span className="service-text text-large">
                    {item.title},&nbsp;
                  </span>
                </span>
              );
            }
            if ("imageSet" in item && item.imageSet.length >= 2) {
              const a = imageCount++;
              const [img1, img2] = item.imageSet;
              return (
                <span key={`service-${i}`} className="service-item">
                  <span className="service-img-wrapper">
                    <Image
                      className="img-1"
                      src={img1}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 1024px) 40px, 110px"
                      style={{ objectFit: "cover" }}
                    />
                    <Image
                      className="img-2"
                      src={img2}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 1024px) 40px, 110px"
                      style={{
                        objectFit: "cover",
                        animationDuration: `${2.5 + (1.7 * a) % 3}s`,
                        animationDelay: `${(2.3 * a) % 4}s`,
                      }}
                    />
                    <div
                      className="black-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </span>
                  &nbsp;
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}
