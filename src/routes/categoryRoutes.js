import { Router } from 'express';
import { getAllCategories } from '../controllers/catgoriesController.js';

const categoriesRoutes = Router();

categoriesRoutes.get('/categories', getAllCategories);

export default categoriesRoutes;
