"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BRAND_IDENTITY, FOOTER_LINKS, NAV_LINKS } from "@/lib/constants";
import { navigateTo } from "@/lib/navigation";
import { lockScroll } from "@/hooks/useLenis";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const hasOpenedRef = useRef(false);
  const introReady = useIntroReady();
  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => {
      const path = link.href.split("#")[0];
      return path === "/"
        ? pathname === "/"
        : pathname === path || pathname.startsWith(`${path}/`);
    })
  );

  useGSAP(
    () => {
      const links = menuItemsRef.current?.querySelectorAll("li a");
      if (!links || !introReady) return;
      if (prefersReducedMotion()) {
        gsap.set(links, { y: isOpen ? 0 : "100%" });
        return;
      }
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
    { dependencies: [isOpen, introReady], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!isOpen) {
      if (hasOpenedRef.current) {
        (lastFocusedRef.current ?? menuButtonRef.current)?.focus();
        lastFocusedRef.current = null;
      }
      return;
    }

    hasOpenedRef.current = true;
    const unlock = lockScroll();
    const focusFirstItem = () => {
      drawerRef.current
        ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
        ?.focus();
    };
    const frameId = window.requestAnimationFrame(focusFirstItem);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!drawerRef.current) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
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
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    navigateTo(href);
  };

  const toggleMenu = () => {
    if (!isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen((open) => !open);
  };

  return (
    <>
      <header className={`navbar ${isOpen ? "open" : ""}`}>
        <div className="left">
          <button
            type="button"
            className="logo"
            aria-label="Go to home"
            onClick={() => handleNavigate("/")}
          >
            {BRAND_IDENTITY.logo}
          </button>
        </div>
        <button
          type="button"
          className={`right ${isOpen ? "open" : ""}`}
          ref={menuButtonRef}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="site-menu"
        >
          <div className="menu-horizontal-line" />
          <div className="menu-horizontal-line" />
        </button>
      </header>

      <div
        ref={drawerRef}
        id="site-menu"
        className={`drawer ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
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
                    if (
                      e.button !== 0 ||
                      e.metaKey ||
                      e.ctrlKey ||
                      e.shiftKey ||
                      e.altKey
                    ) {
                      return;
                    }
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
                href={`https://wa.me/${FOOTER_LINKS.whatsappNumber}`}
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
