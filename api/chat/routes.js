import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
    const secret = req.headers['x-secret-key'] || req.body.secret;
    if (secret !== process.env.MY_SECRET_TRIGGER_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { prompt } = req.body;
    if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({ error: 'Missing API key' });
    }

    try {
        const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'google/gemma-3-27b-it:free',
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        const data = await openRouterRes.json();
        if (!openRouterRes.ok) {
            return res.status(openRouterRes.status).json(data);
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        });
    }
});

export default router;