// utils/getUserData.js
import axios from 'axios';

export const getUserData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getUserData`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data; // Return the entire response data
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Rethrow error to handle it in the component
    }
};

