import express from 'express';
import routes from './routes.js';
import { authenticate } from './middleware/authenticate.js';
import { logRequest } from './middleware/logger.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logRequest); // Add the logRequest middleware
app.use(authenticate); // Add the authenticate middleware
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});