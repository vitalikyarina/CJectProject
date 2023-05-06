import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComicSchema } from "../enums";
import { ComicSiteDocument } from "../schemas";
import {
  ComicSiteCreateDTO,
  ComicSiteEntity,
  ComicSiteUpdateDTO,
} from "../models";
import { BaseMongoAPIService } from "@cjp-back/mongo";

@Injectable()
export class ComicSiteAPIService extends BaseMongoAPIService<
  ComicSiteEntity,
  ComicSiteCreateDTO,
  ComicSiteUpdateDTO
> {
  constructor(
    @InjectModel(ComicSchema.COMICS_SITE)
    protected readonly model: Model<ComicSiteDocument>,
  ) {
    super(model);
  }
}
