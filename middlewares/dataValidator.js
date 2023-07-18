const Joi = require("joi");

const dataValidator = (data) => {

  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
 
  return schema.validate(data);
};

module.exports = dataValidator;
