"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PLAYGROUND_ITEMS } from "@/lib/playground";
import { WorkModal } from "./WorkModal";
import type { Project } from "@/lib/projects";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => {
      setIsTouch(
        window.matchMedia("(max-width: 1024px)").matches ||
          "ontouchstart" in window ||
          window.matchMedia("(hover: none)").matches
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isTouch || !itemRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0.15 }
    );
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [isTouch]);

  const showVideo = isTouch ? isVisible : isHovered;

  const [prevShowVideo, setPrevShowVideo] = useState(showVideo);
  if (showVideo !== prevShowVideo) {
    setPrevShowVideo(showVideo);
    if (!showVideo) setIsPlaying(false);
  }

  return (
    <div ref={itemRef} className="playground-grid-item">
      <div className="playground-content">
        <div
          onClick={() => setSelectedModalIndex(index)}
          className="video-wrapper"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => !isTouch && setIsHovered(true)}
          onMouseLeave={() => !isTouch && setIsHovered(false)}
        >
          {item.image[0] && (
            <Image
              src={item.image[0]}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="thumbnail"
              style={{
                objectFit: "cover",
                opacity: showVideo && isPlaying ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
          )}
          {showVideo && !isPlaying && (
            <div
              className="video-loading-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <span
                className="text-x-small"
                style={{ color: "var(--primary)" }}
              >
                Loading...
              </span>
            </div>
          )}
          {showVideo && (
            <video
              ref={videoRef}
              className="video"
              src={item.bgMediaUrl}
              loop
              muted
              playsInline
              autoPlay
              onPlaying={() => setIsPlaying(true)}
              style={{
                opacity: isPlaying ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          )}
        </div>

        <div className="info-wrapper">
          <div className="title-wrapper">
            <div
              onClick={() => setSelectedModalIndex(index)}
              className="title"
              style={{ cursor: "pointer" }}
            >
              {item.title}
            </div>
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

export function Playground() {
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".playground-grid-item").forEach((el, i) => {
        const targets = el.querySelectorAll(".video, .thumbnail");
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
      gsap.matchMedia();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="playground-section">
      <div className="container">
        <div className="section-header">
          <span className="text-small-1">Playground</span>
          <span className="text-small-1">Experiments / Animations / 3D</span>
        </div>
        <div className="playground-content-grid">
          {PLAYGROUND_ITEMS.map((item, i) => (
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
          workList={PLAYGROUND_ITEMS}
          onClose={() => setSelectedModalIndex(null)}
          onIndexChange={setSelectedModalIndex}
        />
      )}
    </section>
  );
}
