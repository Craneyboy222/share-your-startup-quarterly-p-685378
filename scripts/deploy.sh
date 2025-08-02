#!/bin/bash

# Deployment script

# Login to AWS
aws configure

# Build the frontend
cd frontend || exit
npm run build

# Sync build files to S3
aws s3 sync build/ s3://your-s3-bucket-name

# Navigate back to the root directory
cd ..

# Deploy backend
cd backend || exit
zip -r backend.zip .

# Upload to AWS Lambda
aws lambda update-function-code --function-name YourLambdaFunctionName --zip-file fileb://backend.zip

# Clean up
rm backend.zip

# Deployment complete
echo "Deployment complete."
