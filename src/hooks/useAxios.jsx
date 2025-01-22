import axios from "axios";
import { create } from "zustand";

// Crear el store con Zustand
const useAxiosStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetch: async (url, method = "GET", body = null, headers = null) => {
    try {
      if (method === "GET") {
        const response = await axios.get(url, body, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else if (method === "POST") {
        console.log(headers);
        const response = await axios.post(url, body, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else if (method === "PUT") {
        const response = await axios.put(url, body, { headers });
        set({ data: response.data, isLoading: false });
        return { data: response.data, error: null };
      } else if (method === "DELETE") {
        const response = await axios.delete(url, body, { headers });
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
