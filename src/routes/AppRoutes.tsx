import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";
import F2A from "../pages/2FA";
import Home from "../pages/home";
import Register from "../pages/Register";
import UsersTable from "../pages/table/UserTable";
import RoleTable from "../pages/table/RoleTable";
import PermissionTable from "../pages/table/PermissionTable";
import UserRole from "../pages/match/UserRole";
import UsersForm from "../pages/form/UserForm";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/2FA" element={<F2A />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list-user" element={<UsersTable />} />
          <Route path="/list-role" element={<RoleTable />} />
          <Route path="/list-permission" element={<PermissionTable />} />
          <Route path="/user-action" element={<UsersForm />} />
          <Route path="/userRole-match" element={<UserRole />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
