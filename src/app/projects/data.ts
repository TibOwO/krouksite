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
  {
    slug: "video-entreprise",
    title: "Vidéo Entreprise",
    description: "Montage vidéo entreprise",
    date: "2023-09-10",
    videos: ["L_jWHffIx5E"],
  },
  {
    slug: "evenementiel",
    title: "Événementiel",
    description: "Montage vidéo événementiel",
    date: "2023-10-05",
    videos: ["eY52Zsg-KVI"],
  } ,
  {
    slug: "court-metrage",
    title: "Court Métrage",
    description: "Montage d'un court métrage",
    date: "2024-02-20",
    videos: ["M7lc1UVf-VE"],
  },
  {
    slug: "video-musicale",
    title: "Vidéo Musicale",
    description: "Montage d'une vidéo musicale",
    date: "2024-04-15",
    videos: ["hY7m5jjJ9mM"],
  }
  ,{
    slug: "video-promotionnelle",
    title: "Vidéo Promotionnelle",
    description: "Montage d'une vidéo promotionnelle pour un événement",
    date: "2024-05-10",
    videos: ["tAGnKpE4NCI"],
  }
  ,{
    slug: "video-tutoriel",
    title: "Vidéo Tutoriel",
    description: "Montage d'une vidéo tutoriel pour un logiciel",
    date: "2024-06-01",
    videos: ["9bZkp7q19f0"],
  }
  ,{
    slug: "video-animée",
    title: "Vidéo Animée",
    description: "Montage d'une vidéo animée pour une campagne publicitaire",
    date: "2024-06-20",
    videos: ["fJ9rUzIMcZQ"],
  },
  {
    slug: "video-de-formation",
    title: "Vidéo de Formation",
    description: "Montage d'une vidéo de formation pour une entreprise",
    date: "2024-06-25",
    videos: ["C0DPdy98e4c"],
  }
];
