"use client";

import { BRAND_IDENTITY } from "@/lib/constants";
import { CurrentTime } from "./CurrentTime";

export function HeroMetadata() {
  return (
    <footer className="w-full pt-8 pb-4 border-t border-neutral-200/80 mt-12 md:mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-between font-mono text-xs md:text-sm tracking-wider uppercase text-neutral-600">
        {/* Left: Name */}
        <div className="flex items-center gap-2">
          <span className="text-black font-semibold">{BRAND_IDENTITY.name}</span>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-500">{BRAND_IDENTITY.role}</span>
        </div>

        {/* Center: Live Current Time */}
        <div className="flex items-center md:justify-center">
          <CurrentTime />
        </div>

        {/* Right: Location */}
        <div className="flex items-center md:justify-end gap-2">
          <span className="text-neutral-400">BASED IN</span>
          <span className="text-black font-semibold">{BRAND_IDENTITY.location}</span>
        </div>
      </div>
    </footer>
  );
}
