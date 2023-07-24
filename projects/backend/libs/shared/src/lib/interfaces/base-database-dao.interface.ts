import { FilterDocument } from "../types";
import { IFindOptions } from "./find-options.interface";

export interface IBaseDatabaseDAO<T, TCreate, TUpdate> {
  find(
    queryConditions?: FilterDocument<T>,
    options?: IFindOptions,
  ): Promise<T[]>;

  findById(id: string): Promise<T>;

  createOne(newDocument: TCreate): Promise<T>;

  deleteOne(id: string): Promise<T>;

  updateOne(
    queryConditions: FilterDocument<T>,
    updateData: Partial<TUpdate>,
  ): Promise<T>;

  updateOneById(id: string, updateData: Partial<TUpdate>): Promise<T>;
}
