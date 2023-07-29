import { IBaseDatabaseDAO, IFindOptions } from "@cjp-back/shared";
import { FilterQuery, Model } from "mongoose";

export class BaseMongoAPIService<T, TCreate, TUpdate>
  implements IBaseDatabaseDAO<T, TCreate, TUpdate>
{
  constructor(private readonly documentModel: Model<unknown>) {}

  public async find(
    queryConditions: FilterQuery<T> = {},
    options?: IFindOptions,
  ): Promise<T[]> {
    const selectPattern = "-__v";
    const finedEntities = await this.documentModel
      .find(queryConditions)
      .select(selectPattern)
      .skip(options?.skip || 0)
      .limit(options?.limit || 0)
      .sort(options?.sort)
      .populate(options?.populate || []);

    return finedEntities as T[];
  }

  public async createOne(newDocument: TCreate): Promise<T> {
    const createdEntity = await this.documentModel.create(newDocument);
    return createdEntity as T;
  }

  public async findById(id: string): Promise<T> {
    const selectPattern = "-__v";
    const finedEntity = await this.documentModel
      .findById(id)
      .select(selectPattern);

    return finedEntity as T;
  }

  public async deleteOne(id: string): Promise<T> {
    const deletedEntity = await this.documentModel.deleteOne({ _id: id });
    return deletedEntity as T;
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
