import request from 'supertest';
import app from '../app';

describe('Movies API', () => {
    it('should return movies sorted by popularity', async () => {
        const response = await request(app).get('/api/movies?year=2020&page=1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('popularity');
    });

    it('should return 400 if year is invalid', async () => {
        const response = await request(app).get('/api/movies?year=abcd&page=1');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Year is required and must be a valid number.' });
    });
});
