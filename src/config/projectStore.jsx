/**
 * @module Config
 * @category State
 */
import { create } from "zustand";

/**
 * @config
 * Store de Zustand para gestionar el estado de un proyecto y sus tareas.
 *
 * @typedef {Object} ProjectStore
 * @property {boolean} loading - Indica si el proyecto está cargando.
 * @property {Object|null} project - Datos del proyecto actual.
 * @property {Array} todoTasks - Lista de tareas pendientes.
 * @property {Array} inProgressTasks - Lista de tareas en progreso.
 * @property {Array} toReviewTasks - Lista de tareas en revisión.
 * @property {Array} doneTasks - Lista de tareas completadas.
 * @property {function} setLoading - Función para actualizar el estado de carga.
 * @property {function} setProject - Función para establecer el proyecto actual.
 * @property {function} setTodoTasks - Función para actualizar las tareas pendientes.
 * @property {function} setInProgressTasks - Función para actualizar las tareas en progreso.
 * @property {function} setToReviewTasks - Función para actualizar las tareas en revisión.
 * @property {function} setDoneTasks - Función para actualizar las tareas completadas.
 * @property {function} clearProject - Función para limpiar el proyecto actual.
 */

/**
 * Hook personalizado para acceder y modificar el estado de un proyecto y sus tareas.
 *
 * @type {import('zustand').UseStore<ProjectStore>}
 */
export const useProjectStore = create((set) => ({
  loading: true,
  project: null,
  todoTasks: [],
  inProgressTasks: [],
  toReviewTasks: [],
  doneTasks: [],
  editError: null,
  projectEdited: false,
  /**
   * Actualiza el estado de carga del proyecto.
   * @param {boolean} loading - Nuevo estado de carga.
   */
  setLoading: (loading) => set({ loading }),
  /**
   * Establece los datos del proyecto actual.
   * @param {Object} project - Datos del proyecto.
   */
  setProject: (project) => set({ project, editError: null }),
  /**
   * Actualiza la lista de tareas pendientes.
   * @param {Array} tasks - Nueva lista de tareas pendientes.
   */
  setTodoTasks: (tasks) => set({ todoTasks: tasks }),
  /**
   * Actualiza la lista de tareas en progreso.
   * @param {Array} tasks - Nueva lista de tareas en progreso.
   */
  setInProgressTasks: (tasks) => set({ inProgressTasks: tasks }),
  /**
   * Actualiza la lista de tareas en revisión.
   * @param {Array} tasks - Nueva lista de tareas en revisión.
   */
  setToReviewTasks: (tasks) => set({ toReviewTasks: tasks }),
  /**
   * Actualiza la lista de tareas completadas.
   * @param {Array} tasks - Nueva lista de tareas completadas.
   */
  setDoneTasks: (tasks) => set({ doneTasks: tasks }),
  setEditError: (editError) => set({ editError }),
  setProjectEdited: (projectEdited) => set({ projectEdited }),
  /**
   * Limpia los datos del proyecto actual.
   */
  clearProject: () => set({ project: null }),
  clearEditError: () => set({ editError: null }),
}));
