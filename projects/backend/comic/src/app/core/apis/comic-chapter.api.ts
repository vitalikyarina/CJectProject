import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChapterDocument } from "../schemas";
import { BaseMongoAPIService } from "@cjp-back/mongo";
import { ChapterCreateDTO, ChapterModel, ChapterUpdateDTO } from "../models";
import { ComicSchemaName } from "../enums";

@Injectable()
export class ChapterAPI extends BaseMongoAPIService<
  ChapterModel,
  ChapterCreateDTO,
  ChapterUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchemaName.COMICS_CHAPTER)
    protected readonly model: Model<ChapterDocument>,
  ) {
    super(model);
  }
}
