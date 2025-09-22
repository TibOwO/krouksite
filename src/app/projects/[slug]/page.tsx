"use client";

import { projects } from "../data";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

// Typage d'un projet
interface Project {
  slug: string;
  title: string;
  description: string;
  videos: string[];
  instagram?: string;
}

// Props avec params comme Promise
interface Props {
  params: Promise<{ slug: string }>;
}

// Typage de window.instgrm
interface InstagramWindow extends Window {
  instgrm?: {
    Embeds: {
      process: () => void;
    };
  };
}

export default function ProjectPage({ params }: Props) {
  // ✅ Unwrap the params promise using React.use()
  const { slug } = React.use(params);

  // Find the project by slug
  const project = projects.find((p) => p.slug === slug) as Project | undefined;

  // Instagram embed handling
  useEffect(() => {
    if (!project?.instagram) return;

    const win = window as InstagramWindow;

    if (win.instgrm) {
      win.instgrm.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      win.instgrm?.Embeds.process();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [project?.instagram]);

  if (!project) {
    return (
      <section className="px-6 py-32 text-center">
        <p className="text-gray-400 text-xl">🚧 Projet non trouvé.</p>
      </section>
    );
  }

  return (
    <section className="main-div-color relative min-h-screen w-full px-6 py-24">
      <div className="absolute inset-0 bg-animated -z-10 opacity-20" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-gray-100 text-4xl md:text-4xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="mb-16 text-lg md:text-xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {project.description}
        </motion.p>
      </div>

      <motion.div
        className={`grid gap-10 ${
          project.videos.length === 1 ? "place-items-center" : "md:grid-cols-2"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {project.videos.map((videoId, index) => (
          <motion.div
            key={`${slug}-${videoId}`}
            className={`relative aspect-video rounded-2xl shadow-xl bg-white/5 backdrop-blur-sm
              ${project.videos.length === 1 ? "w-full max-w-4xl" : "w-full"}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <iframe
              className="w-full h-full object-cover rounded-2xl"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
              title={`Vidéo du projet ${project.title}`}
              aria-label={`Vidéo du projet ${project.title}`}
              frameBorder="0"
              allowFullScreen
            />
          </motion.div>
        ))}
      </motion.div>

      {project.instagram && (
        <motion.div
          className="max-w-lg mx-auto mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <blockquote
            className="instagram-media w-full"
            data-instgrm-permalink={project.instagram}
            data-instgrm-version="14"
            style={{
              background: "transparent",
              border: "none",
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          />
        </motion.div>
      )}
    </section>
  );
}
