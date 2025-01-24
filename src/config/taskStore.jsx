import { create } from "zustand";

export const useTaskStore = create((set) => ({
  loading: true,
  task: null,
  setLoading: (loading) => set({ loading }),
  setTask: (task) => set({ task }),
  clearTask: () => set({ task: null }),
}));
