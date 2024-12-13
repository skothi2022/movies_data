import express from 'express';
import movieRoutes from './routes/movieRoutes';
import { loggerMiddleware } from './middlewares/loggerMiddleware';

const app = express();

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/api', movieRoutes);

export default app;
