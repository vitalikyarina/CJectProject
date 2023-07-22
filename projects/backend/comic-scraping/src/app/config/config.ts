import Joi from "joi";
import { ComicScrapingEnvironment } from "../core";

interface IComicScrapingEnvironment {
  [ComicScrapingEnvironment.PORT]: number;
  [ComicScrapingEnvironment.HOST]: string;
}

export const comicScrapingValidationSchema = {
  [ComicScrapingEnvironment.PORT]: Joi.number().positive().default(3002),
  [ComicScrapingEnvironment.HOST]: Joi.string().required(),
};

export function getComicScrapingEnv(): IComicScrapingEnvironment {
  const envVarsSchema = Joi.object()
    .keys(comicScrapingValidationSchema)
    .unknown();

  const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const env: IComicScrapingEnvironment = {
    [ComicScrapingEnvironment.PORT]: envVars[ComicScrapingEnvironment.PORT],
    [ComicScrapingEnvironment.HOST]: envVars[ComicScrapingEnvironment.HOST],
  };

  return env;
}
