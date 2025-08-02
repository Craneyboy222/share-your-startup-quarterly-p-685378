#!/bin/bash

# Database migration script

# Run migrations using a Node.js script
cd backend || exit

cat <<EOF > migrate.js
const { Client } = require('pg');
const client = new Client();

async function runMigrations() {
  try {
    await client.connect();
    const query = `
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Startups (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255),
        location VARCHAR(255),
        stage VARCHAR(50),
        goals TEXT,
        discount VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS Comments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        startup_id INTEGER REFERENCES Startups(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS Votes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        startup_id INTEGER REFERENCES Startups(id),
        vote_type SMALLINT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        type VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS Discounts (
        id SERIAL PRIMARY KEY,
        startup_id INTEGER REFERENCES Startups(id),
        code VARCHAR(50) NOT NULL,
        description TEXT,
        expiry_date DATE
      );
    `;
    await client.query(query);
    console.log('Migrations run successfully');
  } catch (err) {
    console.error('Migration failed', err);
  } finally {
    await client.end();
  }
}

runMigrations();
EOF

node migrate.js
rm migrate.js

# Navigate back to the root directory
cd ..

# Migration complete
echo "Migration complete."
