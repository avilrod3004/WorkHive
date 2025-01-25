import { create } from "zustand";

export const useProjectStore = create((set) => ({
  loading: true,
  project: null,
  todoTasks: [],
  inProgressTasks: [],
  toReviewTasks: [],
  doneTasks: [],
  setLoading: (loading) => set({ loading }),
  setProject: (project) => set({ project }),
  setTodoTasks: (tasks) => set({ todoTasks: tasks }),
  setInProgressTasks: (tasks) => set({ inProgressTasks: tasks }),
  setToReviewTasks: (tasks) => set({ toReviewTasks: tasks }),
  setDoneTasks: (tasks) => set({ doneTasks: tasks }),
  clearProject: () => set({ project: null }),
}));
