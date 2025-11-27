const Joi = require('joi');

exports.registerValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin','librarian','member').required()
  });
  return schema.validate(data);
};
