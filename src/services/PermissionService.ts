import api from "./api"; // tu instancia de Axios
import type { Permission } from "../models/Permission";

export const getPermissions = async (): Promise<Permission[]> => {
  try {
    const response = await api.get<Permission[]>("/permissions");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo permisos:", error);
    return [];
  }
};

export const getPermissionById = async (id: string): Promise<Permission | null> => {
  try {
    const response = await api.get<Permission>(`/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo permiso:", error);
    return null;
  }
};

export const createPermission = async (permission: Partial<Permission>): Promise<Permission | null> => {
  try {
    const response = await api.post<Permission>("/permissions", permission);
    return response.data;
  } catch (error) {
    console.error("Error creando permiso:", error);
    return null;
  }
};

export const updatePermission = async (id: string, permission: Partial<Permission>): Promise<Permission | null> => {
  try {
    const response = await api.put<Permission>(`/permissions/${id}`, permission);
    return response.data;
  } catch (error) {
    console.error("Error actualizando permiso:", error);
    return null;
  }
};

export const deletePermission = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/permissions/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando permiso:", error);
    return false;
  }
};
