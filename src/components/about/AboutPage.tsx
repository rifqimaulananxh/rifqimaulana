"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { ABOUT_PAGE } from "@/lib/pages";
import { prefersReducedMotion } from "@/lib/motion";

function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      const heading = section.querySelector(".heading");
      const description = section.querySelector(".description");
      const img = section.querySelector(".hero-img");
      const scrollText = section.querySelector(".scroll-text");

      const words = SplitText.create([heading, description], {
        type: "words",
      }).words;
      gsap.set(words, { y: "110%" });
      gsap.to(words, {
        y: "0%",
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
        delay: 0.2,
      });

      if (img) {
        gsap.fromTo(
          img,
          { height: "0%" },
          {
            height: "100%",
            duration: 0.7,
            delay: 0.15,
            ease: "power1.out",
          }
        );
      }
      if (scrollText) {
        gsap.fromTo(
          scrollText,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 1.1 }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="about-hero-section">
      <div className="container">
        <div className="content-wrapper">
          <h1 className="heading split-n-wrap">{ABOUT_PAGE.heading}</h1>
          <div className="image-wrapper">
            <Image
              className="hero-img image-reveal"
              src="/images/portofolio/rifqi.webp"
              alt={`Image of ${ABOUT_PAGE.heading}`}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              style={{ objectFit: "cover" }}
              data-image-reveal
            />
          </div>
          <p className="description text-medium split-n-wrap">
            {ABOUT_PAGE.description}{" "}
            <Link href="/contact" className="let-s-collaborate">
              Tell me what you&apos;re building.
            </Link>
          </p>
          <span className="scroll-text bracket-button">[Scroll]</span>
        </div>
      </div>
    </section>
  );
}

function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const currentRef = useRef(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const points = section.querySelectorAll(".point-mask");
      const paras = section.querySelectorAll(".para");
      const images = section.querySelectorAll(".image-container .image-wrapper");

      if (prefersReducedMotion()) {
        [points, paras, images].forEach((group) =>
          group.forEach((element) => element.classList.add("active"))
        );
        return;
      }

      const setActive = (idx: number) => {
        points.forEach((el, i) => el.classList.toggle("active", i === idx));
        paras.forEach((el, i) => el.classList.toggle("active", i === idx));
        images.forEach((el, i) => el.classList.toggle("active", i === idx));
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.min(
              ABOUT_PAGE.paragraphs.length - 1,
              Math.floor(self.progress * ABOUT_PAGE.paragraphs.length)
            );
            if (idx !== currentRef.current) {
              currentRef.current = idx;
              setActive(idx);
            }
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="history-section"
      aria-labelledby="history-heading"
    >
      <div className="container">
        <h2 id="history-heading" className="sr-only">
          Journey, background, and how I work
        </h2>
        <div className="history-wrapper">
          <div className="point-wrapper">
            {ABOUT_PAGE.points.map((point, i) => (
              <div
                key={point}
                className={`point-mask ${i === 0 ? "active" : ""}`}
              >
                <span className="point text-small-1">{point}</span>
              </div>
            ))}
          </div>
          <div className="image-container">
            {ABOUT_PAGE.points.map((_, i) => (
              <div
                key={i}
                className={`image-wrapper ${i === 0 ? "active" : ""}`}
              >
                  <Image
                    src="/images/portofolio/rifqi.webp"
                    alt=""
                    aria-hidden="true"
                  fill
                  sizes="(max-width: 1024px) 70vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <div className="para-wrapper">
            {ABOUT_PAGE.paragraphs.map((para, i) => (
              <p
                key={i}
                className={`para split-n-wrap ${i === 0 ? "active" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeyondWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

       if (prefersReducedMotion()) {
        return;
      }

      const firstItem = track.children[0] as HTMLElement | undefined;
      const duplicateStart = track.children[ABOUT_PAGE.hobbies.length] as
        | HTMLElement
        | undefined;
      const distance = () =>
        firstItem && duplicateStart
          ? duplicateStart.offsetLeft - firstItem.offsetLeft
          : track.scrollWidth / 2;

      const tween = gsap.to(track, {
        x: () => -distance(),
        duration: 30,
        ease: "none",
        repeat: -1,
      });
      const viewport = sectionRef.current?.querySelector(".marquee-viewport");
      const pause = () => tween.pause();
      const resume = () => tween.resume();
      viewport?.addEventListener("mouseenter", pause);
      viewport?.addEventListener("mouseleave", resume);

      return () => {
        viewport?.removeEventListener("mouseenter", pause);
        viewport?.removeEventListener("mouseleave", resume);
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="beyond-work-section">
      <div className="container">
        <div className="heading">
           <h2 className="text-small-1">Beyond work</h2>
        </div>
        <div className="marquee-viewport">
          <div ref={trackRef} className="hobby-list-wrapper">
            {[0, 1].map((dup) =>
              ABOUT_PAGE.hobbies.map((hobby, i) => (
                <div
                  key={`${dup}-${i}`}
                  className="hobby-item"
                  aria-hidden={dup === 1}
                >
                  <div className="img-wrapper">
                    <Image
                      src={hobby.image}
                      alt={hobby.title}
                      fill
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="content-wrapper">
                    <span className="title text-medium">{hobby.title}</span>
                    <p className="para text-small">{hobby.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <HistorySection />
      <BeyondWorkSection />
    </main>
  );
}
