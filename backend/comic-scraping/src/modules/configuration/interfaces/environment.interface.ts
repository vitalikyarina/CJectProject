import { EnvironmentVars } from "../enums";

export interface Environment {
  [EnvironmentVars.PORT]: number;
  [EnvironmentVars.HOST]: string;
  [EnvironmentVars.IMAGE_FOLDER]: string;
}
