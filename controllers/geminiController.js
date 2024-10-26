import { generatePromptFromGemini } from '../services/geminiService.js';
import { logAIResponse } from '../middleware/logger.js';

// Function to validate and generate the prompt
async function generatePrompt(req, res, generateFunction) {
    let { prompt, tokens } = req.body; // Get the prompt from the request body

    // Validate the prompt
    if (!prompt) {
        return res.status(400).json({ error: 'PROMPT is required' });
    }

    // Validate tokens
    if (!tokens || isNaN(tokens) || tokens <= 0) {
        tokens = 100; // Default value if tokens are not provided or invalid
    }

    try {
        // Call the generation function with the prompt
        const ret = await generateFunction(prompt, tokens);
        // Log the AI response
        try {
            await logAIResponse(ret);
        } catch (logError) {
            console.error('Error logging AI response:', logError);
        }
        // Return the generated prompt
        res.json(ret);
    } catch (error) {
        // Log the error and return a 500 error
        console.error('Error generating prompt:', error);
        res.status(500).json({ error: 'An error occurred while generating the prompt' });
    }
}



// Function to generate prompt using GEMINI
async function generatePromptGemini(req, res) {
    await generatePrompt(req, res, generatePromptFromGemini);
}

export { generatePromptGemini };