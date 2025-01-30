import { create } from "zustand";

export const useEditTaskStore = create((set) => ({
  taskEdited: false,
  editTaskError: null,
  setTaskEdited: (taskEdited) => set({ taskEdited }),
  setEditTaskError: (editTaskError) => set({ editTaskError }),
  clearEditTaskError: () => set({ editTaskError: null }),
}));
