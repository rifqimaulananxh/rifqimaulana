"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SERVICES_DATA } from "@/lib/services";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  let imageCount = 0;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const textEls = section.querySelectorAll(".service-text");
      const imgEls = section.querySelectorAll(".service-img-wrapper");
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1024px)", () => {
        imgEls.forEach((el) => {
          gsap.fromTo(
            el,
            { height: "0px" },
            {
              height: "25px",
              duration: 1,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
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
              duration: 1,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 95%" },
            }
          );
        });
      });

      textEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.5 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="Services" className="services-section">
      <div className="container">
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
                      alt="service-img-1"
                      fill
                      sizes="(max-width: 1024px) 40px, 110px"
                      style={{ objectFit: "cover" }}
                    />
                    <Image
                      className="img-2"
                      src={img2}
                      alt="service-img-2"
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
