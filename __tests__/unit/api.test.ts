import request from 'supertest';
import app from '../app';

describe('API Unit Tests', () => {
  it('should fetch all startups', async () => {
    const response = await request(app).get('/api/startups');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should submit a new startup', async () => {
    const startupData = { name: 'New Startup', url: 'https://newstartup.com' };
    const response = await request(app).post('/api/startups').send(startupData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});