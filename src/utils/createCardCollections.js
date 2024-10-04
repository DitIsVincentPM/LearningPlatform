import axios from 'axios'; // Using Axios for HTTP requests
import dotenv from 'dotenv';

export const createCardCollection = async (collectionName) => {
    try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage

        if (!collectionName || collectionName.trim() === '') {
            throw new Error('Collection name is required');
        }

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/createCardCollection`,
            { name: collectionName }, // Sending collection name as the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token for authorization
                    'Content-Type': 'application/json' // Ensure JSON is sent in the request
                }
            }
        );

        return response.data; // Assuming the API returns the created collection's data
    } catch (error) {
        console.error("Error creating card collection:", error);
        return null; // Return null or handle error as needed in your app
    }
};
