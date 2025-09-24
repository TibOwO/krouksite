"use client";

import { useSection } from "../context/SectionContext";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { currentSection, setCurrentSection } = useSection();
  const router = useRouter();
  const pathname = usePathname();

  const goToSection = async (index: number) => {
    // si on est déjà sur la page d'accueil -> juste changer la section
    if (pathname === "/") {
      setCurrentSection(index);
      return;
    }

    // sinon, naviguer vers la home, puis définir la section
    // await router.push("/") renvoie quand la navigation est terminée
    await router.push("/");
    setCurrentSection(index);
  };

  const buttonClass = (i: number) =>
    `hover:text-orange-400 transition ${currentSection === i ? "text-orange-400" : ""}`;

  return (
    <nav className="flex gap-6 text-sm font-medium">
      <button onClick={() => goToSection(0)} className={buttonClass(0)}>Accueil</button>
      <button onClick={() => goToSection(1)} className={buttonClass(1)}>Projets</button>
      <button onClick={() => goToSection(2)} className={buttonClass(2)}>Contact</button>
    </nav>
  );
}
