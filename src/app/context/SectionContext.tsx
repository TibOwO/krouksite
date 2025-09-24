"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SectionContextType = {
  currentSection: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used inside SectionProvider");
  return ctx;
};
