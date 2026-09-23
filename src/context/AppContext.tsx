import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Experience, SkillCategory, TaskItem, UserProfile, TaskStatus } from '../types';
import { initialProfile, initialProjects, initialExperiences, initialSkillCategories, initialTasks } from '../data/initialData';

export type ActiveTab = 'portfolio' | 'experience' | 'tasks' | 'studio' | 'ai';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  profile: UserProfile;
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  tasks: TaskItem[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
  toast: ToastMessage | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;

  // Profile actions
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Project actions
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;

  // Experience actions
  addExperience: (exp: Omit<Experience, 'id'>) => Experience;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Skills actions
  addSkillToCategory: (categoryId: string, skill: { name: string; level: number }) => void;
  removeSkillFromCategory: (categoryId: string, skillName: string) => void;

  // Task actions
  addTask: (task: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>) => TaskItem;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addSubtask: (taskId: string, title: string) => void;

  // Data management
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  resetAllData: () => void;
}

const STORAGE_KEY = 'devpulse_app_state_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('portfolio');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load initial from localStorage or defaults
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return stored ? JSON.parse(stored) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return stored ? JSON.parse(stored) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_experiences`);
      return stored ? JSON.parse(stored) : initialExperiences;
    } catch {
      return initialExperiences;
    }
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_skills`);
      return stored ? JSON.parse(stored) : initialSkillCategories;
    } catch {
      return initialSkillCategories;
    }
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_tasks`);
      return stored ? JSON.parse(stored) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(experiences));
      localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skillCategories));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [profile, projects, experiences, skillCategories, tasks]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3000);
  };

  // Profile actions
  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('প্রোফাইল সফলভাবে আপডেট করা হয়েছে');
  };

  // Project actions
  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>): Project => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [newProject, ...prev]);
    showToast('নতুন প্রজেক্ট সফলভাবে যুক্ত করা হয়েছে');
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('প্রজেক্ট তথ্য আপডেট করা হয়েছে');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('প্রজেক্ট মুছে ফেলা হয়েছে', 'info');
  };

  const toggleProjectFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  // Experience actions
  const addExperience = (expData: Omit<Experience, 'id'>): Experience => {
    const newExp: Experience = {
      ...expData,
      id: `exp-${Date.now()}`,
    };
    setExperiences((prev) => [newExp, ...prev]);
    showToast('কাজের অভিজ্ঞতা যুক্ত করা হয়েছে');
    return newExp;
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    showToast('অভিজ্ঞতার তথ্য আপডেট করা হয়েছে');
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    showToast('অভিজ্ঞতা মুছে ফেলা হয়েছে', 'info');
  };

  // Skill actions
  const addSkillToCategory = (categoryId: string, skill: { name: string; level: number }) => {
    setSkillCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: [...cat.skills.filter((s) => s.name !== skill.name), skill],
          };
        }
        return cat;
      })
    );
    showToast('দক্ষতা যুক্ত করা হয়েছে');
  };

  const removeSkillFromCategory = (categoryId: string, skillName: string) => {
    setSkillCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((s) => s.name !== skillName) }
          : cat
      )
    );
    showToast('দক্ষতা সরানো হয়েছে', 'info');
  };

  // Task actions
  const addTask = (taskData: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>): TaskItem => {
    const newTask: TaskItem = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('টাস্ক তৈরি হয়েছে');
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<TaskItem>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
    showToast('টাস্ক আপডেট করা হয়েছে');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('টাস্ক মুছে ফেলা হয়েছে', 'info');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus: TaskStatus =
            t.status === 'todo'
              ? 'in_progress'
              : t.status === 'in_progress'
              ? 'completed'
              : 'todo';
          return { ...t, status: nextStatus, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          // Check if all subtasks completed
          const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every((s) => s.completed);
          return {
            ...task,
            subtasks: updatedSubtasks,
            status: allDone ? 'completed' : task.status,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
  };

  const addSubtask = (taskId: string, title: string) => {
    if (!title.trim()) return;
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [
              ...task.subtasks,
              { id: `sub-${Date.now()}`, title: title.trim(), completed: false },
            ],
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
  };

  // Export / Import / Reset
  const exportDataJSON = () => {
    const backupData = {
      profile,
      projects,
      experiences,
      skillCategories,
      tasks,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devpulse-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে');
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) setProfile(data.profile);
      if (Array.isArray(data.projects)) setProjects(data.projects);
      if (Array.isArray(data.experiences)) setExperiences(data.experiences);
      if (Array.isArray(data.skillCategories)) setSkillCategories(data.skillCategories);
      if (Array.isArray(data.tasks)) setTasks(data.tasks);
      showToast('ডেটা সফলভাবে ইমপোর্ট সম্পন্ন হয়েছে!');
      return true;
    } catch (e) {
      showToast('অবৈধ ব্যাকআপ ফাইল ফরম্যাট', 'error');
      return false;
    }
  };

  const resetAllData = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setExperiences(initialExperiences);
    setSkillCategories(initialSkillCategories);
    setTasks(initialTasks);
    showToast('সকল ডেটা ডিফল্ট অবস্থায় রিসেট করা হয়েছে', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        projects,
        experiences,
        skillCategories,
        tasks,
        activeTab,
        setActiveTab,
        previewMode,
        setPreviewMode,
        toast,
        showToast,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        addExperience,
        updateExperience,
        deleteExperience,
        addSkillToCategory,
        removeSkillFromCategory,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        toggleSubtask,
        addSubtask,
        exportDataJSON,
        importDataJSON,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
