import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './routes/chat.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://tvast.github.io',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Secret-Key'],
}));
app.use(express.json());

app.use('/api/ask', chatRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});