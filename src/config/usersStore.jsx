import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  error: null,
  setUsers: (users) => set({ users, error: null }),
  setError: (error) => set({ error }),
}));
