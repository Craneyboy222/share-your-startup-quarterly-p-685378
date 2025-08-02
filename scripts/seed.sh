#!/bin/bash

# Database seeding script

# Seed the database with initial data using a Node.js script
cd backend || exit

cat <<EOF > seed.js
const { Client } = require('pg');
const client = new Client();

async function seedDatabase() {
  try {
    await client.connect();
    const query = `
      INSERT INTO Users (username, email, password_hash, role)
      VALUES
        ('admin', 'admin@example.com', 'hashed_password', 'admin'),
        ('user1', 'user1@example.com', 'hashed_password', 'user');

      INSERT INTO Startups (user_id, name, url, location, stage, goals, discount)
      VALUES
        (1, 'Startup One', 'http://startupone.com', 'New York', 'Seed', 'Disrupt Industry', '10%'),
        (2, 'Startup Two', 'http://startuptwo.com', 'San Francisco', 'Series A', 'Expand Market', '20%');
    `;
    await client.query(query);
    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding failed', err);
  } finally {
    await client.end();
  }
}

seedDatabase();
EOF

node seed.js
rm seed.js

# Navigate back to the root directory
cd ..

# Seeding complete
echo "Seeding complete."
