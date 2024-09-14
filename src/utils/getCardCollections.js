// utils/getCardCollections.js
import axios from 'axios'; // Using Axios for HTTP requests

export const getCardCollections = async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await axios.get('http://localhost:8080/api/getCardCollections', {
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
