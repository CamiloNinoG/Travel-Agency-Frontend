import { useState, useEffect, useRef } from "react";
import { CheckCircle, Mail, RefreshCw, AlertCircle } from "lucide-react";

type AuthState = "initial" | "verifying" | "success" | "error";

export default function TwoFactorAuth() {
const [code, setCode] = useState(Array(6).fill(""));
const [authState, setAuthState] = useState<AuthState>("initial");
const [countdown, setCountdown] = useState(0);
const [attempts, setAttempts] = useState(0);
const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

useEffect(() => {
    if (countdown > 0) {
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
    }
}, [countdown]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    if (val && index < 5) {
    inputsRef.current[index + 1]?.focus();
    }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
    inputsRef.current[index - 1]?.focus();
    }
};

const simulateVerification = async () => {
    setAuthState("verifying");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const inputCode = code.join("");
    if (inputCode === "123456") {
    setAuthState("success");
    alert("✅ ¡Verificación exitosa!");
    } else {
    setAuthState("error");
    setAttempts((prev) => prev + 1);
    setCode(Array(6).fill(""));
    inputsRef.current[0]?.focus();
    alert("❌ Código incorrecto");
    }
};

const handleResend = () => {
    setCode(Array(6).fill(""));
    setAuthState("initial");
    setAttempts(0);
    setCountdown(60);
    inputsRef.current[0]?.focus();
    alert("📩 Código reenviado a tu correo");
};

const getStateIcon = () => {
    switch (authState) {
    case "verifying":
        return <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />;
    case "success":
        return <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />;
    case "error":
        return <AlertCircle className="h-6 w-6 text-red-500 animate-shake" />;
    default:
        return <Mail className="h-6 w-6 text-blue-500" />;
    }
};

const getStateMessage = () => {
    switch (authState) {
    case "verifying":
        return "Verificando código...";
    case "success":
        return "¡Autenticación exitosa!";
    case "error":
        return "Código incorrecto, intenta nuevamente";
    default:
        return "Hemos enviado un código de 6 dígitos a tu correo";
    }
};

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
        <div className="text-center pb-4">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            {getStateIcon()}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
            Verificación en dos pasos
        </h2>
        </div>


        <p
        className={`text-center text-sm mb-6 transition-colors duration-300 ${
            authState === "error"
            ? "text-red-500"
            : authState === "success"
            ? "text-green-500"
            : "text-gray-500"
        }`}
        >
        {getStateMessage()}
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center space-x-3 my-6">
        {code.map((digit, i) => (
            <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            maxLength={1}
            value={digit}
            disabled={authState === "verifying" || authState === "success"}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-12 h-14 text-center border-2 rounded-xl text-lg font-semibold 
                focus:outline-none transition-all duration-200
                ${
                authState === "error"
                    ? "border-red-500 animate-shake"
                    : authState === "success"
                    ? "border-green-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
            />
        ))}
        </div>

        {/* Verify button */}
        <button
        onClick={simulateVerification}
        disabled={
            code.join("").length !== 6 ||
            authState === "verifying" ||
            authState === "success"
        }
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 
                    text-white font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
        {authState === "verifying" ? "Verificando..." : "Verificar código"}
        </button>

        {/* Resend */}
        <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-500">¿No recibiste el código?</p>
        <button
            onClick={handleResend}
            disabled={
            countdown > 0 || authState === "verifying" || authState === "success"
            }
            className="w-full py-2 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50"
        >
            {countdown > 0 ? `Reenviar en ${countdown}s` : "Reenviar código"}
        </button>

        {attempts > 0 && attempts < 3 && (
            <div className="text-center text-xs text-gray-500">
            Intentos: {attempts}/3
            </div>
        )}
        </div>
    </div>
    </div>
);
}
