import { Joi, Segments } from 'celebrate';

export const getRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    perPage: Joi.number().integer().min(1).max(20).optional(),
    category: Joi.string().trim().optional(),
    ingredient: Joi.string().trim().optional(),
  }),
};
