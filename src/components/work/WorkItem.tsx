"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { ImageGallery } from "./ImageGallery";
import type { Project } from "@/lib/projects";

interface WorkItemProps {
  item: Project;
  index: number;
  onClick: () => void;
}

export const WorkItem = memo(function WorkItem({
  item,
  index,
  onClick,
}: WorkItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="work-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="work-img-wrapper"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="work-img-wrapper-2">
          <ImageGallery images={item.image} isHovered={isHovered} index={index} />
        </div>
        <div className="bg-img-overlay" />
        <Image
          className="bg-image"
          src={item.bgMediaUrl}
          alt="work image"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>

      <div className="work-info-wrapper">
        <div
          className="work-title"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          <h2 className="title">{item.title}</h2>
           <span className="bracket-button">[View details]</span>
        </div>
        <div className="work-detail">
          <label className="tag text-small">{item.tags}</label>
          <label className="role text-small">Role: {item.role}</label>
        </div>
      </div>
    </div>
  );
});
