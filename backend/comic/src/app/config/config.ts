import Joi from "joi";
import { EnvironmentVars } from "./enums";
import { ComicEnvironment } from "./interfaces";

export const EnvValidationSchema = {
  [EnvironmentVars.PORT]: Joi.number().positive().default(3001),
  [EnvironmentVars.HOST]: Joi.string().default("0.0.0.0"),
  [EnvironmentVars.MONGO_URL]: Joi.string().required(),
  [EnvironmentVars.IMAGE_FOLDER]: Joi.string().required(),
};

export function getEnvValidationSchema() {
  return EnvValidationSchema;
}

export function getEnv(): ComicEnvironment {
  const envVarsSchema = Joi.object().keys(EnvValidationSchema).unknown();

  const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const env: ComicEnvironment = {
    [EnvironmentVars.PORT]: envVars[EnvironmentVars.PORT],
    [EnvironmentVars.HOST]: envVars[EnvironmentVars.HOST],
    [EnvironmentVars.MONGO_URL]: envVars[EnvironmentVars.MONGO_URL],
    [EnvironmentVars.IMAGE_FOLDER]: envVars[EnvironmentVars.IMAGE_FOLDER],
  };

  return env;
}
