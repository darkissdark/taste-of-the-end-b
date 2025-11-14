import { Ingredient } from '../models/ingredient.js';

export const getAllIngredients = async (req, res) => {
  const { search } = req.query;

  const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

  const ingredients = await Ingredient.find(filter).sort({ name: 1 });

  res.status(200).json(ingredients);
};
