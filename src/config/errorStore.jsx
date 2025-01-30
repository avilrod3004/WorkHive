/**
 * @config
 * Estado global para gestionar errores de peticiones HTTP utilizando Zustand.
 *
 * @property {string | null} fetchError - Almacena el mensaje de error de una petición fallida.
 * @method setFetchError - Establece un nuevo error en el estado.
 * @param {string | null} fetchError - Mensaje de error a establecer.
 * @method clearFetchError - Limpia el error almacenado, estableciéndolo en `null`.
 *
 * @returns {object} Objeto con el estado y sus métodos de manipulación.
 */
import { create } from "zustand";

/**
 * Hooke personalizado para acceder y modificar el estado de los errores de las peticiones
 */
export const useFetchErrorStore = create((set) => ({
    fetchError: null,

    /**
     * Actualiza el estado al mensaje del último error que ha ocurrido
     * @param fetchError
     */
    setFetchError: (fetchError) => set({ fetchError }),

    /**
     * Limpiar el error ocurrido
     */
    clearFetchError: () => set({ fetchError: null }),
}));
