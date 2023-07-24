import Joi from "joi";
import { ComicEnvironment } from "../core";

interface IComicEnvironment {
  [ComicEnvironment.PORT]: number;
  [ComicEnvironment.HOST]: string;
  [ComicEnvironment.MONGO_URL]: string;
}

export const EnvValidationSchema = {
  [ComicEnvironment.PORT]: Joi.number().positive().default(3001),
  [ComicEnvironment.HOST]: Joi.string().required(),
  [ComicEnvironment.MONGO_URL]: Joi.string().required(),
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
    [ComicEnvironment.PORT]: envVars[ComicEnvironment.PORT],
    [ComicEnvironment.HOST]: envVars[ComicEnvironment.HOST],
    [ComicEnvironment.MONGO_URL]: envVars[ComicEnvironment.MONGO_URL],
  };

  return env;
}
