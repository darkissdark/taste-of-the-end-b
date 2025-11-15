import { Router } from 'express';
import { upload } from '../middleware/multer.js';

import {
  addToFavorites,
  createRecipe,
  getFavorites,
  getPersonalRecipes,
  getRecipeById,
  getRecipes,
  removeFromFavorites,
} from '../controllers/recipesController.js';
import { celebrate } from 'celebrate';
import {
  getRecipesSchema,
  postRecipesSchema,
} from '../validations/recipesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/recipes', celebrate(getRecipesSchema), getRecipes);
router.get('/recipes/personal', authenticate, getPersonalRecipes);
router.get('/recipes/favorites', authenticate, getFavorites);
router.get('/recipes/:recipeId', getRecipeById);
router.post(
  '/recipes',
  authenticate,
  celebrate(postRecipesSchema),
  upload.single('recipePhoto'),
  createRecipe,
);
router.post('/recipes/favorites/:recipeId', authenticate, addToFavorites);

router.delete(
  '/recipes/favorites/:recipeId',
  authenticate,
  removeFromFavorites,
);
export default router;
