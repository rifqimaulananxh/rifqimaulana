"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

interface StackItem {
  name: string;
  logo: string;
}

const STACK_ITEMS: StackItem[] = [
  { name: "Next.js", logo: "/icons/stack/nextdotjs.svg" },
  { name: "React", logo: "/icons/stack/react.svg" },
  { name: "TypeScript", logo: "/icons/stack/typescript.svg" },
  { name: "Tailwind CSS", logo: "/icons/stack/tailwindcss.svg" },
  { name: "TanStack Query", logo: "/icons/stack/tanstack.svg" },
  { name: "NestJS", logo: "/icons/stack/nestjs.svg" },
  { name: "Prisma ORM", logo: "/icons/stack/prisma.svg" },
  { name: "Swagger", logo: "/icons/stack/swagger.svg" },
  { name: "PostgreSQL", logo: "/icons/stack/postgresql.svg" },
  { name: "Redis", logo: "/icons/stack/redis.svg" },
  { name: "JWT", logo: "/icons/stack/jsonwebtokens.svg" },
  { name: "Docker", logo: "/icons/stack/docker.svg" },
];

export function StackSection() {
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
        duration: () => group.offsetWidth / 50,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      let isInView = false;
      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          isInView = true;
          tween.play();
        },
        onEnterBack: () => {
          isInView = true;
          tween.play();
        },
        onLeave: () => {
          isInView = false;
          tween.pause();
        },
        onLeaveBack: () => {
          isInView = false;
          tween.pause();
        },
      });
      const viewport = section.querySelector(".stack-marquee-viewport");
      const pause = () => tween.pause();
      const resume = () => {
        if (isInView) tween.resume();
      };
      viewport?.addEventListener("mouseenter", pause);
      viewport?.addEventListener("mouseleave", resume);

      return () => {
        viewport?.removeEventListener("mouseenter", pause);
        viewport?.removeEventListener("mouseleave", resume);
        sectionTrigger.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className="stack-section"
      aria-labelledby="stack-heading"
    >
      <div className="container stack-intro">
        <h2 id="stack-heading">Stack</h2>
        <p>
          A practical stack for shaping interfaces, building dependable systems,
          and shipping with confidence.
        </p>
      </div>
      <div className="stack-marquee-viewport" aria-label="Technology stack">
        <div ref={trackRef} className="stack-marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? groupRef : undefined}
              className="stack-marquee-group"
              aria-hidden={copy === 1}
            >
              {STACK_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item.name}`}
                  className="stack-marquee-item"
                >
                  <Image
                    src={item.logo}
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
                    sizes="(max-width: 1024px) 36px, 48px"
                    className="stack-logo"
                  />
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
