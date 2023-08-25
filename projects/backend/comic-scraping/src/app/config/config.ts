import Joi from "joi";
import { Environment } from "../core";

interface ICScrapingEnvironment {
  [Environment.PORT]: number;
  [Environment.HOST]: string;
  [Environment.IMAGE_FOLDER]: string;
}

export const EnvValidationSchema = {
  [Environment.PORT]: Joi.number().positive().default(3002),
  [Environment.HOST]: Joi.string().default("0.0.0.0"),
  [Environment.IMAGE_FOLDER]: Joi.string().required(),
};

export function getEnv(): ICScrapingEnvironment {
  const envVarsSchema = Joi.object().keys(EnvValidationSchema).unknown();

  const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const env: ICScrapingEnvironment = {
    [Environment.PORT]: envVars[Environment.PORT],
    [Environment.HOST]: envVars[Environment.HOST],
    [Environment.IMAGE_FOLDER]: envVars[Environment.IMAGE_FOLDER],
  };

  return env;
}
