import axios from 'axios';

export const editCard = async (cardId, updatedData) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        // Validate updated data
        if (!cardId || !updatedData || !updatedData.frontText || !updatedData.backText) {
            throw new Error("Card ID and valid front/back text are required for editing.");
        }

        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/editCard/${cardId}`, {
            frontText: updatedData.frontText,
            backText: updatedData.backText
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Return the response from the server
    } catch (error) {
        console.error("Error editing card:", error);
        throw error;
    }
};
