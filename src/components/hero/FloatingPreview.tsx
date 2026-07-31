"use client";

export function FloatingPreview() {
  return (
    <div className="relative w-full max-w-2xl aspect-[16/9] border border-neutral-300/80 bg-neutral-50/50 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6 overflow-hidden rounded-none shadow-sm transition-all duration-300 hover:border-black/40">
      {/* Corner Accents - Swiss Minimalist Alignment Marks */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-400 select-none">
        ┌ [ 01 ]
      </div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-neutral-400 select-none">
        [ PREVIEW SLOT ] ┐
      </div>
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-400 select-none">
        └ [ RESERVED ]
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-400 select-none">
        [ INTERACTIVE CONTAINER ] ┘
      </div>

      {/* Center Label */}
      <div className="m-auto flex flex-col items-center justify-center gap-2 text-center">
        <div className="w-8 h-8 rounded-full border border-dashed border-neutral-400 flex items-center justify-center text-neutral-400 text-xs font-mono">
          +
        </div>
        <span className="text-xs md:text-sm font-mono tracking-widest text-neutral-500 uppercase">
          FUTURE INTERACTIVE PROJECT PREVIEW
        </span>
      </div>
    </div>
  );
}
