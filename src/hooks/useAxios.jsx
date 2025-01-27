
/**
 * @module Hooks
 * @category Custom
 */
import axios from "axios";
import { create } from "zustand";

/**
 * @typedef {Object} AxiosStoreState
 * @property {any} data - Los datos recibidos de la última petición.
 * @property {boolean} isLoading - Indica si hay una petición en curso.
 * @property {Error|null} error - El error de la última petición, si lo hubo.
 * @property {Function} fetch - Función para realizar peticiones HTTP.
 */

/**
 * @typedef {Object} FetchResult
 * @property {any} data - Los datos recibidos de la petición.
 * @property {Error|null} error - El error de la petición, si lo hubo.
 */

/**
 * Store de Zustand para manejar peticiones HTTP con Axios.
 * @type {import('zustand').UseStore<AxiosStoreState>}
 */
const useAxiosStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  /**
   * Realiza una petición HTTP.
   * @async
   * @param {string} url - La URL de la petición.
   * @param {string} [method="GET"] - El método HTTP a utilizar.
   * @param {any} [body=null] - El cuerpo de la petición para métodos POST y PUT.
   * @param {Object} [headers=null] - Los headers de la petición.
   * @returns {Promise<FetchResult>} Resultado de la petición.
   * @throws {Error} Si el método HTTP no es soportado.
   */
  fetch: async (url, method = "GET", body = null, headers = null) => {
    try {
      if (method === "GET") {
        set({ isLoading: true });
        const response = await axios.get(url, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else if (method === "POST") {
        const response = await axios.post(url, body, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else if (method === "PUT") {
        const response = await axios.put(url, body, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else if (method === "DELETE") {
        const response = await axios.delete(url, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else {
        set({ error: "Método HTTP no soportado", isLoading: false });
        return { data: null, error: "Método HTTP no soportado" };
      }
    } catch (err) {
      set({ error: err, isLoading: false });
      return { data: null, error: err };
    }
  },
}));

export default useAxiosStore;
