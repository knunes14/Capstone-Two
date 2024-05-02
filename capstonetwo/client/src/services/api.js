async function fetchRecommendations(formData) {
    try {
        const response = await fetch('http://localhost:3000/server/wetsuits/recommend-wetsuits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const data = await response.json();
            console.log("API response:", data);
            return data; // This should be the array of recommended wetsuits
        }
        throw new Error('Failed to fetch recommendations');
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

export default {
    fetchRecommendations,
};
