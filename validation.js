const Joi = require("joi");

// Validação de registro
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password'))
  });
  return schema.validate(data);
};

// Validação de login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
