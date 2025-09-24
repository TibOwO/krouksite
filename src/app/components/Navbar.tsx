"use client";
import { useSection } from "../context/SectionContext";

export default function Navbar() {
  const { setCurrentSection } = useSection();

  return (
    <nav className="flex gap-6 text-sm font-medium">
      <button
        onClick={() => setCurrentSection(0)}
        className="hover:text-orange-400 transition"
      >
        Accueil
      </button>
      <button
        onClick={() => setCurrentSection(1)}
        className="hover:text-orange-400 transition"
      >
        Projets
      </button>
      <button
        onClick={() => setCurrentSection(2)}
        className="hover:text-orange-400 transition"
      >
        Contact
      </button>
    </nav>
  );
}
