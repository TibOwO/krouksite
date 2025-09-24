"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "./projects/data";
import { useSection } from "./context/SectionContext";

export default function HomePage() {
  const { currentSection, setCurrentSection } = useSection();
  const scrollTimeout = useRef(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const sections = ["intro", "projects", "contact"];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollTimeout.current) return;

      // scroll interne dans la liste de projets
      if (currentSection === 1 && projectsRef.current) {
        const el = projectsRef.current;
        const isAtTop = el.scrollTop === 0;
        const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

        if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
          return;
        }
      }

      // scroll plein écran
      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (e.deltaY < 0) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      scrollTimeout.current = true;
      setTimeout(() => {
        scrollTimeout.current = false;
      }, 1200);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, setCurrentSection]);

  return (
    <section className="relative h-screen w-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-animated -z-10 opacity-[0.13]" />

      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.div
            key="intro"
            className="h-screen w-screen flex flex-col justify-center items-center text-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              Alexis Amettler
            </h1>
            <h2 className="mt-4 text-2xl md:text-3xl font-medium text-gray-300">
              Monteur Vidéo / Événementiel
            </h2>
            <p className="mt-8 max-w-4xl text-gray-300"> Passionné par l’audiovisuel depuis mon adolescence, j’ai développé un goût particulier pour l'audiovisuel, particulièrement le montage vidéo. Ma maîtrise avancée des logiciels est une de mes principales forces, qui me permet de travailler efficacement et rapidement tout en garantissant une qualité certaine. Mes connaissances en communication digitale me permettent d’adapter chaque projet aux attentes des publics. J’ai pu réaliser de nombreux projets variés, allant de la création de contenus digitaux à des documentaires et des projets musicaux. Un profil polyvalent à la croisée de l’audiovisuel et de la communication digitale.
            </p>
          </motion.div>
        )}

        {currentSection === 1 && (
          <motion.div
            key="projects"
            ref={projectsRef}
            className="h-screen w-screen px-6 py-16 overflow-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 mt-10">Mes Projets</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-100">
              {projects
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((project, index) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <motion.div
                      className="relative group rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500 transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {project.videos.length > 0 && (
                        <div className="relative w-full aspect-video">
                          <iframe
                            className="w-full h-full object-cover rounded-2xl"
                            src={`https://www.youtube.com/embed/${project.videos[0]}?autoplay=0&controls=0`}
                            title={`Preview ${project.title}`}
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <time className="block mt-1 text-sm text-gray-400">
                          {project.date}
                        </time>
                        <p className="mt-3 text-gray-300 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition" />
                    </motion.div>
                  </Link>
                ))}
            </div>
          </motion.div>
        )}

        {currentSection === 2 && (
          <motion.div
            key="contact"
            className="h-screen w-screen flex flex-col justify-center items-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Contactez-moi</h2>
            <p className="text-gray-300 max-w-xl text-center mb-8">
              Vous avez un projet ou une idée ? Discutons-en !
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href="mailto:alexis.amettler@gmail.com"
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-2xl transition"
              >
                Envoyer un e-mail
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
