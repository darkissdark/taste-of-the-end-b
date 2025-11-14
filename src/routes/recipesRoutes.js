import { Router } from 'express';

import { getRecipeById, getRecipes } from '../controllers/recipesController.js';
import { celebrate } from 'celebrate';
import { getRecipesSchema } from '../validations/recipesValidation.js';

const router = Router();

router.get('/recipes', celebrate(getRecipesSchema), getRecipes);
router.get('/recipes/:recipeId', getRecipeById);

export default router;
