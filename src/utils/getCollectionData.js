import axios from 'axios'; // Using Axios for HTTP requests

export const getCollectionData = async (collectionId) => {
    try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getCollectionData`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { collectionId } // Pass collectionId as a query parameter
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching card collections:", error);
        return [];
    }
};
