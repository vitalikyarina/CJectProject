import { IBaseDatabaseDAO, QueryFindOptions } from "@cjp-back/shared";
import { FilterQuery, Model } from "mongoose";

export class BaseMongoAPIService<T, TCreate, TUpdate>
  implements IBaseDatabaseDAO<T, TCreate, TUpdate>
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
    options?: QueryFindOptions,
  ): Promise<T> {
    const createdEntity = await this.documentModel.create(newDocument);
    const entity = this.documentModel
      .findById(createdEntity._id)
      .populate(options?.populate || []);
    return entity as T;
  }

  public async findById(id: string, options?: QueryFindOptions): Promise<T> {
    const selectPattern = "-__v";
    const finedEntity = await this.documentModel
      .findById(id)
      .populate(options?.populate || [])
      .select(selectPattern);

    return finedEntity as T;
  }

  public async deleteOneById(id: string): Promise<void> {
    await this.documentModel.deleteOne({ _id: id });
  }

  public async updateOne(
    queryConditions: FilterQuery<T>,
    updateData: TUpdate,
  ): Promise<T> {
    const updatedEntity = await this.documentModel.findOneAndUpdate(
      queryConditions,
      updateData!,
    );

    return updatedEntity as T;
  }

  public updateOneById(id: string, updateData: TUpdate): Promise<T> {
    return this.updateOne({ _id: id }, updateData);
  }
}
