"use client";

import { BRAND_IDENTITY, FOOTER_LINKS } from "@/lib/constants";
import { scrollToTarget } from "@/hooks/useLenis";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <a className="footer-email" href={`mailto:${FOOTER_LINKS.email}`}>
          {FOOTER_LINKS.email}
        </a>

        <div className="footer-bottom">
          <span className="text-x-small footer-copy">
            ©{CURRENT_YEAR} {BRAND_IDENTITY.name}
          </span>

          <div className="social-navigation">
            <button
              type="button"
              className="text-x-small"
              onClick={() => scrollToTarget(0)}
            >
              Back to top
            </button>
          </div>

          <span className="text-x-small footer-credit">
            Designed & Developed by {BRAND_IDENTITY.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
