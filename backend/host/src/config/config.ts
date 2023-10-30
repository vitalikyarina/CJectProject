import Joi from "joi";
import { Environment } from "../core";

interface ICScrapingEnvironment {
  [Environment.PORT]: number;
  [Environment.IMAGE_FOLDER]: string;
  [Environment.COMIC_MICROSERVICE_PORT]: number;
  [Environment.COMIC_MICRISERVICE_HOST]: string;
}

export const EnvValidationSchema = {
  [Environment.PORT]: Joi.number().positive().default(3000),
  [Environment.IMAGE_FOLDER]: Joi.string().required(),
  [Environment.COMIC_MICRISERVICE_HOST]: Joi.string().default("0.0.0.0"),
  [Environment.COMIC_MICROSERVICE_PORT]: Joi.number().default(3001),
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
    [Environment.IMAGE_FOLDER]: envVars[Environment.IMAGE_FOLDER],
    [Environment.COMIC_MICRISERVICE_HOST]:
      envVars[Environment.COMIC_MICRISERVICE_HOST],
    [Environment.COMIC_MICROSERVICE_PORT]:
      envVars[Environment.COMIC_MICROSERVICE_PORT],
  };

  return env;
}
