import { Injectable } from "@nestjs/common";
import { SiteCreateDTO, SiteModel, SiteUpdateDTO } from "../models";
import { BaseMongoService } from "@cjp-back/mongo";
import { SiteAPI } from "../apis";

@Injectable()
export class SiteService extends BaseMongoService<
  SiteModel,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor(protected readonly api: SiteAPI) {
    super(api);
  }
}
