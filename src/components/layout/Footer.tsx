"use client";

import Link from "next/link";
import { BRAND_IDENTITY, FOOTER_LINKS } from "@/lib/constants";
import { scrollToTarget } from "@/hooks/useLenis";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <a className="footer-email" href={`mailto:${FOOTER_LINKS.email}`}>
          {FOOTER_LINKS.email}
        </a>

        <div className="footer-bottom">
          <span className="text-x-small footer-copy">
            ©2026 {BRAND_IDENTITY.name}
          </span>

          <div className="social-navigation">
            <Link
              href={FOOTER_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-x-small"
            >
              LinkedIn
            </Link>
            <Link
              href={FOOTER_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-x-small"
            >
              Instagram
            </Link>
            <span
              className="text-x-small"
              style={{ cursor: "pointer" }}
              onClick={() => scrollToTarget(0)}
            >
              Back to top
            </span>
          </div>

          <span
            className="text-x-small footer-credit"
            style={{ cursor: "pointer" }}
            onClick={() => scrollToTarget(0)}
          >
            Designed &amp; Developed by {BRAND_IDENTITY.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
