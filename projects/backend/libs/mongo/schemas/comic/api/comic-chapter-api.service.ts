import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChapterDocument } from "../schemas";
import { BaseMongoAPIService } from "@cjp-back/mongo";
import { ChapterCreateDTO, ChapterEntity, ChapterUpdateDTO } from "../models";
import { ComicSchema } from "../enums";

@Injectable()
export class ChapterAPIService extends BaseMongoAPIService<
  ChapterEntity,
  ChapterCreateDTO,
  ChapterUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchema.COMICS_CHAPTER)
    protected readonly model: Model<ChapterDocument>,
  ) {
    super(model);
  }
}
