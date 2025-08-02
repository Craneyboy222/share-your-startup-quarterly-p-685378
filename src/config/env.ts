import dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/startup_platform';
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'your-sendgrid-api-key';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'your-aws-access-key-id';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'your-aws-secret-access-key';