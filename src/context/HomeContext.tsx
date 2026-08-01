"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface HomeContextValue {
  isHomePageLoading: boolean;
  setIsHomePageLoading: (value: boolean) => void;
}

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [isHomePageLoading, setIsHomePageLoading] = useState(false);

  return (
    <HomeContext.Provider value={{ isHomePageLoading, setIsHomePageLoading }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const ctx = useContext(HomeContext);
  if (ctx === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return ctx;
}
