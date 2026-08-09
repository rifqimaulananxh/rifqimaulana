"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lockScroll } from "@/hooks/useLenis";
import type { Project } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/motion";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const [imageState, setImageState] = useState({
    workIndex: selectedWorkIndex,
    imageIndex: 0,
  });
  const imageIndex =
    imageState.workIndex === selectedWorkIndex ? imageState.imageIndex : 0;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (
      !work ||
      work.image.length <= 1 ||
      work.type === "Playground" ||
      prefersReducedMotion()
    ) {
      return;
    }
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

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setActive(false);
    window.setTimeout(() => onCloseRef.current(), 300);
  }, []);

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    const frameId = window.requestAnimationFrame(() => {
      setActive(true);
      dialogRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("keydown", handleKeyDown);
      unlock();
      previousActiveElementRef.current?.focus();
    };
  }, [close]);

  if (!work) return null;

  const hasExternalLink = /^https?:\/\//.test(work.href);
  const hasCaseStudyLink = work.href.startsWith("/work/");
  const projectHref =
    hasExternalLink || hasCaseStudyLink ? work.href : "/work";

  const isFirst = selectedWorkIndex === 0;
  const isLast = selectedWorkIndex === workList.length - 1;

  return (
    <div
      className={`work-modal ${active ? "active" : ""}`}
      aria-hidden={!active}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="work-modal-wrapper"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`work-title-${work.id}`}
        tabIndex={-1}
      >
        <div className="work-modal-content-left">
          <div className="work-image-wrapper">
            <Image
              src={
                work.type === "Playground"
                  ? work.bgMediaUrl
                  : work.image[imageIndex] ?? work.image[0]
              }
              alt={`${work.title} project preview`}
              fill
              sizes="(max-width: 1024px) 80vw, 50vw"
              className="object-cover"
            />
          </div>
          {work.type !== "Playground" && (
            <>
              <div className="work-bg-image-wrapper">
                <Image
                  src={work.bgMediaUrl}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1024px) 90vw, 60vw"
                />
              </div>
              <div className="black-overlay" />
            </>
          )}
          <button type="button" className="close-btn" aria-label="Close project details" onClick={close}>
            <div className="menu-horizontal-line" />
            <div className="menu-horizontal-line" />
          </button>
        </div>

        <div className="work-modal-content-right">
          <div className="top-content">
            <h2 id={`work-title-${work.id}`} className="work-header">
              {work.title}
            </h2>
            <p className="work-description">{work.description}</p>
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
                  <span className="visit-site">
                    {hasExternalLink
                      ? "View live site"
                      : hasCaseStudyLink
                        ? "View case study"
                        : "View all projects"}
                  </span>
                <div className="external-icon">
                  <Image
                    src="/icons/arrow.svg"
                    alt=""
                    aria-hidden="true"
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
              <button
                type="button"
                className={`btn-left ${isFirst ? "disabled" : ""}`}
                aria-label="Previous project"
                disabled={isFirst}
                onClick={() => !isFirst && onIndexChange(selectedWorkIndex - 1)}
              >
                <Image
                  src="/icons/arrow.svg"
                  alt=""
                  fill
                  sizes="20px"
                />
              </button>
              <button
                type="button"
                className={`btn-right ${isLast ? "disabled" : ""}`}
                aria-label="Next project"
                disabled={isLast}
                onClick={() => !isLast && onIndexChange(selectedWorkIndex + 1)}
              >
                <Image
                  src="/icons/arrow.svg"
                  alt=""
                  fill
                  sizes="20px"
                />
              </button>
            </div>
          </div>

          <button type="button" className="close-btn" aria-label="Close project details" onClick={close}>
            <div className="menu-horizontal-line" />
            <div className="menu-horizontal-line" />
          </button>
        </div>
      </div>
    </div>
  );
}
