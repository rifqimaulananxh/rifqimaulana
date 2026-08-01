"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { BRAND_IDENTITY } from "@/lib/constants";
import { CurrentTime } from "./CurrentTime";

const subscribe = () => () => {};

const getIsTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const getServerIsTouch = () => false;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isTouch = useSyncExternalStore(subscribe, getIsTouch, getServerIsTouch);

  // Intro reveal + scroll parallax
  useGSAP(
    () => {
      const t = sectionRef.current;
      if (!t) return;

      const navbar = document.querySelector(".navbar");
      const headings = t.querySelectorAll(".hero-heading");
      const labels = t.querySelectorAll(".hero-label");
      const textSmalls = t.querySelectorAll(".text-small");

      gsap.set([navbar, headings, labels, textSmalls], { opacity: 0 });

      if (!isTouch) {
        SplitText.create(headings, { type: "words" })
          .words.forEach((word) => {
            const chars = SplitText.create(word, { type: "chars" });
            gsap.set(chars.chars, { yPercent: 100 });
            gsap.to(chars.chars, {
              yPercent: 0,
              duration: 1,
              stagger: 0.04,
              ease: "power4.out",
            });
          });
      }

      gsap.set(headings, { opacity: 1 });
      gsap.to(
        [navbar, labels, textSmalls],
        {
          opacity: 1,
          duration: 0.6,
          delay: 1,
          ease: "power2.out",
        }
      );

    },
    { scope: sectionRef, dependencies: [isTouch] }
  );

  return (
    <section
      ref={sectionRef}
      className={`home-hero-section ${isTouch ? "is-touch-device" : "is-mouse-device"}`}
    >
      <div className="hero-content container">
        <div className="hero-label-row">
          <span className="text-small hero-label">(01)</span>
          <span className="text-small hero-label">
            [ {BRAND_IDENTITY.role} ]
          </span>
        </div>

        <div className="hero-big-heading">
          <div className="upper-heading-desktop">
            <h1 className="hero-heading">{BRAND_IDENTITY.headlineDesktop}</h1>
          </div>
          <div className="upper-heading-mobile" aria-hidden="true">
            <span className="hero-heading">
              {BRAND_IDENTITY.headlineMobileTop}
            </span>
            <span className="hero-heading">
              {BRAND_IDENTITY.headlineMobileBottom}
            </span>
          </div>

          <div className="bottom-row">
            <div className="left">
              <span className="text-small">{BRAND_IDENTITY.name}</span>
              <span className="text-small">
                Current time: <CurrentTime /> WIB
              </span>
            </div>
            <span className="right hero-heading">
              {BRAND_IDENTITY.headlineRight}
            </span>
          </div>

          <div className="bottom-row-mobile">
            <span className="text-small">{BRAND_IDENTITY.name}</span>
            <span className="text-small">{BRAND_IDENTITY.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
