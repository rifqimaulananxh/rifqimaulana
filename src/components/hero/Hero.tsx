"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { BRAND_IDENTITY, HERO_FEATURES } from "@/lib/constants";
import { CurrentTime } from "./CurrentTime";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const crosshairVRef = useRef<HTMLDivElement>(null);
  const crosshairHRef = useRef<HTMLDivElement>(null);
  const pointerImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const pointerIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const traveledRef = useRef(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [isTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  // 0. Mobile feature image cycling every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((idx) => (idx + 1) % HERO_FEATURES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 1. Mouse crosshair + pointer images
  useGSAP(
    () => {
      const t = sectionRef.current;
      if (!t || isTouch) return;

      const quickX = gsap.quickTo(crosshairVRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      const quickY = gsap.quickTo(crosshairHRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
      const pointerXs = pointerImagesRef.current.map((el) =>
        el ? gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }) : null
      );
      const pointerYs = pointerImagesRef.current.map((el) =>
        el ? gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }) : null
      );

      const { width, height } = t.getBoundingClientRect();
      const startX = 0.75 * width;
      const startY = 0.3 * height;
      gsap.set(crosshairVRef.current, { x: startX });
      gsap.set(crosshairHRef.current, { y: startY });
      pointerImagesRef.current.forEach((el) =>
        el && gsap.set(el, { x: startX, y: startY })
      );

      const onMove = (o: MouseEvent) => {
        const { left, top } = t.getBoundingClientRect();
        const x = o.clientX - left;
        const y = o.clientY - top;

        if (lastPosRef.current.x !== 0 || lastPosRef.current.y !== 0) {
          const dx = x - lastPosRef.current.x;
          const dy = y - lastPosRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          traveledRef.current += dist;
          if (traveledRef.current >= 200) {
            const old = pointerImagesRef.current[pointerIndexRef.current];
            if (old) {
              gsap.killTweensOf(old, "opacity");
              gsap.set(old, { opacity: 0 });
            }
            pointerIndexRef.current =
              (pointerIndexRef.current + 1) % HERO_FEATURES.length;
            const next = pointerImagesRef.current[pointerIndexRef.current];
            if (next) {
              gsap.killTweensOf(next, "opacity");
              gsap.set(next, { opacity: 1 });
            }
            traveledRef.current = traveledRef.current % 200;
          }
        }
        lastPosRef.current = { x, y };

        quickX(x);
        quickY(y);
        pointerXs.forEach((fn) => fn && fn(x));
        pointerYs.forEach((fn) => fn && fn(y));
      };

      const onEnter = () => {
        const current = pointerImagesRef.current[pointerIndexRef.current];
        gsap.to(
          [crosshairHRef.current, crosshairVRef.current, current],
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      };

      const onLeave = () => {
        gsap.to(
          [crosshairHRef.current, crosshairVRef.current, ...pointerImagesRef.current],
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            overwrite: "auto",
          }
        );
      };

      t.addEventListener("mousemove", onMove, { passive: true });
      t.addEventListener("mouseenter", onEnter);
      t.addEventListener("mouseleave", onLeave);

      return () => {
        t.removeEventListener("mousemove", onMove);
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef }
  );

  // 2. Intro reveal + scroll parallax
  useGSAP(
    () => {
      const t = sectionRef.current;
      if (!t) return;

      const navbar = document.querySelector(".navbar");
      const headings = t.querySelectorAll(".hero-heading");
      const crosshairH = t.querySelector(".crosshair-h");
      const crosshairV = t.querySelector(".crosshair-v");
      const pointerImages = t.querySelectorAll(".pointer-image");
      const featureWrappers = t.querySelectorAll(".feature-image-wrapper");
      const textSmalls = t.querySelectorAll(".text-small");

      gsap.set(
        [navbar, headings, crosshairH, crosshairV, pointerImages[0], featureWrappers[0], textSmalls],
        { opacity: 0 }
      );

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
        [navbar, crosshairH, crosshairV, pointerImages[0], featureWrappers[0], textSmalls],
        {
          opacity: 1,
          duration: 0.6,
          delay: 1,
          ease: "power2.out",
        }
      );

      const heroContent = t.querySelector(".hero-content");
      if (heroContent) {
        const workSection = document.querySelector(".work-scroll-section");
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1025px)", () => {
          gsap.to(heroContent, {
            y: -400,
            ease: "none",
            scrollTrigger: {
              trigger: workSection,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
        mm.add("(max-width: 1024px)", () => {
          gsap.to(heroContent, {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: workSection,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      }
    },
    { scope: sectionRef, dependencies: [isTouch] }
  );

  return (
    <section
      ref={sectionRef}
      className={`home-hero-section ${isTouch ? "is-touch-device" : "is-mouse-device"}`}
    >
      <div ref={crosshairVRef} className="crosshair-v" />
      <div ref={crosshairHRef} className="crosshair-h">
        <span className="crosshair-text text-small">
          {BRAND_IDENTITY.crosshairText}
        </span>
      </div>

      {HERO_FEATURES.map((feature, i) => (
        <div
          key={feature.title + i}
          ref={(el) => {
            pointerImagesRef.current[i] = el;
          }}
          className="pointer-image"
        >
          <Image
            src={feature.image}
            alt={`Pointer Image ${i + 1}`}
            fill
            sizes="200px"
            priority
          />
          <div className="pointer-text text-small">
            [ {feature.title} ]
          </div>
        </div>
      ))}

      <div className="hero-content container">
        <div />

        <div className="hero-features-mobile">
          <div className="feature-image-wrapper">
            <Image
              src={HERO_FEATURES[featureIndex].image}
              alt={HERO_FEATURES[featureIndex].title}
              fill
              sizes="(max-width: 1024px) 100vw, 1px"
              priority
              key={HERO_FEATURES[featureIndex].image}
            />
          </div>
          <span className="text-small">
            [ {HERO_FEATURES[featureIndex].title} ]
          </span>
        </div>

        <div className="hero-big-heading">
          <div className="upper-heading-desktop">
            <h1 className="hero-heading">{BRAND_IDENTITY.headlineDesktop}</h1>
          </div>
          <div className="upper-heading-mobile">
            <h1 className="hero-heading">{BRAND_IDENTITY.headlineMobileTop}</h1>
            <h1 className="hero-heading">{BRAND_IDENTITY.headlineMobileBottom}</h1>
          </div>

          <div className="bottom-row">
            <div className="left">
              <span className="text-small">{BRAND_IDENTITY.name}</span>
              <span className="text-small">
                Current time: <CurrentTime /> WIB
              </span>
            </div>
            <h1 className="right hero-heading">
              {BRAND_IDENTITY.headlineRight}
            </h1>
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
