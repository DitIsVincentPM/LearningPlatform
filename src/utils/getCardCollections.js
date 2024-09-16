// utils/getCardCollections.js
import axios from 'axios'; // Using Axios for HTTP requests
import dotenv from 'dotenv';

export const getCardCollections = async () => {
    try {

        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getCardCollections`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.cardCollections;
    } catch (error) {
        console.error("Error fetching card collections:", error);
        return [];
    }
};
