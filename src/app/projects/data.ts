export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  videos: string[];
  instagram?: string; // 🔥 nouveau champ
};

export const projects: Project[] = [
  {
    slug: "clip-musical",
    title: "Le Documentaire",
    description:
      "Pour mon projet de fin d’année de licence CVCA, j’ai eu l’occasion de réaliser mon propre documentaire, de l’écriture à la réalisation en passant par le montage",
    date: "2023-06-15",
    videos: ["dQw4w9WgXcQ", "Dd9zU9lJhfc"],
    instagram: "https://www.instagram.com/p/DOgn4kfCEcv/", // exemple
  },
  {
    slug: "pub-produit",
    title: "Publicité Produit",
    description: "Montage pub",
    date: "2023-08-01",
    videos: ["3JZ_D3ELwOQ"],
    instagram: "https://www.instagram.com/p/DOgn4kfCEcv/", // exemple
  },
];
