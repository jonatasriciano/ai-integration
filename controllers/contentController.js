import axios from 'axios';
import cheerio from 'cheerio';
import { generatePromptFromGpt } from './services/gptService.js';
import { generatePromptFromGemini } from './services/geminiService.js';
import { logAIResponse } from './middleware/logger.js';
import { validateUrlAndModel } from './utils/validation.js';

// Function to extract and process page information
export async function extractPageInfo(req, res) {

    const { url, model, error } = validateUrlAndModel(req, res);

    // Validate the URL
    if (error) {
        return error;
    }

    try {
        // Fetch the HTML content from the URL
        const response = await axios.get(url);
        const html = response.data;

        // Use Cheerio to parse the HTML
        const $ = cheerio.load(html);

        // Extract relevant information, for example:
        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const h1 = $('h1').text();

        // Combine extracted information
        let pageContent = `Title: ${title}\nDescription: ${description}\nMain Heading: ${h1}`;

        // Define tokens variable
        const tokens = 1000; // Adjust the number of tokens as needed

        // Now process this content with GPT or Gemini
        let result;
        if (model === 'gpt') {
            result = await generatePromptFromGpt(pageContent, tokens);
        } else if (model === 'gemini') {
            result = await generatePromptFromGemini(pageContent, tokens);
        } else {
            return res.status(400).json({ error: 'Invalid model selected' });
        }

        // Log the AI response
        await logAIResponse(result);

        // Return the processed information
        res.json({ summary: result });

    } catch (error) {
        console.error('Error extracting page info:', error);
        res.status(500).json({ error: 'Failed to extract page information' });
    }
}