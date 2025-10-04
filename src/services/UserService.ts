// src/services/UserService.ts
import api from "./api.ts";
import type { User } from "../models/User";

// Función auxiliar para obtener el token automáticamente
const getToken = () => localStorage.getItem("token");

// Obtener todos los usuarios (GET)
export const getUsers = async (): Promise<User[]> => {
  try {
    const token = getToken();
    const response = await api.get<User[]>("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return [];
  }
};

// Obtener usuario por ID (GET)
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const token = getToken();
    const response = await api.get<User>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo usuario con id ${id}:`, error);
    return null;
  }
};

// Crear usuario (POST)
export const createUser = async (user: Partial<User>): Promise<User | null> => {
  try {
    const token = getToken();
    const response = await api.post<User>("/users", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    return null;
  }
};

// Actualizar usuario por ID (PUT)
export const updateUser = async (id: string, user: Partial<User>): Promise<User | null> => {
  try {
    const token = getToken();
    const response = await api.put<User>(`/users/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error actualizando usuario con id ${id}:`, error);
    return null;
  }
};

// Eliminar usuario por ID (DELETE)
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const token = getToken();
    await api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    console.error(`Error eliminando usuario con id ${id}:`, error);
    return false;
  }
};
