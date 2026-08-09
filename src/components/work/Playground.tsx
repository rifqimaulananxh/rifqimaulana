"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PLAYGROUND_ITEMS } from "@/lib/playground";
import { WorkModal } from "./WorkModal";
import type { Project } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

interface PlaygroundItemProps {
  item: Project;
  index: number;
  setSelectedModalIndex: (index: number) => void;
}

function PlaygroundItem({
  item,
  index,
  setSelectedModalIndex,
}: PlaygroundItemProps) {
  return (
    <div className="playground-grid-item">
      <div className="playground-content">
        <button
          type="button"
          onClick={() => setSelectedModalIndex(index)}
          className="video-wrapper"
          aria-label={`Open ${item.title} experiment details`}
        >
          {item.image[0] && (
            <Image
              src={item.image[0]}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="thumbnail"
            />
          )}
        </button>

        <div className="info-wrapper">
          <div className="title-wrapper">
            <button
              type="button"
              onClick={() => setSelectedModalIndex(index)}
              className="title"
            >
              {item.title}
            </button>
          </div>
          <div className="info">
            <div className="type-wrapper">
              <span className="type text-small">{item.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Playground({ limit }: { limit?: number }) {
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);
  const introReady = useIntroReady();
  const items =
    typeof limit === "number"
      ? PLAYGROUND_ITEMS.slice(0, limit)
      : PLAYGROUND_ITEMS;

  useGSAP(
    () => {
      if (!introReady || prefersReducedMotion()) return;
      gsap
        .utils.toArray<HTMLElement>(".playground-grid-item")
        .forEach((el, i) => {
          const targets = el.querySelectorAll(".thumbnail");
          if (targets.length > 0) {
            gsap.fromTo(
              targets,
              { height: "0%" },
              {
                height: "100%",
                duration: 0.7,
                delay: 0.15 * i,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                },
              }
            );
          }
        });
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className="playground-section"
      aria-labelledby="playground-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 id="playground-heading" className="text-small-1">
            Playground
          </h2>
          <span className="text-small-1">Experiments / Motion / 3D</span>
        </div>
        <div className="playground-content-grid">
          {items.map((item, i) => (
            <PlaygroundItem
              key={item.id ? `${item.id}-${i}` : i}
              item={item}
              index={i}
              setSelectedModalIndex={setSelectedModalIndex}
            />
          ))}
        </div>
      </div>
      {selectedModalIndex !== null && (
        <WorkModal
          selectedWorkIndex={selectedModalIndex}
          workList={items}
          onClose={() => setSelectedModalIndex(null)}
          onIndexChange={setSelectedModalIndex}
        />
      )}
    </section>
  );
}
