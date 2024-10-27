export function validatePromptAndTokens(req, res) {
    let { prompt, tokens } = req.body;
    // Validate the prompt
    if (!prompt) {
        return { error: res.status(400).json({ error: 'PROMPT is required' }) };
    }
    // Validate tokens
    if (!tokens || isNaN(tokens) || tokens <= 0) {
        tokens = Number(process.env.MAX_TOKENS); // Default value if tokens are not provided or invalid
    }
    return { prompt, tokens }; // Return validated values
}
export function validateUrlAndModel(req, res) {
    let { url, model, tokens } = req.body;
    // Validate the url
    if (!url) {
        return { error: res.status(400).json({ error: 'URL is required' }) };
    }
    // Validate model
    if (!model) {
        return { error: res.status(400).json({ error: 'MODEL is required' }) };
    }

    // Validate tokens
    if (!tokens || isNaN(tokens) || tokens <= 0) {
        tokens = Number(process.env.MAX_TOKENS); // Default value if tokens are not provided or invalid
    }
    return { url, model, tokens };
}