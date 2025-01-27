/**
 * @module Config
 * @category State
 */
import { create } from "zustand";

/**
 * @config
 * Store de Zustand para gestionar el estado del usuario.
 * 
 * @typedef {Object} UserStore
 * @property {Object|null} user - Datos del usuario actual.
 * @property {function} setUser - Función para establecer el usuario actual.
 * @property {function} clearUser - Función para limpiar los datos del usuario actual.
 */

/**
 * Hook personalizado para acceder y modificar el estado del usuario.
 * 
 * @type {import('zustand').UseStore<UserStore>}
 */
export const useUserStore = create((set) => ({
  user: null,
  /**
   * Establece los datos del usuario actual.
   * @param {Object} user - Datos del usuario.
   */
  setUser: (user) => set({ user }),
  /**
   * Limpia los datos del usuario actual.
   */
  clearUser: () => set({ user: null }),
}));
