import { Router } from 'express';

import { getRecipeById, getRecipes } from '../controllers/recipesController.js';

const router = Router();

router.get('/recipes', getRecipes);
router.get('/recipes/:recipeId', getRecipeById);

export default router;

