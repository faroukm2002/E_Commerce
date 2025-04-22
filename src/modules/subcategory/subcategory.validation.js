import Joi from "joi";

export const addSubCategoryValidation = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),
  category: Joi.string().hex().length(24).required().messages({
    "string.base": "Category ID must be a string",
    "string.hex": "Category ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Category ID must be 24 characters long",
    "any.required": "Category ID is required",
  }),
});

export const updateSubCategoryValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
  name: Joi.string().min(2).optional().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters long",
  }),
  category: Joi.string().hex().length(24).optional().messages({
    "string.base": "Category ID must be a string",
    "string.hex": "Category ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Category ID must be 24 characters long",
  }),
});

export const deleteSubCategoryValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const getSubCategoryValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const getAllSubCategoriesValidation = Joi.object({
  page: Joi.number().integer().min(1).optional().messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).optional().messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
  }),
  sort: Joi.string().optional(),
  fields: Joi.string().optional(),
  keyword: Joi.string().optional(),
  category: Joi.string().hex().length(24).optional().messages({
    "string.base": "Category ID must be a string",
    "string.hex": "Category ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Category ID must be 24 characters long",
  }),
}).unknown(true); // Allow unknown keys for flexible filtering

