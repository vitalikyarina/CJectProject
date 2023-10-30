import Joi from "joi";
import { Environment } from "../core";

interface IComicEnvironment {
  [Environment.PORT]: number;
  [Environment.HOST]: string;
  [Environment.MONGO_URL]: string;
  [Environment.IMAGE_FOLDER]: string;
}

export const EnvValidationSchema = {
  [Environment.PORT]: Joi.number().positive().default(3001),
  [Environment.HOST]: Joi.string().default("0.0.0.0"),
  [Environment.MONGO_URL]: Joi.string().required(),
  [Environment.IMAGE_FOLDER]: Joi.string().required(),
};

export function getEnv(): IComicEnvironment {
  const envVarsSchema = Joi.object().keys(EnvValidationSchema).unknown();

  const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const env: IComicEnvironment = {
    [Environment.PORT]: envVars[Environment.PORT],
    [Environment.HOST]: envVars[Environment.HOST],
    [Environment.MONGO_URL]: envVars[Environment.MONGO_URL],
    [Environment.IMAGE_FOLDER]: envVars[Environment.IMAGE_FOLDER],
  };

  return env;
}
