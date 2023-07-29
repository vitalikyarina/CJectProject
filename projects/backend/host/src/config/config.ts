import Joi from "joi";
import { HostEnvironment } from "../core";

interface ICScrapingEnvironment {
  [HostEnvironment.PORT]: number;
  [HostEnvironment.IMAGE_FOLDER]: string;
}

export const EnvValidationSchema = {
  [HostEnvironment.PORT]: Joi.number().positive().default(3000),
  [HostEnvironment.IMAGE_FOLDER]: Joi.string().required(),
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
    [HostEnvironment.PORT]: envVars[HostEnvironment.PORT],
    [HostEnvironment.IMAGE_FOLDER]: envVars[HostEnvironment.IMAGE_FOLDER],
  };

  return env;
}
