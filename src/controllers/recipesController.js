import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import { isValidObjectId } from 'mongoose';

import { Recipe } from '../models/recipe.js';
import { Ingredient } from '../models/ingredient.js';
import { Category } from '../models/category.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

const toNumberOrDefault = (value, defaultValue) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
};

export const getRecipes = async (req, res) => {
  const { page = 1, perPage = 12, category, search, ingredient } = req.query;

  const pageNumber = toNumberOrDefault(page, 1);
  const perPageNumber = toNumberOrDefault(perPage, 12);
  const skip = (pageNumber - 1) * perPageNumber;

  const filters = {};

  if (category) {
    const exists = await Category.exists({ name: category });
    if (!exists) {
      return res.status(400).json({ message: 'Invalid category' });
    } else {
      filters.category = category;
    }
  }

  if (search) {
    filters.title = { $regex: search, $options: 'i' };
  }

  if (ingredient) {
    const matchedIngredients = await Ingredient.find({
      name: { $regex: ingredient, $options: 'i' },
    }).select('_id');

    const ingredientIds = matchedIngredients.map((i) => i._id);

    if (ingredientIds.length > 0) {
      filters['ingredients.id'] = { $in: ingredientIds };
    } else {
      return res.status(200).json({
        page: pageNumber,
        perPage: perPageNumber,
        total: 0,
        totalPages: 1,
        recipes: [],
      });
    }
  }

  const [recipes, total] = await Promise.all([
    Recipe.find(filters)
      .skip(skip)
      .limit(perPageNumber)
      .populate('ingredients.id', 'name desc img'),

    Recipe.countDocuments(filters),
  ]);

  const totalPages = Math.ceil(total / perPageNumber) || 1;

  const formattedRecipes = recipes.map((recipe) => ({
    ...recipe.toObject(),
    ingredients: recipe.ingredients.map((i) => ({
      ...i.id.toObject(),
      measure: i.measure,
    })),
  }));

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    total,
    totalPages,
    recipes: formattedRecipes,
  });
};

export const getRecipeById = async (req, res, next) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    next(createHttpError(400, 'Invalid recipe id'));
    return;
  }

  const recipe = await Recipe.findById(recipeId).populate(
    'ingredients.id',
    'name desc img',
  );

  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  const formatRecipe = (recipe) => {
    const obj = recipe.toObject();

    return {
      ...obj,
      ingredients: obj.ingredients.map((i) => ({
        name: i.id?.name || null,
        desc: i.id?.desc || null,
        img: i.id?.img || null,
        measure: i.measure,
      })),
    };
  };

  const formattedRecipe = formatRecipe(recipe);

  res.status(200).json(formattedRecipe);
};

export const createRecipe = async (req, res) => {
  const { title, description, time, calories, instructions, category } =
    req.body;

  let url =
    'https://res.cloudinary.com/dcfruowkp/image/upload/v1762504133/cld-sample-4.jpg';
  if (req.file) {
    const upload = await saveFileToCloudinary(req.file.buffer);
    url = upload.url;
  }

  const categoryExists = await Category.exists({ name: category });
  if (!categoryExists) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  let { ingredients } = req.body;

  if (typeof ingredients === 'string') {
    ingredients = JSON.parse(ingredients);
  }

  const { isValidObjectId } = mongoose;

  let ingredientIds = ingredients.map((i) => i.id);

  const invalidIds = ingredientIds.filter((id) => !isValidObjectId(id));
  if (invalidIds.length > 0) {
    return res
      .status(400)
      .json({ message: 'One or more ingredient ids are invalid' });
  }

  const foundIngredients = await Ingredient.find({
    _id: { $in: ingredientIds },
  }).select('_id');

  if (foundIngredients.length !== ingredientIds.length) {
    return res
      .status(400)
      .json({ message: 'One or more ingredients do not exist' });
  }
  const recipe = await Recipe.create({
    title,
    description,
    category,
    time,
    calories,
    ingredients: ingredients.map((i) => ({
      id: i.id,
      measure: i.measure,
    })),
    instructions,
    thumb: url,
    owner: req.user._id,
  });

  res.status(201).json({
    message: 'Recipe created successfully',
    recipe,
  });
};
export const getPersonalRecipes = async (req, res) => {
  const userId = req.user._id;

  const recipes = await Recipe.find({ owner: userId }).populate(
    'ingredients.id',
    'name desc img',
  );
  res.status(200).json({
    total: recipes.length,
    recipes,
  });
};

export const addToFavorites = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(recipeId)) {
    throw createHttpError(400, 'Invalid recipe id');
  }

  const recipeExists = await Recipe.exists({ _id: recipeId });
  if (!recipeExists) {
    throw createHttpError(404, 'Recipe not found');
  }

  await User.findByIdAndUpdate(userId, {
    $addToSet: { favorites: recipeId },
  });

  res.json({ message: 'Added to favorites' });
};

export const getFavorites = async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // 1. Отримуємо юзера, але не всі фаворити — тільки потрібний шматок
  const user = await User.findById(userId).populate({
    path: 'favorites',
    options: { skip, limit }, // пагінація тут!
    populate: {
      path: 'ingredients.id',
      select: 'name desc img',
    },
  });

  // 2. Загальна кількість favorites
  const totalFavorites = user.favorites.length;

  // 3. Приводимо результати до потрібного формату
  const favorites = user.favorites.map((recipe) => {
    const obj = recipe.toObject();

    return {
      ...obj,
      ingredients: obj.ingredients.map((i) => ({
        name: i.id.name,
        desc: i.id.desc,
        img: i.id.img,
        measure: i.measure,
      })),
    };
  });

  // 4. Відповідь з пагінацією
  res.status(200).json({
    total: totalFavorites,
    page,
    limit,
    totalPages: Math.ceil(totalFavorites / limit),
    data: favorites,
  });
};

export const removeFromFavorites = async (req, res, next) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    return next(createHttpError(400, 'Invalid recipe id'));
  }

  const exists = await Recipe.exists({ _id: recipeId });
  if (!exists) {
    return next(createHttpError(404, 'Recipe not found'));
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $pull: { favorites: recipeId },
    },
    { new: true },
  );

  res.status(200).json({
    message: 'Recipe removed from favorites',
  });
};
