#!/bin/bash

# Setup script for installing dependencies and initializing environment

# Install backend dependencies
cd backend || exit
npm install

# Navigate back to the root directory
cd ..

# Install frontend dependencies
cd frontend || exit
npm install

# Navigate back to the root directory
cd ..

# Set up environment variables
cp .env.example .env

# Initialize database
./scripts/migrate.sh
./scripts/seed.sh

# Setup complete
echo "Setup complete."
