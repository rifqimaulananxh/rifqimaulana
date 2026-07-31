"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const FLOATING_TAGS = [
  {
    image: "/images/menu/rose.png",
    tag: "[ Pixel perfect execution ]",
  },
  {
    image: "/images/menu/work.png",
    tag: "[ High performance ]",
  },
  {
    image: "/images/menu/home.png",
    tag: "[ Clean architecture ]",
  },
  {
    image: "/images/menu/about.png",
    tag: "[ Scalable systems ]",
  },
];

export function CursorCrosshair() {
  const lineVRef = useRef<HTMLDivElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!lineVRef.current || !lineHRef.current || !cardRef.current) return;

    // 60fps Lerp Mouse Tracking via GSAP quickTo
    const xToV = gsap.quickTo(lineVRef.current, "x", {
      duration: 0.08,
      ease: "power2.out",
    });
    const yToH = gsap.quickTo(lineHRef.current, "y", {
      duration: 0.08,
      ease: "power2.out",
    });

    // Center card smoothly right at mouse crosshair intersection
    const cardX = gsap.quickTo(cardRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const cardY = gsap.quickTo(cardRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    let lastX = 0;
    let lastY = 0;
    let distanceTraveled = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Threshold detection: if cursor touches or exits top (address bar), bottom, left or right edge
      const threshold = 15;
      if (
        e.clientY <= threshold ||
        e.clientX <= threshold ||
        e.clientX >= window.innerWidth - threshold ||
        e.clientY >= window.innerHeight - threshold
      ) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
      xToV(e.clientX);
      yToH(e.clientY);

      // Position center of card exactly at mouse crosshairs (clientX, clientY)
      cardX(e.clientX);
      cardY(e.clientY);

      // Dynamic image swapping on mouse movement distance (Roshan Sahu signature pointer effect)
      if (lastX !== 0 && lastY !== 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dist = Math.hypot(dx, dy);
        distanceTraveled += dist;

        // Automatically cycle image every 130px of mouse distance moved
        if (distanceTraveled > 130) {
          distanceTraveled = 0;
          setActiveTagIndex((prev) => (prev + 1) % FLOATING_TAGS.length);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e as any).toElement === null) {
        setIsVisible(false);
      }
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    const handleClick = () => {
      setActiveTagIndex((prev) => (prev + 1) % FLOATING_TAGS.length);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mouseleave", handleMouseOut, { passive: true });
    window.addEventListener("blur", handleWindowBlur, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseOut);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none",
        transition: "opacity 0.2s ease-out",
      }}
    >
      {/* Vertical Crosshair Line */}
      <div
        ref={lineVRef}
        className="fixed top-0 bottom-0 w-[1px] bg-black/10 pointer-events-none z-20 will-change-transform"
        style={{ left: 0 }}
      />

      {/* Horizontal Crosshair Line with Dynamic Tag */}
      <div
        ref={lineHRef}
        className="fixed left-0 right-0 h-[1px] bg-black/10 pointer-events-none z-20 will-change-transform flex items-center"
        style={{ top: 0 }}
      >
        <span className="ml-8 -mt-6 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-neutral-500 bg-[#f2f2f2]/90 backdrop-blur-xs px-2 py-0.5 rounded border border-black/10 shadow-xs">
          [ SOFTWARE ENGINEER ]
        </span>
      </div>

      {/* Mouse Floating Preview Card - DEAD CENTERED ON CROSSHAIR INTERSECTION */}
      <div
        ref={cardRef}
        className="fixed top-0 left-0 z-30 pointer-events-none hidden md:flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        {/* Pre-decoded GPU image layer stack for zero-lag smooth 60fps swapping */}
        <div className="w-52 sm:w-64 h-32 sm:h-40 rounded-sm overflow-hidden relative shadow-xl border border-black/10 bg-black">
          {FLOATING_TAGS.map((tagItem, i) => (
            <Image
              key={i}
              src={tagItem.image}
              alt="Cursor preview"
              fill
              priority
              className="object-cover transition-opacity duration-300 will-change-transform absolute inset-0"
              style={{ opacity: activeTagIndex === i ? 1 : 0 }}
              sizes="260px"
            />
          ))}
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-neutral-700 bg-[#f2f2f2]/95 px-2 py-0.5 rounded border border-black/10 shadow-xs whitespace-nowrap">
          {FLOATING_TAGS[activeTagIndex].tag}
        </span>
      </div>
    </div>
  );
}
