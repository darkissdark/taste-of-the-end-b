import { Router } from 'express';
import { upload } from '../middleware/multer.js';

import {
  createRecipe,
  getRecipeById,
  getRecipes,
} from '../controllers/recipesController.js';
import { celebrate } from 'celebrate';
import {
  getRecipesSchema,
  postRecipesSchema,
} from '../validations/recipesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/recipes', celebrate(getRecipesSchema), getRecipes);
router.get('/recipes/:recipeId', getRecipeById);
router.post(
  '/recipes',
  authenticate,
  celebrate(postRecipesSchema),
  upload.single('recipePhoto'),
  createRecipe,
);

export default router;
