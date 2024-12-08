import Joi from "joi";

// Add Category Validation
const addCategoryValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  slug: Joi.string().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), 
  image: Joi.string().uri().optional(), 
});

// Update Category Validation
const updateCategoryValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  id: Joi.string().hex().length(24).required(),
  slug: Joi.string().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  image: Joi.string().uri().optional(),
});

// Delete Category Validation
const deleteCategoryValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// Fetch Category Validation (optional)
const getCategoryValidation = Joi.object({
  id: Joi.string().hex().length(24).optional(), 
});

export {
  addCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
  getCategoryValidation,
};
