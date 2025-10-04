// src/pages/Table/PermissionTable.tsx
import React, { useEffect, useState } from "react"; 
import DataTable from "../../components/DataTable"; 
import { getPermissions, deletePermission } from "../../services/PermissionService";
import type { Permission } from "../../models/Permission";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PermissionsTable: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissions = async () => {
      const data = await getPermissions();
      setPermissions(data);
    };
    fetchPermissions();
  }, []);

  const columns = [
    { key: "_id", label: "ID" },
    { key: "url", label: "URL" },
    { key: "method", label: "Método" },
  ];

  const handleAccion = async (accion: string, permission: Permission) => {
    if (accion === "editar") {
      navigate("/permission-action", {
        state: {
          data: permission,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deletePermission(permission._id!);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el permiso correctamente`,
          icon: "success",
          timer: 3000,
        });
        setPermissions((prev) => prev.filter((p) => p._id !== permission._id));
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el permiso`,
          icon: "error",
          timer: 3000,
        });
      }
    }
  };

  const actions = (row: Permission) => (
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
      title="Permisos"
      columns={columns}
      data={permissions}
      actions={actions}
      createPath="/permission-action"
    />
  );
};

export default PermissionsTable;
