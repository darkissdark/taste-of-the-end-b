import { model, Schema } from 'mongoose';
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const Category = model('Category', categorySchema);
