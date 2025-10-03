const Joi = require("joi");

// For user registration
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user").optional(),
});

// for updating user info

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("admin", "user").optional(),
});

module.exports = { registerSchema, updateUserSchema };
