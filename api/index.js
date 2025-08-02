import 'dotenv/config'; // Automatically loads .env for ESM (no dotenv.config() call needed)
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import chatRoute from './chat/routes.js';

const app = express();

// Robust CORS handling (prioritize env or frontend origin, fallback to '*')
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'https://tvast.github.io' || '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Secret-Key'],
}));

app.use(express.json());

// API Routes
app.use('/api/ask', chatRoute);

// Local Development Mode (Optional)
if (process.env.LOCAL === 'true') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Local API running at http://localhost:${PORT}`);
    });
}

// Export for Vercel Serverless Function
export const handler = serverless(app);