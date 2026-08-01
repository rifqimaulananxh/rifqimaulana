"use client";

import { memo } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface WorkCardProps {
  item: Project;
  onClick: () => void;
}

export const WorkCard = memo(function WorkCard({
  item,
  onClick,
}: WorkCardProps) {
  return (
    <div className="work-card-item" style={{ flexShrink: 0 }}>
      <div className="work-card">
        <div
          className="work-card-image-wrapper"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={item.image[0]}
            alt="work image"
            fill
            sizes="(max-width: 1024px) 80vw, 780px"
            className={item.type === "Playground" ? "thumbnail" : "work-image"}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="work-card-content">
          <div
            className="work-card-title"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          >
            <span className="title">{item.title}</span>
            <span className="bracket-button">[Open]</span>
          </div>
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
