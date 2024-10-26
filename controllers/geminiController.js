import { generatePromptFromGemini } from '../services/geminiService.js';
import { logAIResponse } from '../middleware/logger.js';
import { validatePromptAndTokens } from '../utils/validation.js';

// Function to validate and generate the prompt
async function generatePrompt(req, res, generateFunction) {

    // Use the validation utility
    const validationResult = validatePromptAndTokens(req, res);
    const { prompt, tokens, error } = validationResult || {};

    // If there's an error, return early
    if (error) {
        return error;
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