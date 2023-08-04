import { Injectable } from "@nestjs/common";
import { BaseMongoService } from "@cjp-back/mongo";
import { SiteAPI } from "../apis";
import { Site, SiteCreateDTO, SiteUpdateDTO } from "../schemas";

@Injectable()
export class SiteService extends BaseMongoService<
  Site,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor(protected readonly api: SiteAPI) {
    super(api);
  }
}
