"use client";
import Link from "next/link";
import { projects } from "./projects/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!showProjects && e.deltaY > 50) {
        setShowProjects(true);
      }
      if (showProjects && e.deltaY < -50) {
        setShowProjects(false);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [showProjects]);

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-animated -z-10 opacity-13" />
      <AnimatePresence mode="wait">
        {!showProjects ? (
          // === Écran Intro ===
          <motion.div
            key="intro"
            className="fixed inset-0 flex flex-col justify-center items-center text-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Alexis Amettler
            </motion.h1>

            <motion.h2
              className="mt-4 text-2xl md:text-3xl font-medium text-gray-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Monteur Vidéo / Événementiel
            </motion.h2>

            <motion.p
              className="mt-6 max-w-2xl text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Je conçois des vidéos créatives et immersives pour artistes,
              marques et événements. <br /> Scrollez pour découvrir mes projets.
            </motion.p>
          </motion.div>
        ) : (
          // === Écran Projets ===
          <motion.div
            key="projects"
            className="absolute inset-0 px-6 py-16 overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 mt-10">
              Mes Projets
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <motion.div
                    className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500 transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold">
                        {project.title}
                      </h3>
                      <time className="block mt-1 text-sm text-gray-400">
                        {project.date}
                      </time>
                      <p className="mt-3 text-gray-300">
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
      </AnimatePresence>
    </section>
  );
}
