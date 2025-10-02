import axios from "axios";

const API_URL = "http://localhost:8081/api/public/security";
const API_URL_USERS = "http://localhost:8081/api/users";
const API_URL_SESSIONS = "http://localhost:8081/api/sessions";

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });
    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL_USERS}`, {
            name,
            email,
            password,
        });
        return { success: true, data: response.data };
    } catch (err: any) {
        if (err.response) {
            return { success: false, message: err.response.data };
        }
        throw err;
    }
};

export const verify2FA = async (sessionId: string, code: string) => {
    const response = await axios.post(`${API_URL}/verify-2fa`, {
        sessionId,
        code,
    });
    return response.data;
};

export const resend2FA = async (sessionId: string) => {
    const response = await axios.post(`${API_URL_SESSIONS}/${sessionId}/resend-code`);
    return response.data;
};

