import { Observable } from "rxjs";
import { FilterDocument } from "../types";
import { IFindOptions } from "./find-options.interface";

export interface IBaseDatabaseDAO<T, TCreate, TUpdate> {
  createOne(newDocument: TCreate): Observable<T>;

  find(
    queryConditions?: FilterDocument<T>,
    options?: IFindOptions,
  ): Observable<T>;

  findById(id: string): Observable<T>;

  deleteOne(id: string): Observable<T>;

  updateOne(
    queryConditions: FilterDocument<T>,
    updateData: Partial<TUpdate>,
  ): Observable<T>;

  updateOneById(id: string, updateData: Partial<TUpdate>): Observable<T>;
}
