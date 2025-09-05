// app/page.tsx
"use client";
import Link from "next/link";
import { projects } from "./projects/data";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6">
      {/* Fond animé */}
      <div className="absolute inset-0 bg-animated -z-10 opacity-20" />

      {/* Titre */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-center leading-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Alexis Amettler
      </motion.h1>

      <motion.h2
        className="mt-4 text-2xl md:text-3xl font-medium text-gray-300 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Monteur Vidéo / Événementiel
      </motion.h2>

      <motion.p
        className="mt-6 max-w-2xl text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Je conçois des vidéos créatives et immersives pour artistes, marques et événements. 
        Découvrez mes projets ci-dessous.
      </motion.p>

      {/* Projets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl w-full">
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
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <time className="block mt-1 text-sm text-gray-400">{project.date}</time>
                <p className="mt-3 text-gray-300">{project.description}</p>
              </div>
              <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
