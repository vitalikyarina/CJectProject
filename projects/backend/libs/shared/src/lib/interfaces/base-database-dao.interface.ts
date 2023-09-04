import { FilterDocument } from "../types";
import { QueryFindOptions, QueryOptions } from "./query-options.interface";

export interface IBaseDatabaseDAO<T, TCreate, TUpdate> {
  find(
    queryConditions?: FilterDocument<T>,
    options?: QueryFindOptions,
  ): Promise<T[]>;

  findById(id: string, options?: QueryOptions): Promise<T>;

  createOne(newDocument: TCreate, options?: QueryOptions): Promise<T>;

  deleteOneById(id: string): Promise<void>;

  updateOne(
    queryConditions: FilterDocument<T>,
    updateData: Partial<TUpdate>,
    options?: QueryOptions,
  ): Promise<T>;

  updateOneById(
    id: string,
    updateData: Partial<TUpdate>,
    options?: QueryOptions,
  ): Promise<T>;
}
