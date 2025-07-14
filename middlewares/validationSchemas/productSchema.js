const Joi = require('joi');

const productCreateSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'any.required': 'Name is required',
  }),

  description: Joi.string().min(15).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 15 characters',
    'any.required': 'Description is required',
  }),

  price: Joi.number().min(1).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be at least 1',
    'any.required': 'Price is required',
  }),

  quantity: Joi.number().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),

  business_id: Joi.string().uuid().required().messages({
    'string.empty': 'Business ID is required',
    'string.uuid': 'Business ID must be a valid UUID',
    'any.required': 'Business ID is required',
  })
});

module.exports = {
  productCreateSchema,
};
