import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";

// Crear el store con Zustand
const useStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

const useAxios = (url, method = "GET", body = null) => {
  const { data, isLoading, error, setData, setIsLoading, setError } =
    useStore();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          method,
          url,
          data: body,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, setData, setIsLoading, setError]);

  return { data, isLoading, error };
};

export const useAxiosGet = (url) => useAxios(url, "GET");
export const useAxiosPost = (url, body) => useAxios(url, "POST", body);
export const useAxiosPut = (url, body) => useAxios(url, "PUT", body);
export const useAxiosDelete = (url) => useAxios(url, "DELETE");

export default useAxios;
