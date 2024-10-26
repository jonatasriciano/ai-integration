import express from 'express';
import { generatePromptGpt } from '../controllers/gptController.js';

const router = express.Router();

router.post('/api/prompt-gpt', generatePromptGpt);

export default router;