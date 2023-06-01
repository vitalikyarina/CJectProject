import { InjectionToken } from "@angular/core";
import { ComicEntity } from "../models";

export const FORM_EDIT_DATA = new InjectionToken<ComicEntity | null>(
  "FORM_EDIT_DATA",
  { factory: () => null },
);
