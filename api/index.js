import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './chat/routes.js';
import serverless from 'serverless-http';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://tvast.github.io',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Secret-Key'],
}));
app.use(express.json());

app.use('/api/ask', chatRoute);

// export handler for Vercel
export const handler = serverless(app);