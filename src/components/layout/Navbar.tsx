"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BRAND_IDENTITY, NAV_LINKS } from "@/lib/constants";
import { navigateTo } from "@/lib/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const pathname = usePathname();
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => link.href.split("#")[0] === pathname)
  );
  const previewIndex = hoverIndex >= 0 ? hoverIndex : activeIndex;

  useGSAP(
    () => {
      const links = menuItemsRef.current?.querySelectorAll("li a");
      if (!links) return;
      if (isOpen) {
        gsap.to(links, {
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.2,
          overwrite: "auto",
        });
      } else {
        gsap.to(links, {
          y: "100%",
          duration: 0.6,
          stagger: 0.04,
          ease: "power4.in",
          overwrite: "auto",
        });
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    navigateTo(href);
  };

  return (
    <>
      <header className={`navbar ${isOpen ? "open" : ""}`}>
        <div className="left">
          <span
            className="logo"
            onClick={() => handleNavigate("#index")}
          >
            {BRAND_IDENTITY.logo}
          </span>
        </div>
        <div
          className={`right ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="menu-horizontal-line" />
          <div className="menu-horizontal-line" />
        </div>
      </header>

      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <div className="menu-title">
            <div>Software</div>
            <div>Engineer</div>
          </div>

          <div className="image-wrapper">
            {NAV_LINKS.map((item, index) => {
              let translateY = "100%";
              if (index === previewIndex) translateY = "0%";
              else if (index < previewIndex) translateY = "-100%";
              return (
                <div
                  key={item.label}
                  className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                  style={{ transform: `translate3d(0, ${translateY}, 0)` }}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    priority
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

          <ul ref={menuItemsRef} className="menu-items">
            {NAV_LINKS.map((item, index) => (
              <li key={item.label} className="menu-item-wrapper">
                <a
                  href={item.href}
                  className={`menu-item ${activeIndex === index ? "active" : ""}`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(-1)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
