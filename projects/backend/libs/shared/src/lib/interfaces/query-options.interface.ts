import { SortOrder } from "../types";

interface PopulateOptions {
  path: string;
  select?: string;
  populate?: string[] | PopulateOptions[];
}

export interface QueryFindOptions {
  limit?: number;
  sort?: SortOrder;
  skip?: number;
  populate?: string[] | PopulateOptions[];
}

export interface QueryOptions {
  populate?: string[] | PopulateOptions[];
}
