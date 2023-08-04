import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicSchemaName } from "../enums";
import { BaseMongoAPIService } from "@cjp-back/mongo";
import { Site, SiteCreateDTO, SiteDocument, SiteUpdateDTO } from "../schemas";

@Injectable()
export class SiteAPI extends BaseMongoAPIService<
  Site,
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
