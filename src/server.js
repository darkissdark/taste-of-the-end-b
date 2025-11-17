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
import { getAllowedOrigins } from './constants/origins.js';
import { isProd } from './constants/env.js';
import { swaggerDocs } from '../swagger.js';

const app = express();
const PORT = process.env.PORT ?? 3030;
const allowedOrigins = getAllowedOrigins(isProd);

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', recipesRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', ingredientsRoutes);
swaggerDocs(app);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    isProd ? 'Running in production mode' : 'Running in development mode',
  );
});
