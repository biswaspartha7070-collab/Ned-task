export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface TaskSubItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category?: string;
  projectId?: string; // Optional link to a project
  dueDate?: string;
  estimatedHours?: number;
  subtasks: TaskSubItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Frontend' | 'Full-Stack' | 'Mobile' | 'Backend' | 'AI/ML' | 'DevOps' | 'UI/UX';
  overview: string;
  metrics: string[];
  technologies: string[];
  features: string[];
  challengesSolved?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate?: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  employmentType: 'Full-time' | 'Contract' | 'Remote' | 'Part-time' | 'Freelance';
  startDate: string;
  endDate: string; // 'Present' or date string
  isCurrent: boolean;
  summary: string;
  achievements: string[];
  skillsHighlighted: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 1 - 100
  }[];
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  aboutDetailed: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  availableForHire: boolean;
  experienceYears: number;
  projectsCompleted: number;
}
