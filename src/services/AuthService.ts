import axios from "axios";

const API_URL = "http://localhost:8081/api/public/security";

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });
    return response.data;
};
