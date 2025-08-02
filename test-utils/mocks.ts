export const mockUser = {
  id: 1,
  username: 'mockuser',
  email: 'mockuser@example.com',
  password_hash: 'hashedpassword',
  role: 'user',
};

export const mockStartup = {
  id: 1,
  user_id: 1,
  name: 'Mock Startup',
  url: 'http://mockstartup.com',
  location: 'Mock City',
  stage: 'Seed',
  goals: 'Disrupt the market',
  discount: 10,
  created_at: new Date(),
};