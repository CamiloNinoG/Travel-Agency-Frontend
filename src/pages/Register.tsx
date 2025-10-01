import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/AuthService";

function Register() {
const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const data = await register(name, email, password);

        if (data.success) {
            navigate("/login");
        } else {
            setError(data.message || "Error al registrarse");
        }
    } catch (err: any) {
        if (err.response && err.response.status === 400) {
            setError(err.response.data);
        } else {
            setError("No se pudo completar el registro");
        }
    }
};

return (
    <div className="h-screen flex">
    {/* Lado izquierdo (formulario) */}
    <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
            Registro de Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
            </label>
            <input
                type="text"
                placeholder="Ingrese su nombre"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
            </label>
            <input
                type="email"
                placeholder="Ingrese su email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            </div>

            {/* Contraseña con toggle */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
                </label>
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? (
                    // 👁️ abierto
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" fill="none" 
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    ) : (
                    // 👁️ tachado
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" fill="none" 
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.195-3.52m2.963-2.36A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.203 5.24M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 3l18 18" />
                    </svg>
                    )}
                </button>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600"
            >
            Registrarse
            </button>
        </form>

        <p className="text-center text-sm mt-6">
            ¿Ya tienes cuenta?{" "}
            <a
            href="/login"
            className="text-sky-500 hover:underline"
            >
            Inicia sesión
            </a>
        </p>
        </div>
    </div>

    {/* Video a la derecha */}
    <div className="w-1/2 hidden md:block relative">
        <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        >
        <source src="../../public/videos/register-airport.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
    </div>
    </div>
);
}

export default Register;
