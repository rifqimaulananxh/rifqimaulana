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

let routeReady = false;
const routeListeners = new Set<() => void>();

export function markRouteUnready() {
  if (!routeReady) return;
  routeReady = false;
  routeListeners.forEach((listener) => listener());
}

export function markRouteReady() {
  if (routeReady) return;
  routeReady = true;
  routeListeners.forEach((listener) => listener());
}

export function useRouteReady() {
  return useSyncExternalStore(
    (listener) => {
      routeListeners.add(listener);
      return () => routeListeners.delete(listener);
    },
    () => routeReady,
    () => false
  );
}
