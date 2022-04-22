const Joi = require("joi");
require("dotenv").config();

// Define a validação para todos os env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'test', 'provision')
    .default('development'),
  DB_CONNECT: Joi.string().required(),
  TOKEN_SECRET: Joi.string()
    .required()
    .description("Token Secret required to sign"),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Erro na validação do config: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  tknSecret: envVars.TOKEN_SECRET,
  mongo: envVars.DB_CONNECT
};

module.exports = config;