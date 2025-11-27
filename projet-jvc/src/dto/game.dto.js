import Joi from "joi";

export const createGameSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  price: Joi.number().min(0).required(),
  rating: Joi.number().min(0).max(5).required(),
  genre: Joi.string().allow(""),
  releaseYear: Joi.number().integer().min(1970).max(new Date().getFullYear()).optional(),
});

export const updateGameSchema = createGameSchema.min(1);
