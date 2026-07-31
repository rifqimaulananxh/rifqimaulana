"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SELECTED_WORKS } from "@/lib/projects";
import { WorkItem } from "./WorkItem";
import { WorkModal } from "./WorkModal";

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const length = SELECTED_WORKS.length;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      const setup = (
        startH: number,
        endH: number,
        startW: number,
        endW: number,
        animateWidth: boolean,
        extra = 0
      ) => {
        gsap.set(section, { height: `${length * (endH + extra)}svh` });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        const items: {
          hStart: number;
          hEnd: number;
          infoFadeStart: number;
          wGrowEnd: number;
          wShrinkStart: number;
          wShrinkEnd: number;
        }[] = [];

        // Compute per-item start/end scroll progress via binary search
        for (let idx = 0; idx < length; idx++) {
          // height of item `i` at progress `t`
          const itemHeight = (i: number, t: number) => {
            const d = items[i];
            if (t <= d.hStart) return startH + extra;
            if (t >= d.hEnd) return endH + extra;
            return (
              startH +
              extra +
              ((endH - startH) * (t - d.hStart)) / (d.hEnd - d.hStart)
            );
          };

          // cumulative height of first `idx` items at progress `t`
          const cumulative = (t: number) => {
            let total = 0;
            for (let i = 0; i < idx; i++) total += itemHeight(i, t);
            return 100 - t + total;
          };

          // binary search: find t where fn(t) === target
          const binarySearch = (fn: (t: number) => number, target: number) => {
            let lo = 0;
            let hi = 3000;
            for (let i = 0; i < 50; i++) {
              const mid = (lo + hi) / 2;
              if (fn(mid) > target) lo = mid;
              else hi = mid;
            }
            return (lo + hi) / 2;
          };

          const hStart = binarySearch(cumulative, 100);
          const hEnd = binarySearch(cumulative, 10);
          const infoFadeStart = binarySearch(cumulative, 70);

          items.push({
            hStart,
            hEnd,
            infoFadeStart,
            wGrowEnd: 0,
            wShrinkStart: 0,
            wShrinkEnd: 0,
          });

          if (animateWidth) {
            // center of item `idx`
            const centerFn = (t: number) => cumulative(t) + itemHeight(idx, t) / 2;
            const wGrowEnd = binarySearch(centerFn, 55);
            const wShrinkStart = binarySearch(centerFn, 45);
            const wShrinkEnd = binarySearch(
              (t: number) => cumulative(t) + itemHeight(idx, t),
              0
            );
            items[idx] = {
              ...items[idx],
              wGrowEnd,
              wShrinkStart,
              wShrinkEnd,
            };
          }
        }

        const imgWrappers = gsap.utils.toArray<HTMLElement>(
          ".work-img-wrapper",
          section
        );
        const infoWrappers = gsap.utils.toArray<HTMLElement>(
          ".work-info-wrapper",
          section
        );

        imgWrappers.forEach((el, idx) => {
          if (!el) return;
          const d = items[idx];
          const infoEl = infoWrappers[idx];

          tl.fromTo(
            el,
            { height: `${startH}svh` },
            {
              height: `${endH}svh`,
              ease: "none",
              duration: d.hEnd - d.hStart,
            },
            d.hStart
          );

          if (infoEl) {
            tl.fromTo(
              infoEl,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "none",
                duration: 20,
              },
              d.infoFadeStart
            );
          }

          if (animateWidth) {
            tl.fromTo(
              el,
              { width: `${startW}vw` },
              {
                width: `${endW}vw`,
                ease: "none",
                duration: d.wGrowEnd - d.hStart,
              },
              d.hStart
            );
            tl.fromTo(
              el,
              { width: `${endW}vw` },
              {
                width: `${startW}vw`,
                ease: "none",
                duration: d.wShrinkEnd - d.wShrinkStart,
                immediateRender: false,
              },
              d.wShrinkStart
            );
          } else {
            gsap.set(el, { width: `${startW}vw` });
          }
        });

        tl.to({}, { duration: 0.01 }, length * (endH + extra) + 100);

        return tl;
      };

      mm.add("(min-width: 1025px)", () => {
        setup(28, 72, 48, 60, true, 0);
      });
      mm.add("(max-width: 1024px)", () => {
        setup(25, 50, 100, 100, false, 20);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="selected-work">
      {SELECTED_WORKS.map((work, i) => (
        <WorkItem
          key={work.id || i}
          item={work}
          index={i}
          onClick={() => setSelectedIndex(i)}
        />
      ))}
      {selectedIndex !== null && (
        <WorkModal
          selectedWorkIndex={selectedIndex}
          workList={SELECTED_WORKS}
          onClose={() => setSelectedIndex(null)}
          onIndexChange={setSelectedIndex}
        />
      )}
    </section>
  );
}
