#!/bin/bash

# Build script

# Build frontend assets
cd frontend || exit
npm run build

# Navigate back to the root directory
cd ..

# Build complete
echo "Build complete."
