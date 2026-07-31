"use client";

import { BRAND_IDENTITY } from "@/lib/constants";

export function HeroInfo() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
        {BRAND_IDENTITY.role}
      </span>
      <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-sans">
        {BRAND_IDENTITY.headlineSecondary}
      </p>
    </div>
  );
}
