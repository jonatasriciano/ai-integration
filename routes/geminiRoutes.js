import express from 'express';
import { generatePromptGemini } from '../controllers/geminiController.js';

const router = express.Router();

router.post('/api/prompt-gemini', generatePromptGemini);

export default router;