/**
 * @module Config
 * @category State
 */
import { create } from "zustand";

/**
 * @config
 * Store de Zustand para gestionar el estado de una tarea.
 * 
 * @typedef {Object} TaskStore
 * @property {boolean} loading - Indica si la tarea está cargando.
 * @property {Object|null} task - Datos de la tarea actual.
 * @property {function} setLoading - Función para actualizar el estado de carga.
 * @property {function} setTask - Función para establecer la tarea actual.
 * @property {function} clearTask - Función para limpiar la tarea actual.
 */

/**
 * Hook personalizado para acceder y modificar el estado de una tarea.
 * 
 * @type {import('zustand').UseStore<TaskStore>}
 */
export const useTaskStore = create((set) => ({
  loading: true,
  task: null,
  /**
   * Actualiza el estado de carga de la tarea.
   * @param {boolean} loading - Nuevo estado de carga.
   */
  setLoading: (loading) => set({ loading }),
  /**
   * Establece los datos de la tarea actual.
   * @param {Object} task - Datos de la tarea.
   */
  setTask: (task) => set({ task }),
  /**
   * Limpia los datos de la tarea actual.
   */
  clearTask: () => set({ task: null }),
}));
