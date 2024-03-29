import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicSchemaName } from "../enums";
import { SiteDocument } from "../schemas";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../models";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class SiteAPIService extends BaseMongoAPIService<
  SiteEntity,
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
