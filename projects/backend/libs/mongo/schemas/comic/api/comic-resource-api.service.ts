import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicSchema } from "../enums";
import {
  ComicResourceCreateDTO,
  ComicResourceEntity,
  ComicResourceUpdateDTO,
} from "../models";
import { ComicResourceDocument } from "../schemas";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ComicResourceAPIService extends BaseMongoAPIService<
  ComicResourceEntity,
  ComicResourceCreateDTO,
  ComicResourceUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchema.COMICS_RESOURCE)
    protected readonly model: Model<ComicResourceDocument>,
  ) {
    super(model);
  }
}
