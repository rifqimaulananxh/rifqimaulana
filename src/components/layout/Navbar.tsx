"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BRAND_IDENTITY, FOOTER_LINKS, NAV_LINKS } from "@/lib/constants";
import { navigateTo } from "@/lib/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => link.href.split("#")[0] === pathname)
  );

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
          <span className="logo" onClick={() => handleNavigate("/")}>
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
          <div className="drawer-top">
            <span className="text-small">{BRAND_IDENTITY.label}</span>
            <span className="text-small">MENU</span>
          </div>

          <ul ref={menuItemsRef} className="menu-items">
            {NAV_LINKS.map((item, index) => (
              <li key={item.label} className="menu-item-wrapper">
                <a
                  href={item.href}
                  className={`menu-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }}
                >
                  <span className="menu-item-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="menu-item-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="drawer-footer">
            <div className="drawer-contact">
              <a
                href={`mailto:${FOOTER_LINKS.email}`}
                className="text-small"
              >
                {FOOTER_LINKS.email}
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-small"
              >
                WhatsApp
              </a>
            </div>
            <span className="text-small">
              Based in {BRAND_IDENTITY.location}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
