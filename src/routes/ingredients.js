import { Router } from 'express';
import { getAllIngredients } from '../controllers/ingredientsController.js';
import { celebrate } from 'celebrate';
import { getIngredientsSchema } from '../validations/ingredientsValidation.js';

const ingredientsRoutes = Router();

ingredientsRoutes.get(
  '/ingredients',
  celebrate(getIngredientsSchema),
  getAllIngredients,
);

export default ingredientsRoutes;
