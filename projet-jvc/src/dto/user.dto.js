import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.min": "Le nom d'utilisateur doit comporter au moins 3 caractères",
    "string.max": "Le nom d'utilisateur ne peut pas dépasser 50 caractères",
  "string.empty": "Le nom d'utilisateur est requis",}),
  email: Joi.string().email().required().messages({
    "string.base": "L'email doit être une chaîne de caractères",
    "string.email": "Veuillez renseigner une adresse email valide",
    "string.empty": "L'email est requis",
  }),
  password: Joi.string().min(6).max(128).required().messages({
    "string.min": "Le mot de passe doit comporter au moins 6 caractères",
    "string.max": "Le mot de passe ne peut pas dépasser 128 caractères",
    "string.empty": "Le mot de passe est requis",
  }),
});
