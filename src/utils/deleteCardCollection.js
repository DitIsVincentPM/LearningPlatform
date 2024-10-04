// utils/deleteCardCollection.js
import axios from 'axios';

export const deleteCardCollection = async (collectionId) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/deleteCollection/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting card collection:", error);
        throw error; // Rethrow the error so it can be handled by the calling function
    }
};
