import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    desc: { type: String, trim: true },
    img: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Ingredient = model('Ingredient', ingredientSchema);
