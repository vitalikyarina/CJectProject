import { EnvironmentVars } from "../enums";

export interface ComicEnvironment {
  [EnvironmentVars.PORT]: number;
  [EnvironmentVars.HOST]: string;
  [EnvironmentVars.MONGO_URL]: string;
  [EnvironmentVars.IMAGE_FOLDER]: string;
}
