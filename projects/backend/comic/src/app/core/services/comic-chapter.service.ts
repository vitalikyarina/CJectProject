import { Injectable } from "@nestjs/common";
import { ChapterAPI } from "../apis";
import { BaseMongoService } from "@cjp-back/mongo";
import { ChapterCreateDTO, ChapterModel, ChapterUpdateDTO } from "../models";
@Injectable()
export class ChapterService extends BaseMongoService<
  ChapterModel,
  ChapterCreateDTO,
  ChapterUpdateDTO
> {
  constructor(private readonly api: ChapterAPI) {
    super(api);
  }
}
