import express from 'express';
import geminiRoutes from './routes/geminiRoutes.js';
import gptRoutes from './routes/gptRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import { authenticate } from './middleware/authenticate.js';
import { logRequest } from './middleware/logger.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logRequest); // Add the logRequest middleware
app.use(authenticate); // Add the authenticate middleware
app.use(geminiRoutes);
app.use(gptRoutes);
//app.use(contentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

