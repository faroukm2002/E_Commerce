import Joi from "joi";

 const addBrandValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  slug: Joi.string().optional(),
  logo: Joi.string().uri().optional(),
});


const updateBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).required(), 
  name: Joi.string().trim().min(2).max(50).optional(), 
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(), 
  logo: Joi.string().uri().optional(), 
});

const deleteBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).required(), 
});

const getBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).optional(), 
});

export {
  addBrandValidation,
  updateBrandValidation,
  deleteBrandValidation,
  getBrandValidation,
};
