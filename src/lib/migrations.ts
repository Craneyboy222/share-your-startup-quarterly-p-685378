export const migrationScripts = [
  {
    name: 'create_users_table',
    up: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL
    );`,
    down: `DROP TABLE IF EXISTS users;`
  },
  {
    name: 'create_startups_table',
    up: `CREATE TABLE IF NOT EXISTS startups (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      name VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      stage VARCHAR(50),
      goals TEXT,
      discount VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    down: `DROP TABLE IF EXISTS startups;`
  }
];