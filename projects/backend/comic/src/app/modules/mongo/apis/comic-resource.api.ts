import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SchemaName } from "../enums";
import {
  Resource,
  ResourceCreateDTO,
  ResourceDocument,
  ResourceUpdateDTO,
} from "../schemas";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ResourceAPI extends BaseMongoAPIService<
  Resource,
  ResourceCreateDTO,
  ResourceUpdateDTO
> {
  constructor(
    @InjectModel(SchemaName.COMICS_RESOURCE)
    protected readonly model: Model<ResourceDocument>,
  ) {
    super(model);
  }
}
