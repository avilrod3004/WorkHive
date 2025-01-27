import { create } from "zustand";

/**
 * Store de Zustand para gestionar el estado de los proyectos.
 * 
 * @typedef {Object} ProjectsStore
 * @property {boolean} isLoading - Indica si los proyectos están cargando.
 * @property {Array} actualProjects - Lista de proyectos actuales.
 * @property {Array} completedProjects - Lista de proyectos completados.
 * @property {function} setIsLoading - Función para actualizar el estado de carga.
 * @property {function} setActualProjects - Función para actualizar los proyectos actuales.
 * @property {function} setCompletedProjects - Función para actualizar los proyectos completados.
 */

/**
 * Hook personalizado para acceder y modificar el estado de los proyectos.
 * 
 * @type {import('zustand').UseStore<ProjectsStore>}
 */
export const useProjectsStore = create((set) => ({
  isLoading: true,
  actualProjects: [],
  completedProjects: [],
  /**
   * Actualiza el estado de carga de los proyectos.
   * @param {boolean} loading - Nuevo estado de carga.
   */
  setIsLoading: (loading) => set({ isLoading: loading }),
  /**
   * Actualiza la lista de proyectos actuales.
   * @param {Array} projects - Nueva lista de proyectos actuales.
   */
  setActualProjects: (projects) => set({ actualProjects: projects }),
  /**
   * Actualiza la lista de proyectos completados.
   * @param {Array} projects - Nueva lista de proyectos completados.
   */
  setCompletedProjects: (projects) => set({ completedProjects: projects }),
}));
