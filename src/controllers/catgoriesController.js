import { Category } from '../models/category.js';

export const getAllCategories = async (req, res) => {
  const categories = await Category.find().select('name -_id');
  const result = categories.map((c) => c.name);
  res.status(200).json(result);
};
