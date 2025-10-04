// src/services/api.ts
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../utils/auth";

const PUBLIC_ROUTES = ["/login", "/register"];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

let alertShown = false; // flag para evitar mensajes duplicados

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    if (PUBLIC_ROUTES.some((route) => config.url?.includes(route))) return config;

    const token = getToken();
    if (!token) {
      return Promise.reject({ message: "No autenticado", config });
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (
      (status === 401 || status === 403) &&
      !PUBLIC_ROUTES.some((route) => error.config.url?.includes(route))
    ) {
      if (!alertShown) {
        alertShown = true;

        await Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text:
            error.response?.data?.message ||
            "No tienes permisos para acceder a esta sección. Por favor inicia sesión.",
          confirmButtonText: "Ir a login",
        });

        // Redirigimos a login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
