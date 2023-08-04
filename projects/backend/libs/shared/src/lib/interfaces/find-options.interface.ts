import { SortOrder } from "../types";

interface IPopulateOptions {
  path: string;
  select?: string;
  populate?: string[] | IPopulateOptions[];
}

export interface IFindOptions {
  limit?: number;
  sort?: SortOrder;
  skip?: number;
  populate?: string[] | IPopulateOptions[];
}

export interface IFindOptions {
  populate?: string[] | IPopulateOptions[];
}
