import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Chapter,
  ChapterCreateDTO,
  ChapterDocument,
  ChapterUpdateDTO,
} from "../schemas";
import { MongoAPIService } from "@cjp-back/mongo";
import { SchemaName } from "../enums";

@Injectable()
export class ChapterAPI extends MongoAPIService<
  Chapter,
  ChapterCreateDTO,
  ChapterUpdateDTO
> {
  constructor(
    @InjectModel(SchemaName.COMICS_CHAPTER)
    protected readonly model: Model<ChapterDocument>,
  ) {
    super(model);
  }
}
