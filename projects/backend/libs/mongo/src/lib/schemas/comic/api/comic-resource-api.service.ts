import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicSchemaName } from "../enums";
import {
  ResourceCreateDTO,
  ResourceEntity,
  ResourceUpdateDTO,
} from "../models";
import { ResourceDocument } from "../schemas";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ResourceAPIService extends BaseMongoAPIService<
  ResourceEntity,
  ResourceCreateDTO,
  ResourceUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchemaName.COMICS_RESOURCE)
    protected readonly model: Model<ResourceDocument>,
  ) {
    super(model);
  }
}
