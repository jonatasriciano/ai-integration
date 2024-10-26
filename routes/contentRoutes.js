import express from 'express';
import { extractPageInfo } from '../controllers/contentController.js';

const router = express.Router();

router.post('/api/extract-info', extractPageInfo);

export default router;