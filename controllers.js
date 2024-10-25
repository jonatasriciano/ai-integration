import { generatePromptFromGpt } from './service/gptService.js';
import { generatePromptFromGemini } from './service/geminiService.js';
import { logAIResponse } from './middleware/logger.js';

// Function to generate prompt using GPT
async function generatePromptGpt(req, res) {
    let { prompt, tokens } = req.body; // Get prompt from request body

    // Validate prompt
    if (!prompt) {
        return res.status(400).json({ error: 'PROMPT is required' });
    }

    try {
        // Call generatePromptFromGpt with prompt
        const ret = await generatePromptFromGpt(prompt, tokens);
        // Log AI response
        await logAIResponse(ret);
        // Return generated prompt
        res.json(ret);
    } catch (error) {
        // Log error and return 500 error
        console.error('Error generating prompt:', error);
        res.status(500).json({ error: 'An error occurred while generating PROMPT' });
    }
}

// Function to generate prompt using GEMINI
async function generatePromptGemini(req, res) {
    let { prompt, tokens } = req.body; // Get prompt from request body

    // Validate prompt
    if (!prompt) {
        return res.status(400).json({ error: 'PROMPT is required' });
    }

    try {
        // Call generatePromptFromGemini with prompt
        const ret = await generatePromptFromGemini(prompt, tokens);
        // Log AI response
        await logAIResponse(ret);
        // Return generated prompt
        res.json(ret);
    } catch (error) {
        // Log error and return 500 error
        console.error('Error generating prompt:', error);
        res.status(500).json({ error: 'An error occurred while generating PROMPT' });
    }
}

export {
    generatePromptGpt,
    generatePromptGemini
};