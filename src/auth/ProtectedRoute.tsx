import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/auth";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // null = verificando

  useEffect(() => {
    const token = getToken();
    setIsAuth(!!token);
  }, []);

  // Mientras verificamos, no renderizamos nada
  if (isAuth === null) return null;

  // Redirige si no hay token
  if (!isAuth) return <Navigate to="/login" replace />;

  // Usuario autenticado, renderizamos hijos
  return <Outlet />;
};

export default ProtectedRoute;
