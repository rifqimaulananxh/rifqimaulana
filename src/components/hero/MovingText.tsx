"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const GRID_COLUMNS = 10;
const CONTENT_COLUMNS = 8;

const ROWS: (string | null)[][] = [
  [null, "Invisible", null, null, null, null, null, null],
  [null, null, "by", null, "design,", null, null, null],
  [null, null, null, "reliable", null, "by", null, null],
  [null, null, null, null, "default", null, null, null],
];

const COL_LABELS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

export function MovingText() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const cols = gsap.utils.toArray("[data-exp-col]", wrap);
      const rows = gsap.utils.toArray("[data-exp-row]", wrap);
      const words = wrap.querySelectorAll(".exp-content__el");

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const isMobile = !!context.conditions?.mobile;
          const colWidth = () => {
            const first = cols[0] as HTMLElement | undefined;
            return first ? first.getBoundingClientRect().width : 0;
          };
          const distance = () => (isMobile ? -6 : -4.75) * colWidth();

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to([...cols, ...rows], {
            x: distance,
            ease: "none",
            duration: 1,
          }).from(
            words,
            {
              x: "0.75em",
              ease: "none",
              stagger: 0.03,
              duration: 0.85,
            },
            "<"
          );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    <section className="moving-text-section">
      <div ref={wrapRef} className="exp-wrap">
        <div className="exp-lines" aria-hidden="true">
          <div className="exp-lines__cover">
            <div className="exp-lines__col-border" />
            {ROWS.map((_, i) => (
              <div key={i} className="exp-bg__row" />
            ))}
          </div>
          {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
            <div key={i} data-exp-col className="exp-lines__col">
              {i > 0 && (
                <span className="exp-lines__col-label">{COL_LABELS[i - 1]}</span>
              )}
              <div className="exp-lines__col-border" />
            </div>
          ))}
        </div>

        <div className="exp-content">
          {ROWS.map((row, r) => (
            <div key={r} data-exp-row className="exp-content__row">
              {Array.from({ length: CONTENT_COLUMNS }).map((_, c) => (
                <div key={c} className="exp-content__col">
                  {row[c] ? (
                    <div className="exp-content__el">
                      <div className="exp-content__dot" />
                      <h2 className="exp-content__word">{row[c]}</h2>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
