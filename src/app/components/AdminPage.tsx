"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects as initialProjects, Project } from "../../app/projects/data";

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(projects, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Charger depuis localStorage ou fallback aux données initiales
  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(initialProjects);
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const handleSave = () => {
    if (!selected) return;
    const updated = projects.map((p) =>
      p.slug === selected.slug ? selected : p
    );
    setProjects(updated);
    setSelected(null);
  };

  const handleDelete = (slug: string) => {
    setProjects(projects.filter((p) => p.slug !== slug));
    if (selected?.slug === slug) setSelected(null);
  };

  const handleVideoChange = (index: number, value: string) => {
    if (!selected) return;
    const newVideos = [...selected.videos];
    newVideos[index] = value;
    setSelected({ ...selected, videos: newVideos });
  };

  const handleAddVideo = () => {
    if (!selected) return;
    setSelected({ ...selected, videos: [...selected.videos, ""] });
  };

  const handleRemoveVideo = (index: number) => {
    if (!selected) return;
    const newVideos = selected.videos.filter((_, i) => i !== index);
    setSelected({ ...selected, videos: newVideos });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-6 py-16 text-white">
      <div className="absolute inset-0 bg-animated -z-10 opacity-20" />

      <motion.h1
        className="text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Gestion des Projets
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Liste des projets */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Projets existants</h2>
          <div className="space-y-4">
            {projects.map((p) => (
              <motion.div
                key={p.slug}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selected?.slug === p.slug
                    ? "border-orange-500 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="text-gray-400 text-sm">{p.date}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formulaire d’édition */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Éditer</h2>
          {selected ? (
            <div className="space-y-4">
              <input
                className="w-full p-2 rounded bg-white/10 border border-white/20"
                value={selected.title}
                onChange={(e) =>
                  setSelected({ ...selected, title: e.target.value })
                }
                placeholder="Titre"
              />
              <textarea
                className="w-full p-2 rounded bg-white/10 border border-white/20"
                value={selected.description}
                onChange={(e) =>
                  setSelected({ ...selected, description: e.target.value })
                }
                placeholder="Description"
              />
              <input
                className="w-full p-2 rounded bg-white/10 border border-white/20"
                type="date"
                value={selected.date}
                onChange={(e) =>
                  setSelected({ ...selected, date: e.target.value })
                }
              />

              {/* Champs vidéos dynamiques */}
              <div className="space-y-2">
                <h3 className="font-medium">Vidéos</h3>
                {selected.videos.map((video, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      className="flex-1 p-2 rounded bg-white/10 border border-white/20"
                      value={video}
                      onChange={(e) => handleVideoChange(i, e.target.value)}
                      placeholder={`ID de la vidéo ${i + 1}`}
                    />
                    <button
                      onClick={() => handleRemoveVideo(i)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddVideo}
                  className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600"
                >
                  + Ajouter une vidéo
                </button>
              </div>
                <input
                  className="w-full p-2 rounded bg-white/10 border border-white/20"
                  type="url"
                  value={selected.instagram || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, instagram: e.target.value })
                  }
                  placeholder="Lien Instagram (optionnel)"
                />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => handleDelete(selected.slug)}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Sélectionnez un projet à modifier.</p>
          )}
        </div>

        <div className="mt-6 flex justify-center md:col-span-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600"
          >
            Exporter JSON
          </button>
        </div>
      </div>
    </section>
  );
}
