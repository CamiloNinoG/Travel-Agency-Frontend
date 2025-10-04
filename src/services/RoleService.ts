// src/services/RoleService.ts
import api from "./api"; // tu instancia axios
import type { Role } from "../models/Role";

export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await api.get<Role[]>("/roles");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo roles:", error);
    return [];
  }
};

export const createRole = async (role: Partial<Role>): Promise<Role | null> => {
  try {
    const response = await api.post<Role>("/roles", role);
    return response.data;
  } catch (error) {
    console.error("Error creando rol:", error);
    return null;
  }
};

export const updateRole = async (_id: string, role: Partial<Role>): Promise<Role | null> => {
  try {
    const response = await api.put<Role>(`/roles/${_id}`, role);
    return response.data;
  } catch (error) {
    console.error("Error actualizando rol:", error);
    return null;
  }
};

export const deleteRole = async (_id: string): Promise<boolean> => {
  try {
    await api.delete(`/roles/${_id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando rol:", error);
    return false;
  }
};
