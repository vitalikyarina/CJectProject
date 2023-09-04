import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoAPIService } from "@cjp-back/mongo";
import { SchemaName } from "../enums";
import { Site, SiteCreateDTO, SiteDocument, SiteUpdateDTO } from "../schemas";

@Injectable()
export class SiteAPI extends MongoAPIService<
  Site,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor(
    @InjectModel(SchemaName.COMICS_SITE)
    protected readonly model: Model<SiteDocument>,
  ) {
    super(model);
  }
}
