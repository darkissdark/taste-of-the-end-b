import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import recipesRoutes from './routes/recipesRoutes.js';
import categoriesRoutes from './routes/categoryRoutes.js';
import ingredientsRoutes from './routes/ingredients.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3001', // backend
    'http://localhost:3000', // frontend
    'https://taste-of-the-end-f-4qj6.vercel.app'
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);
app.use(recipesRoutes);
app.use(categoriesRoutes);
app.use(ingredientsRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
