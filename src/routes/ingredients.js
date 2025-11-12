import { Router } from 'express';
import { getAllIngredients } from '../controllers/ingredientsController.js';

const ingredientsRoutes = Router();

ingredientsRoutes.get('/ingredients', getAllIngredients);

export default ingredientsRoutes;
