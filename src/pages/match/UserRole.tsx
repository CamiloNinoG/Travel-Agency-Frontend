// src/pages/UserRolePage.tsx
import { useState, useEffect } from "react";
import DualSelect from "../../components/DualSelect";
import { getUsers } from "../../services/UserService";
import { getRoles } from "../../services/RoleService";
import { createUserRole, getUserRoles, deleteUserRole } from "../../services/UserRoleService";
import Swal from "sweetalert2";

export default function UserRolePage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);

  // Cargar usuarios, roles y relaciones
  useEffect(() => {
    async function fetchData() {
      setUsers(await getUsers());
      setRoles(await getRoles());
    //   setUserRoles(await getUserRoles());
    }
    fetchData();
  }, []);

  // Asignar rol a usuario
  const handleAssign = async (userId: string, roleId: string) => {
    const result = await createUserRole(userId, roleId);
    if (result) {
      Swal.fire("Listo", "Rol asignado correctamente", "success");
    //   setUserRoles(await getUserRoles());
    } else {
      Swal.fire("Error", "No se pudo asignar el rol", "error");
    }
  };

  // Eliminar relación
  const handleDelete = async (id: string) => {
    const confirmed = await Swal.fire({
      title: "Eliminar",
      text: "¿Deseas eliminar esta asignación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirmed.isConfirmed) {
      await deleteUserRole(id);
    //   setUserRoles(await getUserRoles());
      Swal.fire("Eliminado", "Asignación eliminada", "success");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Asignación de Roles a Usuarios</h1>

      {/* DualSelect */}
      <DualSelect
        leftItems={users}
        rightItems={roles}
        leftLabelKey="name"
        leftValueKey="_id"
        rightLabelKey="name"
        rightValueKey="_id"
        leftTitle="Usuario"
        rightTitle="Rol"
        onAssign={handleAssign}
        buttonLabel="Asignar Rol"
      />

      </div>

  );
}
