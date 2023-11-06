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
import { MongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ResourceAPI extends MongoAPIService<
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
