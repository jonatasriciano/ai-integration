// middleware/logger.js
import connectDB from '../db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Import the path module here

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function logRequest(req, res, next) { // Include res and next
    const db = await connectDB();
    const logCollection = db.collection('request_logs');

    const logEntry = {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        timestamp: new Date(),
        filePath: path.join(__dirname, req.path) // Add the file path to the log
    };

    await logCollection.insertOne(logEntry);
    console.log('Request logged:', logEntry);

    next(); // This will call the next middleware or route handler
}

export default logRequest;