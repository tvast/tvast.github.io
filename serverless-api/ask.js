export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    const {
        prompt
    } = req.body;

    if (!prompt) {
        return res.status(400).json({
            error: 'Missing prompt'
        });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: 'No auth credentials found'
        });
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://tvast-github-io.vercel.app',
                'X-Title': 'my-ai-terminal',
            },
            body: JSON.stringify({
                model: 'google/gemma-3-27b-it:free',
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                max_tokens: 1024,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error || 'Unknown error'
            });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            error: 'Server Error: ' + err.message
        });
    }
}