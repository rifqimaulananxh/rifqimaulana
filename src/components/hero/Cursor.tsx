"use client";

import { useCursor } from "@/hooks/useCursor";

export function Cursor() {
  const { position } = useCursor();

  return (
    <div
      className="fixed pointer-events-none z-50 w-6 h-6 rounded-full border border-foreground/50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
