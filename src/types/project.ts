export interface Project {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  architectureDetails: string[];
  technologies: string[];
  metrics?: string;
  imageSrc?: string;
  verificationLink?: string;
}
