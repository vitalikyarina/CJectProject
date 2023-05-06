import { Injectable } from "@nestjs/common";
import { SiteAPIService } from "../api";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../models";
import { BaseMongoService } from "@cjp-back/mongo";

@Injectable()
export class SiteService extends BaseMongoService<
  SiteEntity,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor(private readonly api: SiteAPIService) {
    super(api);
  }
}
