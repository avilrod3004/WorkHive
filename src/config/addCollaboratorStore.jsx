import { create } from "zustand";

/**
 * Estado global para gestionar la adición de colaboradores en la aplicación utilizando Zustand.
 *
 * @property {boolean} collaboratorAdded - Indica si la adición de un colaborador fue exitosa.
 * @property {string | null} error - Almacena un mensaje de error en caso de fallo.
 * @method setCollaboratorAdded - Actualiza el estado para indicar si se ha añadido un colaborador.
 * @param {boolean} collaboratorAdded - Valor que indica si la operación fue exitosa.
 * @method setError - Establece un mensaje de error en caso de fallo.
 * @param {string | null} error - Mensaje de error a almacenar.
 * @method clearError - Limpia el error almacenado, estableciéndolo en `null`.
 *
 * @returns {object} Objeto con el estado y sus métodos de manipulación.
 */
export const useAddCollaboratorStore = create((set) => ({
  /**
   * Indica si un colaborador ha sido añadido con éxito.
   * @type {boolean}
   */
  collaboratorAdded: false,

  /**
   * Almacena un mensaje de error en caso de fallo.
   * @type {string | null}
   */
  error: null,

  /**
   * Actualiza el estado para indicar si un colaborador ha sido añadido con éxito.
   * @function
   * @param {boolean} collaboratorAdded - `true` si la operación fue exitosa, `false` en caso contrario.
   */
  setCollaboratorAdded: (collaboratorAdded) => set({ collaboratorAdded }),

  /**
   * Establece un mensaje de error cuando la adición de un colaborador falla.
   * @function
   * @param {string | null} error - Mensaje de error a almacenar.
   */
  setError: (error) => set({ error }),

  /**
   * Limpia el mensaje de error almacenado, estableciéndolo en `null`.
   * @function
   */
  clearError: () => set({ error: null }),
}));
