#!/bin/bash

# Test script

# Run backend tests
cd backend || exit
npm test || { echo 'Backend tests failed'; exit 1; }

# Navigate back to the root directory
cd ..

# Run frontend tests
cd frontend || exit
npm test || { echo 'Frontend tests failed'; exit 1; }

# Navigate back to the root directory
cd ..

# Tests complete
echo "All tests passed."
