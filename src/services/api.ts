// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // tu backend base
});

// Interceptor para añadir token automáticamente a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor global para manejar errores de respuesta
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      // Mostrar mensaje y redirigir
      alert(error.response.data?.message || "No tienes permisos para acceder");
      window.location.href = "/home"; // redirige al home
    }
    return Promise.reject(error); // siempre rechazar para no romper promesas
  }
);

export default api;
