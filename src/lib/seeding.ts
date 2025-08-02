import { seedDatabase } from '../utils/seeding';

const userSeedSQL = `INSERT INTO Users (username, email, password_hash, role) VALUES ('admin', 'admin@example.com', 'hashed_password', 'admin');`;
const startupSeedSQL = `INSERT INTO Startups (user_id, name, url, location, stage, goals, discount, created_at) VALUES (1, 'Startup 1', 'https://startup1.com', 'NY, USA', 'Seed', 'Expand market', 'DISCOUNT1', NOW());`;

export const seed = async () => {
  await seedDatabase(userSeedSQL);
  await seedDatabase(startupSeedSQL);
};