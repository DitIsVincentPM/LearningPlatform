// utils/toggleCardStatus.js
import axios from 'axios';

export const toggleCardStatus = async (cardId, disabled) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/toggleCardStatus`,
            {
                cardId,
                disabled // Boolean value: true (disable), false (enable)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error toggling card status:", error);
        throw error;
    }
};
