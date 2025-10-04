// src/services/UserRoleService.ts
import api from "./api";
import type { UserRole } from "../models/UserRole";

// Listar todos los UserRoles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await api.get<UserRole[]>("/user-role");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo userRoles:", error);
    return [];
  }
};

// Obtener UserRole por id
export const getUserRoleById = async (id: string): Promise<UserRole | null> => {
  try {
    const response = await api.get<UserRole>(`/user-role/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo userRole:", error);
    return null;
  }
};

// Roles de un usuario
export const getRolesByUser = async (userId: string): Promise<UserRole[]> => {
  try {
    const response = await api.get<UserRole[]>(`/user-role/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo roles del usuario:", error);
    return [];
  }
};

// Usuarios de un rol
export const getUsersByRole = async (roleId: string): Promise<UserRole[]> => {
  try {
    const response = await api.get<UserRole[]>(`/user-role/role/${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios del rol:", error);
    return [];
  }
};

// Crear UserRole
export const createUserRole = async (userId: string, roleId: string): Promise<UserRole | null> => {
  try {
    const response = await api.post<UserRole>(`/user-role/user/${userId}/role/${roleId}`);
    return response.data;
  } catch (error) {
    console.error("Error creando userRole:", error);
    return null;
  }
};

// Eliminar UserRole
export const deleteUserRole = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/user-role/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando userRole:", error);
    return false;
  }
};
