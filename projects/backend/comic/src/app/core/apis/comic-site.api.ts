import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicSchemaName } from "../enums";
import { SiteCreateDTO, SiteModel, SiteUpdateDTO } from "../models";
import { BaseMongoAPIService } from "@cjp-back/mongo";
import { SiteDocument } from "../schemas";

@Injectable()
export class SiteAPI extends BaseMongoAPIService<
  SiteModel,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchemaName.COMICS_SITE)
    protected readonly model: Model<SiteDocument>,
  ) {
    super(model);
  }
}
