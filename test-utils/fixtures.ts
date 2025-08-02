import { Users } from '../models';

export const createTestUser = async () => {
  return await Users.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password_hash: 'hashedpassword',
    role: 'user'
  });
};

export const createTestStartup = async (userId: number) => {
  return await Startups.create({
    user_id: userId,
    name: 'Test Startup',
    url: 'http://teststartup.com',
    location: 'San Francisco',
    stage: 'growth',
    goals: 'Expand globally',
    discount: '10% off',
    created_at: new Date()
  });
};