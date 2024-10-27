import axios from 'axios';

import * as cheerio from 'cheerio';
import { generatePromptFromGpt } from '../services/gptService.js';
import { generatePromptFromGemini } from '../services/geminiService.js';
import { logAIResponse } from '../middleware/logger.js';
import { validateUrlAndModel } from '../utils/validation.js';
// Function to extract and process page information
export async function extractPageInfo(req, res) {
    
    const { url, model, error, tokens } = validateUrlAndModel(req, res);
    // Validate the URL
    if (error) {
        return res.status(400).json({ error });
    }
    try {
        // Fetch the HTML content from the URL
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        const html = response.data;

        let prompt = `Extract all data and parse it in a json format from the following html: ${html}`;

        // Now process this content with GPT or Gemini
        let result;
        if (model === 'gpt') {
            result = await generatePromptFromGpt(prompt, tokens);
        } else if (model === 'gemini') {
            result = await generatePromptFromGemini(prompt, tokens);
        } else {
            return res.status(400).json({ error: 'Invalid model selected' });
        }

        // Log the AI response
        await logAIResponse(result);
        // Return the processed information
        res.json({ summary: result });
    } catch (error) {
        console.error('Error extracting page info:', error);
        res.status(500).json({ error: error });
    }
}