const Joi = require("joi");

const dataValidator = (data) => {

  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required().messages({"any.required": "missing required name field",}),
    email: Joi.string().email().required().messages({"any.required": "missing required email field",}),
    phone: Joi.string().required().messages({"any.required": "missing required phone field",}),
  });
 
  return schema.validate(data);
};

module.exports = dataValidator;
