import express from 'express';
import { generatePromptGpt, generatePromptGemini } from './controllers.js';

const router = express.Router();

router.post('/api/prompt-gpt', generatePromptGpt);
router.post('/api/prompt-gemini', generatePromptGemini);

export default router;