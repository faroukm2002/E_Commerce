import Joi from "joi";

// Common validation messages
const messages = {
  id: {
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex-encoded MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  },
  name: {
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  },
  email: {
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  },
  password: {
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  },
  role: {
    "string.base": "Role must be a string",
    "any.only": 'Role must be either "admin" or "user"',
  },
};

// Common address schema
const addressSchema = Joi.object({
  city: Joi.string().required().messages({
    "string.base": "City must be a string",
    "string.empty": "City is required",
    "any.required": "City is required",
  }),
  street: Joi.string().required().messages({
    // Fixed typo
    "string.base": "Street must be a string",
    "string.empty": "Street is required",
    "any.required": "Street is required",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string",
    "string.empty": "Phone is required",
    "any.required": "Phone is required",
  }),
});

// MongoDB ObjectId validation
const objectIdSchema = Joi.string().hex().length(24);

export const addUserValidation = Joi.object({
  name: Joi.string().required().trim().messages(messages.name),
  email: Joi.string().email().required().trim().messages(messages.email),
  password: Joi.string().min(6).required().messages(messages.password),
  role: Joi.string()
    .valid("admin", "user")
    .default("user")
    .messages(messages.role),
  isActive: Joi.boolean().default(true),
  verified: Joi.boolean().default(false),
  blocked: Joi.boolean().default(false),
  wishList: Joi.array()
    .items(
      objectIdSchema.messages({
        "string.hex":
          "WishList item must be a valid hex-encoded MongoDB ObjectId",
        "string.length": "WishList item must be 24 characters long",
      })
    )
    .default([]),
  addresses: Joi.array().items(addressSchema).default([]),
  forgetCode: Joi.string().allow(null).default(null),
  refreshToken: Joi.string().allow(null).default(null),
});

export const getUserValidation = Joi.object({
  id: objectIdSchema.required().messages(messages.id),
});

export const updateUserValidation = Joi.object({
  id: objectIdSchema.required().messages(messages.id),
  name: Joi.string().optional().trim().messages(messages.name),
  email: Joi.string().email().optional().trim().messages(messages.email),
  role: Joi.string().valid("admin", "user").optional().messages(messages.role),
  isActive: Joi.boolean().optional(),
  verified: Joi.boolean().optional(),
  blocked: Joi.boolean().optional(),
  wishList: Joi.array()
    .items(
      objectIdSchema.messages({
        "string.hex":
          "WishList item must be a valid hex-encoded MongoDB ObjectId",
        "string.length": "WishList item must be 24 characters long",
      })
    )
    .optional(),
  addresses: Joi.array().items(addressSchema).optional(),
  forgetCode: Joi.string().allow(null).optional(),
  refreshToken: Joi.string().allow(null).optional(),
  changePasswordAt: Joi.date().optional(),
});

export const deleteUserValidation = Joi.object({
  id: objectIdSchema.required().messages(messages.id),
});

export const changeUserPasswordValidation = Joi.object({
  id: objectIdSchema.required().messages(messages.id),
  currentPassword: Joi.string().required().messages({
    "string.base": "Current password must be a string",
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),
  password: Joi.string().min(6).required().messages(messages.password),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.base": "Confirm password must be a string",
    "any.only": "Confirm password must match the new password",
    "any.required": "Confirm password is required",
  }),
});

export const getAllUsersValidation = Joi.object({
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
  role: Joi.string().valid("admin", "user").optional(),
  isActive: Joi.boolean().optional(),
  verified: Joi.boolean().optional(),
  blocked: Joi.boolean().optional(),
}).unknown(true); // Allow unknown keys for flexible filtering
