/* Configuration */

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
    databaseUrl: process.env.DATABASE_URL || 'postgres://localhost:5432/mydb',
    sendGridApiKey: process.env.SENDGRID_API_KEY || 'SG.xxxxxx',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'UA-XXXXX-Y',
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    awsBucket: process.env.AWS_BUCKET || 'my-bucket',
};

export function validateConfig(): void {
    Object.entries(config).forEach(([key, value]) => {
        if (!value) {
            console.warn(`Warning: ${key} is not set`);
        }
    });
}
validateConfig();