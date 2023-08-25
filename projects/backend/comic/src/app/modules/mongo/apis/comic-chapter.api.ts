import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Chapter,
  ChapterCreateDTO,
  ChapterDocument,
  ChapterUpdateDTO,
} from "../schemas";
import { BaseMongoAPIService } from "@cjp-back/mongo";
import { SchemaName } from "../enums";

@Injectable()
export class ChapterAPI extends BaseMongoAPIService<
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
