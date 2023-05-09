import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicDocument } from "../schemas";
import { ComicCreateDTO, ComicEntity, ComicUpdateDTO } from "../models";
import { ComicSchemaName } from "../enums";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ComicAPIService extends BaseMongoAPIService<
  ComicEntity,
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
