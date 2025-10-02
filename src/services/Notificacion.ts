import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1/send-email";

export const sendNotification = async (to: string, subject: string, body: string) => {
    const response = await axios.post(API_URL, {
        to,
        subject,
        body,
    });
    return response.data;
}