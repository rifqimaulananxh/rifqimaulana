"use client";

import { useSyncExternalStore } from "react";

let introReady = false;
const listeners = new Set<() => void>();

export function markIntroReady() {
  if (introReady) return;
  introReady = true;
  listeners.forEach((listener) => listener());
}

export function useIntroReady() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => introReady,
    () => false
  );
}
