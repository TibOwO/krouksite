import projectsJson from "./data.json";

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  videos: string[];
  instagrams?: string[];
};

export const projects: Project[] = projectsJson;
