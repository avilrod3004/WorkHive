import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  error: null,
  setUser: (user) => set({ user, error: null }),
  setError: (error) => set({ error }),
  clearUser: () => set({ user: null }),
}));
