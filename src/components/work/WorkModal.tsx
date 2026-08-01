"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLenis, whenLenisReady } from "@/hooks/useLenis";
import type { Project } from "@/lib/projects";

interface WorkModalProps {
  selectedWorkIndex: number;
  workList: Project[];
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function WorkModal({
  selectedWorkIndex,
  workList,
  onClose,
  onIndexChange,
}: WorkModalProps) {
  const [active, setActive] = useState(false);
  const work = workList[selectedWorkIndex];
  const [imageIndex, setImageIndex] = useState(0);
  const [prevWorkIndex, setPrevWorkIndex] = useState(selectedWorkIndex);

  if (prevWorkIndex !== selectedWorkIndex) {
    setPrevWorkIndex(selectedWorkIndex);
    setImageIndex(0);
  }

  useEffect(() => {
    if (!work || work.image.length <= 1 || work.type === "Playground") return;
    const interval = setInterval(() => {
      setImageIndex((idx) => (idx + 1) % work.image.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [work]);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(true), 10);
    document.body.style.overflow = "hidden";
    const unsub = whenLenisReady((lenis) => lenis.stop());
    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
      unsub();
      getLenis()?.start();
    };
  }, []);

  if (!work) return null;

  const close = () => {
    setActive(false);
    setTimeout(onClose, 300);
  };

  const isFirst = selectedWorkIndex === 0;
  const isLast = selectedWorkIndex === workList.length - 1;

  return (
    <div
      className={`work-modal ${active ? "active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="work-modal-wrapper">
        <div className="work-modal-content-left">
          <div className="work-image-wrapper">
            {work.type === "Playground" ? (
              <Image
                src={work.bgMediaUrl}
                alt={work.title}
                fill
                sizes="(max-width: 1024px) 80vw, 50vw"
                className="object-cover"
              />
            ) : (
              work.image.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="project image"
                  fill
                  sizes="(max-width: 1024px) 80vw, 50vw"
                  style={{
                    opacity: i === imageIndex ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    objectFit: "cover",
                  }}
                />
              ))
            )}
          </div>
          {work.type !== "Playground" && (
            <>
              <div className="work-bg-image-wrapper">
                <Image
                  src={work.bgMediaUrl}
                  alt="project image"
                  fill
                  sizes="(max-width: 1024px) 90vw, 60vw"
                />
              </div>
              <div className="black-overlay" />
            </>
          )}
          <div className="close-btn" onClick={close}>
            <div className="menu-horizontal-line" />
            <div className="menu-horizontal-line" />
          </div>
        </div>

        <div className="work-modal-content-right">
          <div className="top-content">
            <div className="work-header">{work.title}</div>
            <div className="work-description">{work.description}</div>
            <div className="work-info">
              <div className="work-tags">
                <div className="role">{work.role}</div>
                <div className="tech">{work.tags}</div>
              </div>
              <Link
                href={work.href}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="visit-site">Visit</div>
                <div className="external-icon">
                  <Image
                    src="/icons/arrow.svg"
                    alt="external link"
                    fill
                    sizes="20px"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className="bottom-content">
            <div />
            <div className="navigations">
              <div
                className={`btn-left ${isFirst ? "disabled" : ""}`}
                onClick={() => !isFirst && onIndexChange(selectedWorkIndex - 1)}
              >
                <Image
                  src="/icons/arrow.svg"
                  alt="previous"
                  fill
                  sizes="20px"
                />
              </div>
              <div
                className={`btn-right ${isLast ? "disabled" : ""}`}
                onClick={() => !isLast && onIndexChange(selectedWorkIndex + 1)}
              >
                <Image
                  src="/icons/arrow.svg"
                  alt="next"
                  fill
                  sizes="20px"
                />
              </div>
            </div>
          </div>

          <div className="close-btn" onClick={close}>
            <div className="menu-horizontal-line" />
            <div className="menu-horizontal-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
