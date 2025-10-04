// src/pages/Table/RoleTable.tsx
import React, { useEffect, useState } from "react"; 
import DataTable from "../../components/DataTable"; 
import { getRoles, deleteRole } from "../../services/RoleService";
import type { Role } from "../../models/Role";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RolesTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  const columns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
  ];

  const handleAccion = async (accion: string, role: Role) => {
    if (accion === "editar") {
      navigate("/role-action", {
        state: {
          data: role,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteRole(role._id!);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el rol correctamente`,
          icon: "success",
          timer: 3000,
        });
        setRoles((prev) => prev.filter((r) => r._id !== role._id));
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el rol`,
          icon: "error",
          timer: 3000,
        });
      }
    }
  };

  const actions = (row: Role) => (
    <div className="flex gap-2">
      <button onClick={() => handleAccion("editar", row)} className="text-blue-500 hover:text-blue-700">
        <FiEdit2 />
      </button>
      <button onClick={() => handleAccion("eliminar", row)} className="text-red-500 hover:text-red-700">
        <FiTrash2 />
      </button>
    </div>
  );

  return (
    <DataTable
      title="Roles"
      columns={columns}
      data={roles}
      actions={actions}
      createPath="/role-action"
    />
  );
};

export default RolesTable;
