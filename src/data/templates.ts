import { ResumeTemplate } from "@/types/resume";

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design with accent colors",
    preview: "/templates/modern.png",
    isPremium: false,
  },
  {
    id: "classic",
    name: "Classic ATS",
    description: "Traditional format optimized for ATS systems",
    preview: "/templates/classic.png",
    isPremium: false,
  },
  {
    id: "minimal",
    name: "Minimal Elegance",
    description: "Minimalist design with maximum impact",
    preview: "/templates/minimal.png",
    isPremium: true,
  },
  {
    id: "creative",
    name: "Creative Bold",
    description: "Stand out with a unique creative layout",
    preview: "/templates/creative.png",
    isPremium: true,
  },
];
