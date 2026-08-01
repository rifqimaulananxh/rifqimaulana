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

const ALL_WORKS: Project[] = [...SELECTED_WORKS, ...PLAYGROUND_ITEMS];

export function WorkListSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

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
    list.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const selectCategory = (key: string) => {
    setActiveCategory(key);
    const list = listRef.current;
    if (list) list.scrollTo({ left: 0 });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

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
      if (!section) return;

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
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  return (
    <section ref={sectionRef} className="work-list-section">
      <h1 className="sr-only">Work</h1>
      <div className="container">
        <div className="menu-wrapper">
          <div className="work-categories">
            {WORK_CATEGORIES.map((cat) => (
              <span
                key={cat.key}
                className={`work-category-item ${
                  activeCategory === cat.key ? "active" : ""
                }`}
                onClick={() => selectCategory(cat.key)}
              >
                {cat.label}
              </span>
            ))}
          </div>
          <div className="move-work-item-wrapper">
            <div className="left" onClick={() => scrollByCard(-1)}>
              <Image
                alt="left"
                src="/icons/arrow.svg"
                fill
                sizes="42px"
              />
            </div>
            <div className="right" onClick={() => scrollByCard(1)}>
              <Image
                alt="right"
                src="/icons/arrow.svg"
                fill
                sizes="42px"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={listRef}
        className="work-list-wrapper"
        onScroll={updateThumb}
      >
        {filteredWorks.map((work, i) => (
          <WorkCard
            key={work.id}
            item={work}
            onClick={() => setSelectedModalIndex(i)}
          />
        ))}
      </div>

      <div className="container">
        <div className="scroll-wrapper">
          <div ref={thumbRef} className="scroll-thumb" />
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
