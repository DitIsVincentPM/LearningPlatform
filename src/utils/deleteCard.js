import axios from 'axios';

export const deleteCard = async (cardId) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        if (!cardId) {
            throw new Error("Card ID is required for deletion.");
        }

        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/deleteCard/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Return the response from the server
    } catch (error) {
        console.error("Error deleting card:", error);
        throw error;
    }
};
