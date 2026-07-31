"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { CurrentTime } from "./CurrentTime";
import { CursorCrosshair } from "./CursorCrosshair";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const bottomInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Function to run character reveal timeline
    const runHeroIntro = () => {
      if (!line1Ref.current || !line2Ref.current) return;

      const splitLine1 = new SplitType(line1Ref.current, {
        types: "words,chars",
      });
      const splitLine2 = new SplitType(line2Ref.current, {
        types: "words,chars",
      });

      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const headerEl = document.querySelector("header");

      // 0.0s: Navbar slides down & fades in
      if (headerEl) {
        introTl.fromTo(
          headerEl,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0
        );
      }

      // 0.15s: Small label slides up 20px
      if (labelRef.current) {
        introTl.fromTo(
          labelRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.15
        );
      }

      // 0.3s: First headline line characters slide up from 110%
      if (splitLine1.chars && splitLine1.chars.length > 0) {
        introTl.fromTo(
          splitLine1.chars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            stagger: 0.025,
            ease: "power4.out",
          },
          0.3
        );
      }

      // 0.5s: Second headline line characters slide up from 110%
      if (splitLine2.chars && splitLine2.chars.length > 0) {
        introTl.fromTo(
          splitLine2.chars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            stagger: 0.025,
            ease: "power4.out",
          },
          0.5
        );
      }

      // 0.8s: Bottom information slides up
      if (bottomInfoRef.current) {
        introTl.fromTo(
          bottomInfoRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.8
        );
      }
    };

    // 2. Preloader Counter Timeline (Direct DOM Manipulation, 0 -> 100%)
    const counterObj = { val: 0 };
    const loaderTl = gsap.timeline();

    loaderTl.to(counterObj, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = String(
            Math.floor(counterObj.val)
          ).padStart(2, "0");
        }
      },
      onComplete: () => {
        // Slide up preloader curtain smoothly
        if (curtainRef.current) {
          gsap.to(curtainRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "cubic-bezier(0.76, 0, 0.24, 1)",
            onComplete: () => {
              if (curtainRef.current) {
                curtainRef.current.style.display = "none";
              }
            },
          });
        }
        // Immediately start hero intro sequence
        runHeroIntro();
      },
    });

    return () => {
      loaderTl.kill();
    };
  }, []);

  return (
    <>
      {/* Preloader Curtain (Direct DOM updated 0-100% counter) */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-50 bg-[#f2f2f2] flex items-center justify-center font-mono select-none pointer-events-none"
      >
        <div className="flex items-baseline gap-1 text-6xl sm:text-8xl font-light tracking-tighter text-black">
          <span ref={numberRef}>00</span>
          <span className="text-xl sm:text-2xl text-neutral-400 font-normal">
            %
          </span>
        </div>
      </div>

      {/* Main Hero Section */}
      <section
        ref={containerRef}
        className="h-screen w-full flex flex-col justify-between px-6 sm:px-10 md:px-14 pt-24 pb-8 md:pb-12 bg-[#f2f2f2] text-black relative select-none overflow-hidden"
      >
        {/* Interactive Mouse Crosshair Lines & Floating Preview Card */}
        <CursorCrosshair />

        {/* Top spacer pushing header/heading to bottom */}
        <div className="flex-1" />

        {/* Hero Typography & Metadata Container */}
        <div className="w-full flex flex-col">
          {/* Small label above headline */}
          <div
            ref={labelRef}
            className="mb-2 sm:mb-3 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-600"
          >
            [ SOFTWARE ENGINEER ]
          </div>

          {/* Line 1: BUILDING MODERN */}
          <h1
            ref={line1Ref}
            className="split-line text-[7.6vw] leading-[0.85] font-light tracking-[-0.04em] uppercase text-black w-full whitespace-nowrap"
          >
            BUILDING MODERN
          </h1>

          {/* Line 2: Metadata (RIFQI MAULANA, CURRENT TIME) + SOFTWARE */}
          <div className="w-full flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 lg:gap-8 mt-1 lg:mt-0">
            {/* Metadata items (Bottom left / middle) */}
            <div
              ref={bottomInfoRef}
              className="flex items-center gap-12 sm:gap-16 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-black shrink-0 pb-1 lg:pb-3"
            >
              <span className="font-medium">RIFQI MAULANA</span>
              <CurrentTime />
            </div>

            {/* Title line 2: SOFTWARE */}
            <h1
              ref={line2Ref}
              className="split-line text-[7.6vw] leading-[0.85] font-light tracking-[-0.04em] uppercase text-black lg:text-right whitespace-nowrap"
            >
              SOFTWARE
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
