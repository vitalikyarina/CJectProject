import Joi from "joi";
import { CScrapingEnvironment } from "../core";

interface ICScrapingEnvironment {
  [CScrapingEnvironment.PORT]: number;
  [CScrapingEnvironment.HOST]: string;
  [CScrapingEnvironment.IMAGE_FOLDER]: string;
}

export const EnvValidationSchema = {
  [CScrapingEnvironment.PORT]: Joi.number().positive().default(3002),
  [CScrapingEnvironment.HOST]: Joi.string().required(),
  [CScrapingEnvironment.IMAGE_FOLDER]: Joi.string().required(),
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
    [CScrapingEnvironment.PORT]: envVars[CScrapingEnvironment.PORT],
    [CScrapingEnvironment.HOST]: envVars[CScrapingEnvironment.HOST],
    [CScrapingEnvironment.IMAGE_FOLDER]: envVars[CScrapingEnvironment.IMAGE_FOLDER],
  };

  return env;
}
