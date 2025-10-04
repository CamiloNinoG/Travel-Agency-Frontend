// src/pages/Table/userTable.tsx 
import React, { useEffect, useState } from "react"; 
import DataTable from "../../components/DataTable"; 
import { getUsers, deleteUser } from "../../services/UserService";
import type { User } from "../../models/User";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const columns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
  ];

  const handleAccion = async (accion: string, user: User) => {
    if (accion === "editar") {
      navigate("/user-action", {
        state: {
          data: user,
          proceso: "editar",
        },
      });
    } else if (accion === "eliminar") {
      const response = await deleteUser(user._id);
      if (response) {
        Swal.fire({
          title: "Completado",
          text: `Se ha eliminado el usuario correctamente`,
          icon: "success",
          timer: 3000,
        });
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al eliminar el usuario`,
          icon: "error",
          timer: 3000,
        });
      }
    }
  };

  const actions = (row: User) => (
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
      title="Usuarios"
      columns={columns}
      data={users}
      actions={actions}
      createPath="/user-action"
    />
  );
};

export default UsersTable;