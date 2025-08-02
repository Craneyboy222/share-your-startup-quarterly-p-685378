import request from 'supertest';
import app from '../app';
import { mockUser, updatedUserProfile } from '../test-utils/mocks';

describe('User Integration Tests', () => {
  it('should get and update user profile', async () => {
    const getResponse = await request(app).get(`/api/users/${mockUser.id}`);
    expect(getResponse.body).toMatchObject({ username: mockUser.username });

    const updateResponse = await request(app).put(`/api/users/${mockUser.id}`).send(updatedUserProfile);
    expect(updateResponse.body).toMatchObject(updatedUserProfile);
  });
});