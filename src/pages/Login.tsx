import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      if (data.status === "pending-2fa") {
        localStorage.setItem("sessionId", data.sessionId);
        navigate("/2fa");
      } else {
        setError("Error inesperado en login");
      }
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };


  return (
      <div className="h-screen flex">
        {/* Video */}
        <div className="w-1/2 hidden md:block relative">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="../../public/videos/login-airplane.mp4" type="video/mp4" />
            
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Inicio de Sesión</h2>

            {/* Formulario */}
            <form className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Ingrese su email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password} 
                  onChange={(e)=> setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 text-sky-500" />
                  <span>Recordar credenciales</span>
                </label>
                <a href="#" className="text-sky-500 hover:underline">
                  Olvidaste tu contraseña?
                </a>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600"
              >
                Ingresar
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1" />
              <span className="px-2 text-gray-400">or</span>
              <hr className="flex-1" />
            </div>

            {/* Botones sociales */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Ingresar con Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50">
                <img
                  src="https://www.svgrepo.com/show/452062/microsoft.svg"
                  alt="Microsoft"
                  className="w-5 h-5"
                />
                Ingresar con Microsoft
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:opacity-90">
                <img
                  src="https://www.svgrepo.com/show/391458/github.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                Ingresar con GitHub
              </button>

              <p className="text-center text-sm mt-6">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-sky-500 hover:underline">
                Registrate
              </a>
            </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;
