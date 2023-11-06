import { FilterDocument } from "../types";
import { QueryFindOptions, QueryOptions } from "./query-options.interface";
import { UpdatedData } from "./updated-data.interface";

export interface DatabaseDAO<T, TCreate, TUpdate> {
  find(filter?: FilterDocument<T>, options?: QueryFindOptions): Promise<T[]>;
  findById(id: string, options?: QueryOptions): Promise<T>;

  createOne(create: TCreate, options?: QueryOptions): Promise<T>;

  updateOne(
    filter: FilterDocument<T>,
    update: Partial<TUpdate>,
    options?: QueryOptions,
  ): Promise<T>;

  updateById(
    id: string,
    update: Partial<TUpdate>,
    options?: QueryOptions,
  ): Promise<T>;

  update(
    filter: FilterDocument<T>,
    update: Partial<TUpdate>,
    options?: QueryOptions,
  ): Promise<UpdatedData>;

  deleteById(id: string): Promise<void>;
}
