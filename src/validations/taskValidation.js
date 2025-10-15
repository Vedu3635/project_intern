const Joi = require("joi");

// create task validation
const createTaskSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().max(500).optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").optional(),
  due_date: Joi.date().optional(),
  userId: Joi.number().integer().required(),
});

// Update Task
const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").optional(),
  due_date: Joi.date().optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
