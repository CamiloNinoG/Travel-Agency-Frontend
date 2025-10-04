// src/services/api.ts
import axios from "axios";
import { getToken } from "../utils/auth";

const PUBLIC_ROUTES = ["/login", "/register"];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de solicitud
api.interceptors.request.use((config) => {
  // Rutas públicas no necesitan token
  if (PUBLIC_ROUTES.some((route) => config.url?.includes(route))) return config;

  const token = getToken();
  if (!token) {
    // Opcional: redirige antes de hacer la petición
    window.location.href = "/login";
    return Promise.reject(new Error("No autenticado"));
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // Si es 401/403 y no es ruta pública
    if ((status === 401 || status === 403) && !PUBLIC_ROUTES.some((route) => error.config.url?.includes(route))) {
      alert(error.response?.data?.message || "No tienes acceso, inicia sesión");
      window.location.href = "/home"; // o "/login" si prefieres
    }
    return Promise.reject(error);
  }
);

export default api;
