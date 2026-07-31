"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";

export function useSplitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitType(ref.current, {
      types: "lines,words,chars",
      tagName: "span",
    });

    return () => {
      split.revert();
    };
  }, []);

  return ref;
}
