import Joi from "joi";
import { EnvironmentVars } from "../enums";
import { Environment } from "../interfaces";

const EnvValidationSchema = {
  [EnvironmentVars.PORT]: Joi.number().positive().default(3002),
  [EnvironmentVars.HOST]: Joi.string().default("0.0.0.0"),
  [EnvironmentVars.IMAGE_FOLDER]: Joi.string().required(),
};

export function getEnvValidationSchema() {
  return EnvValidationSchema;
}

export function getEnv(): Environment {
  const envVarsSchema = Joi.object().keys(EnvValidationSchema).unknown();

  const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const env: Environment = {
    [EnvironmentVars.PORT]: envVars[EnvironmentVars.PORT],
    [EnvironmentVars.HOST]: envVars[EnvironmentVars.HOST],
    [EnvironmentVars.IMAGE_FOLDER]: envVars[EnvironmentVars.IMAGE_FOLDER],
  };

  return env;
}
