"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { BRAND_IDENTITY } from "@/lib/constants";
import { navigateTo } from "@/lib/navigation";
import { CurrentTime } from "./CurrentTime";

const subscribe = () => () => {};

const getIsTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const getServerIsTouch = () => false;

const HEADLINE_WORDS = [
  "Building",
  "reliable",
  "web",
  "products",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isTouch = useSyncExternalStore(subscribe, getIsTouch, getServerIsTouch);

  useGSAP(
    () => {
      const t = sectionRef.current;
      if (!t) return;

      const navbar = document.querySelector(".navbar");
      const headings = t.querySelectorAll(".hero-heading");
      const labels = t.querySelectorAll(".hero-label");
      const textSmalls = t.querySelectorAll(".hero-info-text");

      gsap.set([navbar, labels, textSmalls], { opacity: 0 });
      gsap.set(headings, { opacity: 0 });

      if (!isTouch) {
        SplitText.create(headings, { type: "words" })
          .words.forEach((word) => {
            const chars = SplitText.create(word, { type: "chars" });
            gsap.set(chars.chars, { yPercent: 100 });
            gsap.to(chars.chars, {
              yPercent: 0,
              duration: 0.8,
              stagger: 0.03,
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
          delay: 1.2,
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
      <div className="stage-perspective">
        <div className="stage">
          <div className="projects">
            {HEADLINE_WORDS.map((word, i) => (
              <div key={i} className="project-container">
                <h1 className="hero-heading">{word}</h1>
              </div>
            ))}
          </div>

          <div className="hero-info">
            <span className="text-small hero-label">(01)</span>
            <span className="text-small hero-info-text">{BRAND_IDENTITY.role}</span>
            <span className="text-small hero-info-text">{BRAND_IDENTITY.name}</span>
            <span className="text-small hero-info-text">
              Current time: <CurrentTime /> WIB
            </span>
            <button
              type="button"
              className="hero-cta text-small hero-info-text"
              onClick={() => navigateTo("/work")}
            >
              [ View selected work ]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
