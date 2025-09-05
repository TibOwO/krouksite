"use client";
import { projects } from "../data";
import { motion } from "framer-motion";
import * as React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: Props) {
  // ✅ Unwrap la Promise avec React.use()
  const { slug } = React.use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="px-6 py-32 text-center">
        <p className="text-gray-400 text-xl">Projet non trouvé.</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-animated -z-10 opacity-20" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {project.title}
        </motion.h2>

        <motion.p
          className="mb-16 text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {project.description}
        </motion.p>
      </div>

      <div
        className={`grid gap-10 ${
          project.videos.length === 1 ? "place-items-center" : "md:grid-cols-2"
        }`}
      >
        {project.videos.map((videoId, index) => (
          <motion.div
            key={`${slug}-${videoId}`} // ✅ clé unique
            className="relative w-full aspect-video"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <iframe
              className="w-full h-full object-cover"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
              title={`Vidéo ${videoId}`}
              frameBorder="0"
              allowFullScreen
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
