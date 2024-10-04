export const getShareLink = async (collectionId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-share-link`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ collectionId })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        return data.link;
    } catch (error) {
        console.error('Error generating share link:', error);
        throw error;
    }
};
