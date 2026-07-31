"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, NAV_LINKS } from "@/lib/constants";
import { scrollToTarget } from "@/hooks/useLenis";

export function Footer() {
  const [timeStr, setTimeStr] = useState("--:--:--");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (href: string) => {
    if (href.startsWith("#")) scrollToTarget(href);
  };

  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <a
          className="lets-work-together"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            navigate("#contact");
          }}
        >
          <span className="text-large title">Let&apos;s work together</span>
          <span className="bracket-button contact">[contact]</span>
        </a>

        <div className="footer-bottom">
          <div className="page-navigation">
            {NAV_LINKS.filter((link) => link.label !== "Contact").map(
              (link, i) => (
                <a
                  key={link.label}
                  className={`text-medium navigation-link ${
                    i === 0 ? "active" : ""
                  }`}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.href);
                  }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="contact-navigation">
            <div className="contact-info">
              <a
                href={`mailto:${FOOTER_LINKS.email}`}
                className="text-x-small footer-link"
              >
                {FOOTER_LINKS.email}
              </a>
              <a
                href="https://wa.me/6281234567890?text=START%20CHAT%0ATap%20send%20to%20initiate%20the%20conversation."
                target="_blank"
                rel="noopener noreferrer"
                className="text-x-small footer-link"
              >
                <span>{FOOTER_LINKS.whatsapp}</span>
                <Image
                  alt="whatsapp chat"
                  src="/icons/whatsapp-logo.svg"
                  width={2}
                  height={2}
                  style={{ color: "transparent" }}
                />
              </a>
              <span className="text-x-small footer-link">
                WIB - {timeStr}
              </span>
            </div>
            <div className="back-to-top isMobile" style={{ cursor: "pointer" }}>
              <span
                className="text-x-small footer-link"
                onClick={() => scrollToTarget(0)}
              >
                Back to top
              </span>
            </div>
          </div>

          <div className="empty-col" />

          <div className="social-navigation">
            <Link
              href={FOOTER_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedIn-link text-x-small footer-link"
            >
              LinkedIn
            </Link>
            <Link
              href={FOOTER_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link text-x-small footer-link"
            >
              Instagram
            </Link>
            <span
              className="isMobile text-x-small footer-link"
              style={{ cursor: "pointer" }}
              onClick={() => scrollToTarget(0)}
            >
              Back to top
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
