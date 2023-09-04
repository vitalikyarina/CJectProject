import { FilterQuery } from "mongoose";
import { MongoAPIService } from "../api";
import { DatabaseDAO, QueryFindOptions } from "@cjp-back/shared";

export class BaseMongoService<TDocument, TCreate, TUpdate>
  implements DatabaseDAO<TDocument, TCreate, TUpdate>
{
  protected readonly api: MongoAPIService<TDocument, TCreate, TUpdate>;

  public createOne(
    newDocument: TCreate,
    options?: QueryFindOptions,
  ): Promise<TDocument> {
    return this.api.createOne(newDocument, options);
  }

  public find(
    queryConditions?: FilterQuery<TDocument>,
    options?: QueryFindOptions,
  ): Promise<TDocument[]> {
    return this.api.find(queryConditions, options);
  }

  public findById(id: string, options?: QueryFindOptions): Promise<TDocument> {
    return this.api.findById(id, options);
  }

  public async deleteById(id: string): Promise<void> {
    await this.api.deleteById(id);
  }

  public updateOne(
    queryConditions: FilterQuery<TDocument>,
    updateData: TUpdate,
  ): Promise<TDocument> {
    return this.api.updateOne(queryConditions, updateData);
  }

  public updateById(id: string, updateData: TUpdate): Promise<TDocument> {
    return this.api.updateById(id, updateData);
  }
}
