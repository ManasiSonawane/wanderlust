const Joi = require("joi");

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
      filename: Joi.string().required().messages({
        "string.empty": "Filename is required.",
      }),
    }).required(),
    price: Joi.number().positive().precision(2).required().messages({
      "number.base": "Price must be a number.",
      "number.positive": "Price must be a positive number.",
      "any.required": "Price is required.",
    }),
    location: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Location is required.",
      "string.min": "Location must be at least 3 characters long.",
    }),
    country: Joi.string().min(3).max(50).required().messages({
      "string.empty": "Country is required.",
    }),
    unit: Joi.string()
      .valid("Villa", "Apartment", "Cottage", "Studio")
      .required()
      .messages({
        "any.only":
          "Unit must be one of 'Villa', 'Apartment', 'Cottage', or 'Studio'.",
        "string.empty": "Unit is required.",
      }),
    enquiry: Joi.string().max(500).optional().messages({
      "string.max": "Enquiry must not exceed 500 characters.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
    }),
    number: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .messages({
        "number.base": "Number must be a valid integer.",
        "number.min": "Number must be a 10-digit phone number.",
        "number.max": "Number must be a 10-digit phone number.",
      }),
  }).required(),
});

module.exports = listingSchema;
