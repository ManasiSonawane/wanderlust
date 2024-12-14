const Joi = require("joi");

// Define the schema for server-side validation
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Title is required.",
      "string.min": "Title must be at least 3 characters long.",
      "string.max": "Title cannot exceed 100 characters.",
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      "string.empty": "Description is required.",
      "string.min": "Description must be at least 10 characters long.",
      "string.max": "Description cannot exceed 1000 characters.",
    }),
    image: Joi.object({
      url: Joi.string().uri().required().messages({
        "string.empty": "Image URL is required.",
        "string.uri": "Image URL must be a valid URI.",
      }),
      filename: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Image filename is required.",
      }),
    })
      .required()
      .messages({
        "object.base": "Image field is required.",
      }),
    price: Joi.number().positive().required().messages({
      "number.base": "Price must be a valid number.",
      "number.positive": "Price must be a positive value.",
      "any.required": "Price is required.",
    }),
    country: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Country is required.",
      "string.min": "Country must be at least 2 characters long.",
      "string.max": "Country cannot exceed 50 characters.",
    }),
    location: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Location is required.",
      "string.min": "Location must be at least 2 characters long.",
      "string.max": "Location cannot exceed 100 characters.",
    }),
    unit: Joi.string().min(1).max(50).required().messages({
      "string.empty": "Unit is required.",
      "string.min": "Unit must be at least 1 character long.",
      "string.max": "Unit cannot exceed 50 characters.",
    }),
    enquiry: Joi.string().allow("").optional().messages({
      "string.base": "Enquiry must be a string.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
    }),
    number: Joi.string()
      .pattern(/^[0-9+() -]+$/)
      .min(6)
      .max(15)
      .required()
      .messages({
        "string.pattern.base": "Number must be a valid contact number.",
        "string.empty": "Number is required.",
        "string.min": "Number must be at least 6 characters long.",
        "string.max": "Number cannot exceed 15 characters.",
      }),
  }).required(),
});

module.exports = { listingSchema };
