import { FilterQuery } from "mongoose";
import { BaseMongoAPIService } from "../api";
import { IBaseDatabaseDAO, IFindOptions } from "@cjp-back/shared";

export class BaseMongoService<TDocument, TCreate, TUpdate>
  implements IBaseDatabaseDAO<TDocument, TCreate, TUpdate>
{
  constructor(
    private readonly baseApi: BaseMongoAPIService<TDocument, TCreate, TUpdate>,
  ) {}

  public createOne(newDocument: TCreate): Promise<TDocument> {
    return this.baseApi.createOne(newDocument);
  }

  public find(
    queryConditions?: FilterQuery<TDocument>,
    options?: IFindOptions,
  ): Promise<TDocument[]> {
    return this.baseApi.find(queryConditions, options);
  }

  public findById(id: string): Promise<TDocument> {
    return this.baseApi.findById(id);
  }

  public deleteOne(id: string): Promise<TDocument> {
    return this.baseApi.deleteOne(id);
  }

  public updateOne(
    queryConditions: FilterQuery<TDocument>,
    updateData: TUpdate,
  ): Promise<TDocument> {
    return this.baseApi.updateOne(queryConditions, updateData);
  }

  public updateOneById(id: string, updateData: TUpdate): Promise<TDocument> {
    return this.baseApi.updateOneById(id, updateData);
  }
}
