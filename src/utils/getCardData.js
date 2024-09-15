// utils/getCardCollections.js
import axios from 'axios'; // Using Axios for HTTP requests

export const getCardData = async (cardId) => {
    try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await axios.get('http://localhost:8080/api/getCardData', {
            headers: {
                Authorization: `Bearer ${token}`,
                'card-id': cardId // Pass card ID as a custom header
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching card collections:", error);
        return [];
    }
};
