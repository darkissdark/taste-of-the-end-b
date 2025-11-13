import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import { Recipe } from '../models/recipe.js';

const toNumberOrDefault = (value, defaultValue) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
};

export const getRecipes = async (req, res) => {
  const { page = 1, perPage = 12, category, area, owner, search } = req.query;

  const pageNumber = toNumberOrDefault(page, 1);
  const perPageNumber = toNumberOrDefault(perPage, 12);
  const skip = (pageNumber - 1) * perPageNumber;

  const filters = {};

  if (category) {
    filters.category = category;
  }
  if (area) {
    filters.area = area;
  }
  if (owner && isValidObjectId(owner)) {
    filters.owner = owner;
  }
  if (search) {
    filters.title = { $regex: search, $options: 'i' };
  }

  const [recipes, total] = await Promise.all([
    Recipe.find(filters)
      .skip(skip)
      .limit(perPageNumber)
      .populate('ingredients.id', 'name desc img'),

    Recipe.countDocuments(filters),
  ]);

  const totalPages = Math.ceil(total / perPageNumber) || 1;

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    total,
    totalPages,
    recipes,
  });
};

export const getRecipeById = async (req, res, next) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    next(createHttpError(400, 'Invalid recipe id'));
    return;
  }

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.status(200).json(recipe);
};
