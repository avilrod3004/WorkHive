import { create } from "zustand";

/**
 * Estado global para gestionar la lista de usuarios en la aplicación utilizando Zustand.
 *
 * @property {Array<object>} users - Lista de usuarios almacenados en el estado.
 * @property {string | null} error - Almacena un mensaje de error en caso de fallo.
 * @method setUsers - Actualiza la lista de usuarios y limpia cualquier error existente.
 * @param {Array<object>} users - Lista de usuarios obtenida.
 * @method setError - Establece un mensaje de error cuando falla la obtención de los usuarios.
 * @param {string | null} error - Mensaje de error a almacenar.
 *
 * @returns {object} Objeto con el estado y sus métodos de manipulación.
 */
export const useUsersStore = create((set) => ({
  /**
   * Lista de usuarios almacenados en el estado.
   * @type {Array<object>}
   */
  users: [],

  /**
   * Almacena un mensaje de error en caso de fallo al obtener los usuarios.
   * @type {string | null}
   */
  error: null,

  /**
   * Actualiza la lista de usuarios en el estado y limpia cualquier error previo.
   * @function
   * @param {Array<object>} users - Lista de usuarios obtenida.
   */
  setUsers: (users) => set({ users, error: null }),

  /**
   * Establece un mensaje de error cuando la obtención de los usuarios falla.
   * @function
   * @param {string | null} error - Mensaje de error a almacenar.
   */
  setError: (error) => set({ error }),
}));
