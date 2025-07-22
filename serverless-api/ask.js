export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Only POST method is allowed'
        });
    }

    const {
        prompt
    } = req.body;

    if (!prompt) {
        return res.status(400).json({
            error: 'Prompt is required'
        });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(401).json({
            error: 'No auth credentials found'
        });
    }

    try {
        const openrouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://yourdomain.com', // adjust for production
                'X-Title': 'my-ai-terminal',
            },
            body: JSON.stringify({
                model: 'google/gemma-3-27b-it:free',
                max_tokens: 512,
                messages: [{
                    role: 'user',
                    content: prompt
                }],
            }),
        });

        const result = await openrouterResponse.json();
        if (!openrouterResponse.ok) {
            return res.status(openrouterResponse.status).json({
                error: result.error || 'OpenRouter API failed'
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Serverless API error:', error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}