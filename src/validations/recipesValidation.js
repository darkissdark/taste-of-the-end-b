import { Joi, Segments } from 'celebrate';

export const getRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    perPage: Joi.number().integer().min(1).max(20).optional(),
    category: Joi.string().trim().optional(),
    ingredient: Joi.string().trim().optional(),
    search: Joi.string().trim().optional(),
  }),
};
export const postRecipesSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(64).required(),
    category: Joi.string().trim().required(),
    description: Joi.string().max(200).required(),
    time: Joi.number().integer().min(1).max(360).required(),
    calories: Joi.number().integer().min(1).max(10000).optional(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
          measure: Joi.string().trim().required(),
        }),
      )
      .min(1)
      .required(),
    instructions: Joi.string().max(1200).required(),
  }),
};
