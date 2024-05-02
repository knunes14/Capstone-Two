import api from './services/api';  

describe('fetchRecommendations', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should fetch recommendations successfully', async () => {
        const mockRecommendations = [{ id: 1, name: 'Wetsuit A' }, { id: 2, name: 'Wetsuit B' }];
        fetch.mockResponseOnce(JSON.stringify(mockRecommendations));

        const formData = { categories: 'men', height: 72, weight: 180, style: 'Fullsuit', material: 'Neoprene' };
        const result = await api.fetchRecommendations(formData);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/server/wetsuits/recommend-wetsuits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        expect(result).toEqual(mockRecommendations);
    });

    it('should handle network failure', async () => {
        fetch.mockReject(new Error('Network failure'));

        const formData = { categories: 'women', height: 65, weight: 140, style: 'Springsuit', material: 'Geoprene' };
        const result = await api.fetchRecommendations(formData);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });

    it('should handle non-ok responses gracefully', async () => {
        fetch.mockResponseOnce('Not found', { status: 404 });

        const formData = { categories: 'women', height: 65, weight: 140, style: 'Springsuit', material: 'Geoprene' };
        const result = await api.fetchRecommendations(formData);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});
