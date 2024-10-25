// authenticate.js
import dotenv from 'dotenv';
dotenv.config();
export function authenticate(req, res, next) {
    // Get API key from header
    const apiKey = req.headers['x-api-key'];

    // Check if API key is valid
    if (apiKey === process.env.API_KEY) { // Replace with actual API key
        next(); // Continue to next middleware/route handler
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}