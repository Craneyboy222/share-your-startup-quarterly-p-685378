import cors from 'cors';

export const corsOptions = {
    origin: ['https://yourdomain.com', 'https://anotherdomain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

export const corsMiddleware = cors(corsOptions);