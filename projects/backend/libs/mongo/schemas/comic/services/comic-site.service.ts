import { Injectable } from "@nestjs/common";
import { ComicSiteAPIService } from "../api";
import {
  ComicSiteCreateDTO,
  ComicSiteEntity,
  ComicSiteUpdateDTO,
} from "../models";
import { BaseMongoService } from "@cjp-back/mongo";

@Injectable()
export class ComicSiteService extends BaseMongoService<
  ComicSiteEntity,
  ComicSiteCreateDTO,
  ComicSiteUpdateDTO
> {
  constructor(private readonly api: ComicSiteAPIService) {
    super(api);
  }
}
