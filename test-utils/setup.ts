import { connectDatabase, disconnectDatabase } from './helpers';

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});