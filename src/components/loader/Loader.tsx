"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useHomeContext } from "@/context/HomeContext";
import { getLenis } from "@/hooks/useLenis";
import { HERO_IMAGES_TO_PRELOAD } from "@/lib/site";

let hasLoadedOnce = false;

function RotatingDigit({ digit }: { digit: string }) {
  const columnRef = useRef<HTMLDivElement>(null);
  const [digits, setDigits] = useState<string[]>([digit]);
  const [prevDigit, setPrevDigit] = useState(digit);

  if (prevDigit !== digit) {
    setPrevDigit(digit);
    setDigits((prev) => [...prev, digit]);
  }

  useGSAP(
    () => {
      if (digits.length > 1 && columnRef.current) {
        const offset = -(2 * (digits.length - 1));
        gsap.to(columnRef.current, {
          y: `${offset}rem`,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    [digits.length]
  );

  return (
    <div className="rotating-digit-container">
      <div ref={columnRef} className="rotating-digit-column">
        {digits.map((d, i) => (
          <div key={i} className="rotating-digit">
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const str = value.toString();
  return (
    <div className="animated-number">
      {str.split("").map((d, i) => (
        <RotatingDigit key={`${str.length}-${i}`} digit={d} />
      ))}
    </div>
  );
}

export function Loader() {
  const { setIsHomePageLoading } = useHomeContext();
  const [isLoading, setIsLoading] = useState(!hasLoadedOnce);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasLoadedOnce) {
      setIsHomePageLoading(false);
    }
  }, [setIsHomePageLoading]);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis || window.innerWidth < 1025) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    if (isLoading) lenis.stop();
    else lenis.start();
  }, [isLoading]);

  useGSAP(
    () => {
      if (hasLoadedOnce || !containerRef.current) return;
      document.body.style.overflow = "hidden";

      const counter = { value: 0 };
      let loaded = 0;

      const updateCounter = () => {
        setCount(Math.round(counter.value));
      };

      const finishLoader = () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setIsLoading(false);
            setIsHomePageLoading(false);
            hasLoadedOnce = true;
          },
        });
      };

      gsap.to(counter, {
        value: 80,
        duration: 1.5,
        ease: "power1.out",
        onUpdate: updateCounter,
      });

      const imageDone = () => {
        loaded++;
        if (loaded === HERO_IMAGES_TO_PRELOAD.length) {
          gsap.killTweensOf(counter);
          gsap.to(counter, {
            value: 100,
            duration: Math.max(0.5, 2 - counter.value / 50),
            ease: "power2.inOut",
            onUpdate: updateCounter,
            onComplete: finishLoader,
          });
        }
      };

      HERO_IMAGES_TO_PRELOAD.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = imageDone;
        img.onerror = imageDone;
      });

      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: containerRef }
  );

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="loader-container">
      <AnimatedNumber value={count} />
    </div>
  );
}
