import { create } from "zustand";

export const useProjectsStore = create((set) => ({
  isLoading: true,
  actualProjects: [],
  completedProjects: [],
  setIsLoading: (loading) => set({ isLoading: loading }),
  setActualProjects: (projects) => set({ actualProjects: projects }),
  setCompletedProjects: (projects) => set({ completedProjects: projects }),
}));
