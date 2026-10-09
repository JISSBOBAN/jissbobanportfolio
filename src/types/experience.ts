export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  duration?: string;
  location: string;
  locationType: string;
  current?: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade: string;
  specialization: string;
  bullets: string[];
}
