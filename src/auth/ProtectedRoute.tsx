import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/auth";

const ProtectedRoute = () => {
  const token = getToken();

  if (!token) return <Navigate to="/login" replace />; // ❌ No hay token → no monta nada

  return <Outlet />; // ✅ Solo monta componentes si hay token
};

export default ProtectedRoute;
