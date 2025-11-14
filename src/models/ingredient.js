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
ingredientSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  return obj;
};
export const Ingredient = model('Ingredient', ingredientSchema);
