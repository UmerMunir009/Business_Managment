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

  owner: Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Owner name is required',
      'any.required': 'Owner name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Owner email is required',
      'string.email': 'Owner email must be valid',
      'any.required': 'Owner email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Owner password is required',
      'any.required': 'Owner password is required',
      'string.min': 'Password must be at least 6 characters',
    }),
  }).required().messages({
    'object.base': 'Owner must be an object',
    'any.required': 'Owner information is required',
  }),
});

module.exports = {
  businessCreateSchema,
};
