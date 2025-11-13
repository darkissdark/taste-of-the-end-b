import { Ingredient } from '../models/ingredient.js';

export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.status(200).json(ingredients);
};
