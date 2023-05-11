import { Injectable } from "@nestjs/common";
import { ChapterAPIService } from "../api";
import { BaseMongoService } from "@cjp-back/mongo";
import { ChapterCreateDTO, ChapterEntity, ChapterUpdateDTO } from "../models";
@Injectable()
export class ChapterService extends BaseMongoService<
  ChapterEntity,
  ChapterCreateDTO,
  ChapterUpdateDTO
> {
  constructor(private readonly api: ChapterAPIService) {
    super(api);
  }
}
