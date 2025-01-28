import { create } from "zustand";

export const useAddCollaboratorStore = create((set) => ({
  collaboratorAdded: false,
  error: null,
  setCollaboratorAdded: (collaboratorAdded) => set({ collaboratorAdded }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
