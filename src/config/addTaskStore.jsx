import { create } from "zustand";

/**
 * Estado global para gestionar la adición de tareas en la aplicación utilizando Zustand.
 *
 * @property {boolean} taskAdded - Indica si una tarea ha sido añadida correctamente.
 * @property {string | null} addTaskError - Almacena un mensaje de error si la adición de la tarea falla.
 * @method setTaskAdded - Establece si una tarea ha sido añadida correctamente.
 * @param {boolean} taskAdded - `true` si la tarea fue añadida exitosamente, `false` en caso contrario.
 * @method setAddTaskError - Establece un mensaje de error cuando la adición de una tarea falla.
 * @param {string | null} addTaskError - Mensaje de error a almacenar.
 * @method clearAddTaskError - Elimina cualquier error almacenado, estableciéndolo en `null`.
 *
 * @returns {object} Objeto con el estado y sus métodos de manipulación.
 */
export const useAddTaskStore = create((set) => ({
  /**
   * Indica si una tarea ha sido añadida con éxito.
   * @type {boolean}
   */
  taskAdded: false,

  /**
   * Almacena un mensaje de error en caso de que falle la adición de una tarea.
   * @type {string | null}
   */
  addTaskError: null,

  /**
   * Actualiza el estado para indicar si una tarea ha sido añadida correctamente.
   * @function
   * @param {boolean} taskAdded - `true` si la tarea fue añadida exitosamente, `false` en caso contrario.
   */
  setTaskAdded: (taskAdded) => set({ taskAdded }),

  /**
   * Establece un mensaje de error cuando la adición de una tarea falla.
   * @function
   * @param {string | null} addTaskError - Mensaje de error a almacenar.
   */
  setAddTaskError: (addTaskError) => set({ addTaskError }),

  /**
   * Limpia el mensaje de error almacenado, estableciéndolo en `null`.
   * @function
   */
  clearAddTaskError: () => set({ addTaskError: null }),
}));
