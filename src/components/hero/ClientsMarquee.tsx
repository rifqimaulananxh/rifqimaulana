"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

const CLIENT_NAMES = [
  "Architecture Bureau",
  "Frame Estate",
  "Harmony Sound",
  "Ockham",
  "Open Trip",
  "Parana",
  "The Ordinary",
  "Luvbag",
];

export function ClientsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const introReady = useIntroReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const group = groupRef.current;
      if (!section || !track || !group || !introReady) return;
      if (prefersReducedMotion()) return;

      const tween = gsap.to(track, {
        x: () => -group.offsetWidth,
        duration: () => group.offsetWidth / 60,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tween.play(),
        onEnterBack: () => tween.play(),
        onLeave: () => tween.pause(),
        onLeaveBack: () => tween.pause(),
      });

      return () => {
        sectionTrigger.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className="clients-marquee-section"
      aria-label="Clients and collaborations"
    >
      <div className="container">
        <p className="clients-marquee-label text-small">
          Clients and collaborations
        </p>
      </div>
      <div className="clients-marquee-viewport" aria-hidden="true">
        <div ref={trackRef} className="clients-marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? groupRef : undefined}
              className="clients-marquee-group"
            >
              {CLIENT_NAMES.map((name) => (
                <span key={`${copy}-${name}`} className="clients-marquee-item">
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
