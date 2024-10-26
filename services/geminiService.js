// Import required modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the generatePromptFromGemini function
async function generatePromptFromGemini(prompt, tokens) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: { maxOutputTokens: tokens } });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const retText = response.text();
        const totalTokensUsed = response.usageMetadata.totalTokenCount ?? null;

        const ret = {
            message: retText,
            tokensUsed: totalTokensUsed,
            apiStatus: 200
        };

        return ret;
    } catch (error) {
        if (error.response) {
            console.error("GoogleGenerativeAI API error:", error.response.status, error.response.data);
        } else {
            console.error("GoogleGenerativeAI API connection error:", error);
        }
        throw error;
    }
}
// Export the generatePromptFromGemini function
export { generatePromptFromGemini }; generatePromptFromGemini
