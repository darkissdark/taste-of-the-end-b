import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    measure: {
      type: String,
      trim: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  },
  {
    _id: false,
  },
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    area: {
      type: String,
      trim: true,
    },
    instructions: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumb: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: [ingredientSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Recipe = model('Recipe', recipeSchema);
