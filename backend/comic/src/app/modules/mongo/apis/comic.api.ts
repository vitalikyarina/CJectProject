import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Comic,
  ComicCreateDTO,
  ComicDocument,
  ComicUpdateDTO,
} from "../schemas";
import { SchemaName } from "../enums";
import { MongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ComicAPI extends MongoAPIService<
  Comic,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  constructor(
    @InjectModel(SchemaName.COMIC)
    protected readonly model: Model<ComicDocument>,
  ) {
    super(model);
  }
}
