import express from 'express';
import routes from './routes.js';
import { authenticate } from './middleware/authenticate.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticate);
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});