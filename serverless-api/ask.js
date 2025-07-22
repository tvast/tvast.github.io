export default async function handler(req, res) {
    // ✅ Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://tvast.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ✅ Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const {
        prompt
    } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({
            error: 'Missing API key'
        });
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
                messages: [{
                    role: 'user',
                    content: prompt
                }],
            }),
        });

        const data = await openRouterRes.json();
        if (!openRouterRes.ok) return res.status(openRouterRes.status).json(data);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}