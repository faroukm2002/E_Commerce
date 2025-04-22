import Joi from "joi";

export const addProductValidation = Joi.object({
  title: Joi.string().min(10).required().trim().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 10 characters long",
    "any.required": "Title is required",
  }),
  price: Joi.number().min(0).default(0).messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),
  description: Joi.string().min(10).max(300).required().trim().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description should be less than or equal to 300 characters",
    "any.required": "Description is required",
  }),
  quantity: Joi.number().min(0).default(0).messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity cannot be negative",
  }),
  sold: Joi.number().min(0).default(0).messages({
    "number.base": "Sold count must be a number",
    "number.min": "Sold count cannot be negative",
  }),
  ratingAvg: Joi.number().min(1).max(5).optional().messages({
    "number.base": "Rating average must be a number",
    "number.min": "Rating average must be at least 1",
    "number.max": "Rating average cannot exceed 5",
  }),
  rateCount: Joi.number().min(0).optional().messages({
    "number.base": "Rate count must be a number",
    "number.min": "Rate count cannot be negative",
  }),
  category: Joi.string().hex().length(24).required().messages({
    "string.base": "Category ID must be a string",
    "string.hex": "Category ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Category ID must be 24 characters long",
    "any.required": "Category ID is required",
  }),
  subcategory: Joi.string().hex().length(24).required().messages({
    "string.base": "Subcategory ID must be a string",
    "string.hex": "Subcategory ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Subcategory ID must be 24 characters long",
    "any.required": "Subcategory ID is required",
  }),
  brand: Joi.string().hex().length(24).required().messages({
    "string.base": "Brand ID must be a string",
    "string.hex": "Brand ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Brand ID must be 24 characters long",
    "any.required": "Brand ID is required",
  }),
  // imgCover and images will be handled by multer middleware
});

export const updateProductValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
  title: Joi.string().min(10).optional().trim().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 10 characters long",
  }),
  price: Joi.number().min(0).optional().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),
  description: Joi.string().min(10).max(300).optional().trim().messages({
    "string.base": "Description must be a string",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description should be less than or equal to 300 characters",
  }),
  quantity: Joi.number().min(0).optional().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity cannot be negative",
  }),
  sold: Joi.number().min(0).optional().messages({
    "number.base": "Sold count must be a number",
    "number.min": "Sold count cannot be negative",
  }),
  ratingAvg: Joi.number().min(1).max(5).optional().messages({
    "number.base": "Rating average must be a number",
    "number.min": "Rating average must be at least 1",
    "number.max": "Rating average cannot exceed 5",
  }),
  rateCount: Joi.number().min(0).optional().messages({
    "number.base": "Rate count must be a number",
    "number.min": "Rate count cannot be negative",
  }),
  category: Joi.string().hex().length(24).optional().messages({
    "string.base": "Category ID must be a string",
    "string.hex": "Category ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Category ID must be 24 characters long",
  }),
  subcategory: Joi.string().hex().length(24).optional().messages({
    "string.base": "Subcategory ID must be a string",
    "string.hex": "Subcategory ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Subcategory ID must be 24 characters long",
  }),
  brand: Joi.string().hex().length(24).optional().messages({
    "string.base": "Brand ID must be a string",
    "string.hex": "Brand ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "Brand ID must be 24 characters long",
  }),
  // imgCover and images will be handled by multer middleware
});

// Keep these validations unchanged
export const getProductValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const deleteProductValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const getAllProductsValidation = Joi.object({
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
  price: Joi.number().min(0).optional(),
  category: Joi.string().hex().length(24).optional(),
  subcategory: Joi.string().hex().length(24).optional(),
  brand: Joi.string().hex().length(24).optional(),
  ratingAvg: Joi.number().min(1).max(5).optional(),
  sold: Joi.number().min(0).optional(),
  rateCount: Joi.number().min(0).optional(),
}).unknown(true); // Allow unknown keys for flexible filtering
