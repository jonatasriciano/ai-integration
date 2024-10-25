// Import required modules
import OpenAIApi from "openai";
import dotenv from 'dotenv';
dotenv.config();

// Initialize the OpenAIApi instance
const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

// Define the generatePromptFromGemini function
async function generatePromptFromGpt(prompt, tokens) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }],
            max_tokens: tokens,
            temperature: 0.7,
        });

        const ret = {
            message: completion.choices[0].message['content'],
            tokensUsed: completion.usage.total_tokens,
            apiStatus: completion.status,
        };

        return ret;
    } catch (error) {
        if (error.response) {
            console.error("OpenAI API error:", error.response.status, error.response.data);
        } else {
            console.error("OpenAI API connection error:", error);
        }
        throw error;
    }
}
export { generatePromptFromGpt }; generatePromptFromGpt
