"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { WORK_CATEGORIES } from "@/lib/constants";
import { SELECTED_WORKS } from "@/lib/projects";
import { PLAYGROUND_ITEMS } from "@/lib/playground";
import { WorkCard } from "./WorkCard";
import { WorkModal } from "./WorkModal";
import type { Project } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/motion";

const ALL_WORKS: Project[] = [...SELECTED_WORKS, ...PLAYGROUND_ITEMS];

export function WorkListSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<{
    startX: number;
    startScrollLeft: number;
    maxThumbTravel: number;
    maxScroll: number;
  } | null>(null);

  const matchesCategory = (work: Project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "playground") return work.type === "Playground";
    return work.category === activeCategory;
  };

  const filteredWorks = ALL_WORKS.filter(matchesCategory);

  const updateThumb = useCallback(() => {
    const list = listRef.current;
    const thumb = thumbRef.current;
    if (!list || !thumb) return;
    const ratio = list.clientWidth / list.scrollWidth;
    const width = Math.max(ratio * 100, 5);
    const scrollable = list.scrollWidth - list.clientWidth;
    const left =
      scrollable <= 0
        ? 0
        : (list.scrollLeft / scrollable) * (100 - width);
    thumb.style.width = `${width}%`;
    thumb.style.left = `${left}%`;
    setScrollProgress(
      scrollable <= 0 ? 0 : Math.round((list.scrollLeft / scrollable) * 100)
    );
  }, []);

  useEffect(() => {
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, [updateThumb, filteredWorks.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector<HTMLElement>(".work-card-item");
    const step = card ? card.offsetWidth + 20 : 700;
    list.scrollBy({
      left: dir * step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const selectCategory = (key: string) => {
    setActiveCategory(key);
    const list = listRef.current;
    if (list) list.scrollTo({ left: 0 });
    window.requestAnimationFrame(updateThumb);
  };

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const list = listRef.current;
    const thumb = thumbRef.current;
    const wrapper = thumb?.parentElement;
    if (!list || !thumb || !wrapper) return;

    const maxThumbTravel = wrapper.clientWidth - thumb.offsetWidth;
    const maxScroll = list.scrollWidth - list.clientWidth;
    if (maxThumbTravel <= 0 || maxScroll <= 0) return;

    dragRef.current = {
      startX: event.clientX,
      startScrollLeft: list.scrollLeft,
      maxThumbTravel,
      maxScroll,
    };
    thumb.setPointerCapture(event.pointerId);
  };

  const handleThumbPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const list = listRef.current;
    const drag = dragRef.current;
    if (!list || !drag) return;

    const delta = event.clientX - drag.startX;
    list.scrollLeft = Math.max(
      0,
      Math.min(
        drag.maxScroll,
        drag.startScrollLeft + (delta / drag.maxThumbTravel) * drag.maxScroll
      )
    );
  };

  const stopThumbDrag = () => {
    dragRef.current = null;
  };

  const handleThumbKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    listRef.current?.scrollBy({
      left: event.key === "ArrowRight" ? 240 : -240,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      gsap.fromTo(
        section.querySelectorAll(".work-category-item"),
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      gsap.fromTo(
        section.querySelectorAll(".work-card-item"),
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.3,
        }
      );
    },
    {
      scope: sectionRef,
      dependencies: [activeCategory],
      revertOnUpdate: true,
    }
  );

  return (
    <section ref={sectionRef} className="work-list-section">
      <div className="container work-page-intro">
        <h1 className="work-page-heading">Selected work</h1>
        <p className="work-page-description">
          Web products, interfaces, and interactive experiments built from brief
          to launch.
        </p>
      </div>
      <div className="container">
        <div className="menu-wrapper">
          <div className="work-categories">
            {WORK_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`work-category-item ${
                  activeCategory === cat.key ? "active" : ""
                }`}
                aria-pressed={activeCategory === cat.key}
                onClick={() => selectCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="move-work-item-wrapper">
            <button
              type="button"
              className="left"
              aria-label="Previous project"
              onClick={() => scrollByCard(-1)}
            >
              <Image
                alt=""
                src="/icons/arrow.svg"
                fill
                sizes="42px"
              />
            </button>
            <button
              type="button"
              className="right"
              aria-label="Next project"
              onClick={() => scrollByCard(1)}
            >
              <Image
                alt=""
                src="/icons/arrow.svg"
                fill
                sizes="42px"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={listRef}
        id="work-project-list"
        className="work-list-wrapper"
        onScroll={updateThumb}
      >
        {filteredWorks.length > 0 ? (
          filteredWorks.map((work, i) => (
            <WorkCard
              key={work.id}
              item={work}
              onClick={() => setSelectedModalIndex(i)}
            />
          ))
        ) : (
          <p className="work-empty-state">
            No projects in this category yet. Check back soon.
          </p>
        )}
      </div>

      <div className="container">
        <div className="scroll-wrapper">
          <button
            ref={thumbRef}
            type="button"
            className="scroll-thumb"
            aria-label="Drag to browse projects"
            role="scrollbar"
            aria-orientation="horizontal"
            aria-controls="work-project-list"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={scrollProgress}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={stopThumbDrag}
            onPointerCancel={stopThumbDrag}
            onKeyDown={handleThumbKeyDown}
          />
        </div>
      </div>

      {selectedModalIndex !== null && (
        <WorkModal
          selectedWorkIndex={selectedModalIndex}
          workList={filteredWorks}
          onClose={() => setSelectedModalIndex(null)}
          onIndexChange={setSelectedModalIndex}
        />
      )}
    </section>
  );
}
