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
  const [imageState, setImageState] = useState({
    workIndex: selectedWorkIndex,
    imageIndex: 0,
  });
  const imageIndex =
    imageState.workIndex === selectedWorkIndex ? imageState.imageIndex : 0;

  useEffect(() => {
    if (!work || work.image.length <= 1 || work.type === "Playground") return;
    const interval = setInterval(() => {
      setImageState((current) => {
        const currentIndex =
          current.workIndex === selectedWorkIndex ? current.imageIndex : 0;
        return {
          workIndex: selectedWorkIndex,
          imageIndex: (currentIndex + 1) % work.image.length,
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedWorkIndex, work]);

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

  const hasExternalLink = /^https?:\/\//.test(work.href);
  const projectHref = hasExternalLink ? work.href : "/work";

  const close = () => {
    setActive(false);
    setTimeout(onClose, 300);
  };

  const isFirst = selectedWorkIndex === 0;
  const isLast = selectedWorkIndex === workList.length - 1;

  return (
    <div
      className={`work-modal ${active ? "active" : ""}`}
      aria-hidden={!active}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="work-modal-wrapper"
        role="dialog"
        aria-modal="true"
        aria-label={`${work.title} project details`}
      >
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
                  alt={`${work.title} project image`}
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
                  alt={`${work.title} background image`}
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
                href={projectHref}
                className="project-link"
                target={hasExternalLink ? "_blank" : undefined}
                rel={hasExternalLink ? "noopener noreferrer" : undefined}
              >
                <div className="visit-site">
                  {hasExternalLink ? "View live site" : "View all projects"}
                </div>
                <div className="external-icon">
                  <Image
                    src="/icons/arrow.svg"
                    alt={
                      hasExternalLink ? "external link" : "view all projects"
                    }
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
