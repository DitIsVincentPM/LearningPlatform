import axios from 'axios';

export const addCards = async (collectionId, cards) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        // Validate card data before making the request
        const validatedCards = cards.filter(card => card.name && card.description);
        if (validatedCards.length === 0) {
            throw new Error("No valid cards to insert.");
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/addCards`, {
            collectionId,
            cards: validatedCards // Use validated cards
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding cards to collection:", error);
        throw error;
    }
};
