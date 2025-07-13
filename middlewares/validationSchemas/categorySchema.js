const Joi = require('joi');

const categoryCreateSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  description: Joi.string().min(15).required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  })
});

module.exports = {
  categoryCreateSchema,
};
