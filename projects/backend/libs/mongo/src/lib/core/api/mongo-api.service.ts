import { DatabaseDAO, QueryFindOptions, QueryOptions } from "@cjp-back/shared";
import { FilterQuery, Model } from "mongoose";

export class MongoAPIService<T, TCreate, TUpdate>
  implements DatabaseDAO<T, TCreate, TUpdate>
{
  constructor(private readonly documentModel: Model<T>) {}

  public async find(
    queryConditions: FilterQuery<T> = {},
    options?: QueryFindOptions,
  ): Promise<T[]> {
    const selectPattern = "-__v";
    const finedEntities = await this.documentModel
      .find(queryConditions)
      .select(selectPattern)
      .skip(options?.skip || 0)
      .limit(options?.limit || 0)
      .sort(options?.sort)
      .populate(options?.populate || []);

    return finedEntities;
  }

  public async createOne(
    newDocument: TCreate,
    options?: QueryOptions,
  ): Promise<T> {
    const createdEntity = await this.documentModel.create(newDocument);
    const entity = this.documentModel
      .findById(createdEntity._id)
      .populate(options?.populate || []);
    return entity as T;
  }

  public async findById(id: string, options?: QueryOptions): Promise<T> {
    const selectPattern = "-__v";
    const finedEntity = await this.documentModel
      .findById(id)
      .populate(options?.populate || [])
      .select(selectPattern);

    return finedEntity as T;
  }

  public async deleteById(id: string): Promise<void> {
    await this.documentModel.deleteOne({ _id: id });
  }

  public async updateOne(
    queryConditions: FilterQuery<T>,
    updateDocument: TUpdate,
    options?: QueryOptions,
  ): Promise<T> {
    const updatedEntity = await this.documentModel.findOneAndUpdate(
      queryConditions,
      updateDocument!,
      options,
    );

    return updatedEntity as T;
  }

  public updateById(
    id: string,
    updateDocument: TUpdate,
    options?: QueryOptions,
  ): Promise<T> {
    return this.updateOne({ _id: id }, updateDocument, options);
  }
}
