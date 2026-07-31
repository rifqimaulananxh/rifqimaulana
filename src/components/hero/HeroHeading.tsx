"use client";

import { BRAND_IDENTITY } from "@/lib/constants";

export function HeroHeading() {
  return (
    <div className="flex flex-col select-none">
      {/* Small Label */}
      <div className="mb-4 md:mb-6">
        <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-neutral-500 uppercase">
          {BRAND_IDENTITY.label}
        </span>
      </div>

      {/* Main Huge Heading: RIFQI MAULANA */}
      <h1 className="font-extrabold tracking-tighter text-black uppercase leading-[0.85] text-6xl sm:text-8xl md:text-[10.5vw] lg:text-[11vw]">
        <div>RIFQI</div>
        <div>MAULANA</div>
      </h1>

      {/* Secondary Heading: BUILDING MODERN SOFTWARE */}
      <h2 className="font-bold tracking-tight text-neutral-900 uppercase leading-[0.92] text-3xl sm:text-5xl md:text-[4.5vw] mt-6 md:mt-8 max-w-4xl">
        BUILDING MODERN SOFTWARE
      </h2>
    </div>
  );
}
