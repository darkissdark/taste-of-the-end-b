import { Ingredient } from '../models/recipe.js';

export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.status(200).json(ingredients);
};
