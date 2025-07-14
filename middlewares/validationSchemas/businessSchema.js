const Joi = require('joi');

const businessCreateSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  description: Joi.string().min(15).required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  }),
   business_handler: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
   roles: Joi.array().min(1).items(Joi.string()).required().messages({
    'array.base': 'Roles must be an array',
    'array.min': 'At least one role is required',
    'any.required': 'Roles are required',
  })
});

module.exports = {
  businessCreateSchema,
};
