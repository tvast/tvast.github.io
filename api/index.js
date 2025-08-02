import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './chat/routes.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// Dynamic CORS Origin handling
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://tvast.github.io',
            'http://localhost:5173', // Local Dev
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Secret-Key'],
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.options('*', cors());  // Preflight OPTIONS requests

app.use('/api/ask', chatRoute);

// Export for Vercel Serverless Function
export const handler = serverless(app);