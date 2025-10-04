// src/pages/user/UserForm.tsx
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../../models/User";
import { createUser, updateUser } from "../../services/UserService"; // Asegúrate de tener estos servicios
import Swal from "sweetalert2";
import FormComponent from "../../components/FormComponent";
import * as Yup from "yup";

const UserForm: React.FC = () => {
    const location = useLocation();
    const { data, proceso } = location.state || {};
    const navigate = useNavigate();

    const validationSchemaProps = () => {
        return Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string().email("Email inválido").required("El email es obligatorio"),
            password: Yup.string().when([], () => {
            return !data
                ? Yup.string().required("La contraseña es obligatoria") // creación
                : Yup.string().notRequired(); // actualización
            }),
        });
    };

    const handleAction = async (user: User) => {
        try {
            const result = data
                ? await updateUser(data._id, user)
                : await createUser(user);

            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: `Se ha ${data ? "actualizado" : "creado"} el usuario`,
                    icon: "success",
                    timer: 3000,
                });
                navigate("/list-user");
            } else {
                Swal.fire({
                    title: "Error",
                    text: `Existe un problema al ${proceso} el usuario`,
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Error al ${proceso} el usuario`,
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div>
            {data ? (
                <FormComponent
                    mode={2}
                    handleUpdate={handleAction}
                    initialValuesProps={{
                        name: data.name,
                        email: data.email,
                        password: "", // No mostramos la contraseña existente
                    }}
                    validetionSchemaProps={validationSchemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "email", text: "Email", type: "text" },
                        { for: "password", text: "Contraseña", type: "password" },
                    ]}
                />
            ) : (
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={{
                        name: "",
                        email: "",
                        password: "",
                    }}
                    validetionSchemaProps={validationSchemaProps}
                    labels={[
                        { for: "name", text: "Nombre", type: "text" },
                        { for: "email", text: "Email", type: "text" },
                        { for: "password", text: "Contraseña", type: "password" },
                    ]}
                />
            )}
        </div>
    );
};

export default UserForm;
