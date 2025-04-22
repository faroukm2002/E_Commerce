import Joi from "joi";

export const addBrandValidation = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  // No need to validate logo here as it will be handled by multer middleware
});

export const getBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const updateBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
  name: Joi.string().optional().trim().messages({
    "string.base": "Name must be a string",
  }),
  // logo will be handled by multer middleware in separate requests if needed
});

export const deleteBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const getAllBrandsValidation = Joi.object({
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
}).unknown(true); // Allow unknown keys for flexible filtering
