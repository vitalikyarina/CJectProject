import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Comic,
  ComicCreateDTO,
  ComicDocument,
  ComicUpdateDTO,
} from "../schemas";
import { ComicSchemaName } from "../enums";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ComicAPI extends BaseMongoAPIService<
  Comic,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchemaName.COMIC)
    protected readonly model: Model<ComicDocument>,
  ) {
    super(model);
  }
}
