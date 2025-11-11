import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least {#limit}',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.base': 'PerPage must be a number',
      'number.integer': 'PerPage must be an integer',
      'number.min': 'PerPage must be at least {#limit}',
      'number.max': 'PerPage must be at most {#limit}',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
      }),
    search: Joi.string().messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least {#limit} character long',
      'any.required': 'Title is required',
    }),
    content: Joi.string().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .required()
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
        'any.required': 'Tag is required',
      }),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least {#limit} character long',
    }),
    content: Joi.string().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
      }),
  }).min(1),
};
