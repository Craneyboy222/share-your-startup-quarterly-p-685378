import request from 'supertest';
import app from '../app';
import { mockUser } from '../test-utils/mocks';

describe('Authentication Integration Tests', () => {
  it('should register and authenticate a user', async () => {
    const registerResponse = await request(app).post('/api/register').send(mockUser);
    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app).post('/api/login').send({ email: mockUser.email, password: 'validPassword' });
    expect(loginResponse.body).toHaveProperty('token');
  });
});