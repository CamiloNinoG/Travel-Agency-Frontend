import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login.tsx";
import F2A from "../pages/2FA.tsx";
import Home from "../pages/home.tsx";
import Register from "../pages/Register.tsx";
import UsersTable from "../pages/table/UserTable.tsx";
import UsersForm from "../pages/form/UserForm.tsx";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/2FA" element={<F2A />} />
        <Route path="/list-user" element={<UsersTable />} />
        <Route path="/2FA" element={<F2A />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-action" element={<UsersForm />} />
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
