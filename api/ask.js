export default async function handler(req, res) {
    // 1. CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://tvast.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Secret-Key');

    // 2. Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Optional: check secret
    const secret = req.headers['x-secret-key'] || req.body.secret;
    if (secret !== process.env.MY_SECRET_TRIGGER_KEY) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }

    // 4. Read prompt
    const {
        prompt
    } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({
            error: 'Missing API key'
        });
    }

    try {
        // 5. Call OpenRouter API
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

        // 6. Return response
        const data = await openRouterRes.json();
        if (!openRouterRes.ok) {
            return res.status(openRouterRes.status).json(data);
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}