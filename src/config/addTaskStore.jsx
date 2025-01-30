import { create } from "zustand";

export const useAddTaskStore = create((set) => ({
  taskAdded: false,
  addTaskError: null,
  setTaskAdded: (taskAdded) => set({ taskAdded }),
  setAddTaskError: (addTaskError) => set({ addTaskError }),
  clearAddTaskError: () => set({ addTaskError: null }),
}));
