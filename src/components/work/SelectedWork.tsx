"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SELECTED_WORKS } from "@/lib/projects";
import { scrollToTarget } from "@/hooks/useLenis";
import { navigateTo } from "@/lib/navigation";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWork = SELECTED_WORKS[activeIndex] ?? SELECTED_WORKS[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady) return;

      const mediaTrack = section.querySelector<HTMLElement>(
        "[data-work-media-track]"
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-work-card]",
        section
      );
      const revealImages = gsap.utils.toArray<HTMLElement>(
        "[data-image-reveal]",
        section
      );
      const markers = gsap.utils.toArray<HTMLElement>(
        "[data-work-marker]",
        section
      );
      const markerTrack = section.querySelector<HTMLElement>(
        ".reference-work-markers"
      );
      if (
        !mediaTrack ||
        !cards.length ||
        !markers.length ||
        !markerTrack
      ) {
        return;
      }

      if (prefersReducedMotion()) return;

      revealImages.forEach((image, index) => {
        gsap.fromTo(
          image,
          { height: "0%" },
          {
            height: "100%",
            duration: 0.7,
            delay: 0.15 * index,
            ease: "power1.out",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
            },
          }
        );
      });

      const mediaQuery = gsap.matchMedia();
      mediaQuery.add("(min-width: 1200px)", () => {
            let lastIndex = -1;
           const getDistance = () => {
             const cardHeight = cards[0]?.getBoundingClientRect().height ?? 0;
             const gap = Number.parseFloat(getComputedStyle(mediaTrack).gap) || 0;
             return cardHeight + gap;
           };
           const setActive = (index: number) => {
             if (index === lastIndex) return;
             lastIndex = index;
             setActiveIndex(index);
             gsap.to(mediaTrack, {
               y: () => -getDistance() * index,
               duration: 0.7,
               ease: "power3.out",
               overwrite: true,
             });
           };

           gsap.set(mediaTrack, { y: 0 });
           lastIndex = 0;

           const triggers = markers.map((marker, index) =>
            ScrollTrigger.create({
              trigger: marker,
              start: "top 52%",
              end: "bottom 52%",
              onEnter: () => setActive(index),
               onEnterBack: () => setActive(index),
             })
           );

           return () => {
             triggers.forEach((trigger) => trigger.kill());
             gsap.killTweensOf(mediaTrack);
           };
        });

      return () => mediaQuery.revert();
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  const jumpToWork = (id: string) => {
    if (typeof window === "undefined") return;
    const index = SELECTED_WORKS.findIndex((work) => work.id === id);
    if (index >= 0) setActiveIndex(index);
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const target = isMobile ? `#work-card-${id}` : `#work-marker-${id}`;
    scrollToTarget(
      target,
      isMobile ? -window.innerHeight * 0.1 : -window.innerHeight * 0.48
    );
  };

  const handleProjectClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <>
      <section ref={sectionRef} id="work-section" className="reference-work-section">
        <div className="reference-work-sticky">
          <div className="reference-work-panel">
            <div className="reference-work-index">
              <div className="reference-work-heading">
                <h2>Selected work</h2>
              </div>

              <div className="reference-work-names">
                <div className="reference-work-current-stack" aria-live="polite">
                  {SELECTED_WORKS.map((work, index) => (
                    <button
                      key={work.id}
                      type="button"
                      className={`reference-work-current-layer ${
                        activeIndex === index ? "active" : ""
                      }`}
                      aria-hidden={activeIndex !== index}
                      tabIndex={activeIndex === index ? 0 : -1}
                      aria-label={`Jump to ${work.title}`}
                      onClick={() => jumpToWork(work.id)}
                    >
                      <span className="reference-work-badge">Selected Work</span>
                      <strong>{work.title}</strong>
                    </button>
                  ))}
                </div>

                <div className="reference-work-mobile-names">
                  {SELECTED_WORKS.map((work, index) => (
                    <button
                      key={work.id}
                      type="button"
                      className={`reference-work-name ${
                        activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => jumpToWork(work.id)}
                    >
                      <span className="reference-work-name-meta">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{work.tags}</span>
                      </span>
                      <strong>{work.title}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div className="reference-work-details">
                <p>{activeWork.description}</p>
              </div>
            </div>

            <div className="reference-work-media">
              <div className="reference-work-viewport">
                <div className="reference-work-media-track" data-work-media-track>
                  {SELECTED_WORKS.map((work) => (
                    <Link
                      key={work.id}
                      id={`work-card-${work.id}`}
                      href={work.href}
                      className="reference-work-card"
                      data-work-card
                      aria-label={`Open ${work.title} case study`}
                      onClick={(event) => handleProjectClick(event, work.href)}
                    >
                      <Image
                        src={work.image[0]}
                        alt={`${work.title} project preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 56vw"
                        className="image-reveal"
                        data-image-reveal
                      />
                      <span className="reference-work-card-shade" />
                      <span className="reference-work-card-caption">
                        <span className="reference-work-card-action">
                          {work.tags}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reference-work-markers" aria-hidden="true">
          {SELECTED_WORKS.map((work) => (
            <div
              key={work.id}
              id={`work-marker-${work.id}`}
              className={`reference-work-marker ${
                work.id === SELECTED_WORKS[0]?.id
                  ? "reference-work-marker-first"
                  : ""
              }`}
              data-work-marker
            />
          ))}
        </div>
      </section>

    </>
  );
}
