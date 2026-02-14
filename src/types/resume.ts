export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

export type TemplateType = 
  | "modern" 
  | "classic" 
  | "minimal" 
  | "creative"
  | "executive"
  | "tech"
  | "designer"
  | "academic"
  | "anurag"
  | "altacv";

export interface ResumeTemplate {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  isPremium: boolean;
  category?: "professional" | "creative" | "academic" | "tech";
}

// Template Component Props Interface
export interface TemplateProps {
  data: ResumeData;
}
