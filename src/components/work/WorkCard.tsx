"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface WorkCardProps {
  item: Project;
  onClick: () => void;
}

export const WorkCard = memo(function WorkCard({
  item,
  onClick,
}: WorkCardProps) {
  const caseStudyHref = item.href.startsWith("/work/") ? item.href : null;
  const image = (
    <Image
      src={item.image[0]}
      alt={`${item.title} project preview`}
      fill
      sizes="(max-width: 1024px) 80vw, 780px"
      className={item.type === "Playground" ? "thumbnail" : "work-image"}
      style={{ objectFit: "cover" }}
    />
  );

  return (
    <div className="work-card-item" style={{ flexShrink: 0 }}>
      <div className="work-card">
        {caseStudyHref ? (
          <Link
            href={caseStudyHref}
            className="work-card-image-wrapper"
            aria-label={`Open ${item.title} case study`}
          >
            {image}
          </Link>
        ) : (
          <button
            type="button"
            className="work-card-image-wrapper"
            aria-label={`Open ${item.title} details`}
            onClick={onClick}
          >
            {image}
          </button>
        )}

        <div className="work-card-content">
          {caseStudyHref ? (
            <Link href={caseStudyHref} className="work-card-title">
              <span className="title">{item.title}</span>
              <span className="bracket-button">[Open]</span>
            </Link>
          ) : (
            <button
              type="button"
              className="work-card-title"
              onClick={onClick}
            >
              <span className="title">{item.title}</span>
              <span className="bracket-button">[Open]</span>
            </button>
          )}
          <div className="work-card-details">
            {item.type === "Playground" ? (
              <>
                <div className="role text-small">
                  <span>Demo work</span>
                </div>
                <div className="role text-small">
                  <span>{item.role}</span>
                </div>
              </>
            ) : (
              <>
                <div className="tag-wrapper">
                  <span className="tag text-small">{item.tags}</span>
                </div>
                <div className="role text-small">
                  <span>Role: {item.role}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
