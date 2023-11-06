import { Inject, Injectable } from "@nestjs/common";
import { BaseMongoService } from "@cjp-back/mongo";
import { SiteAPI } from "../apis";
import { Site, SiteCreateDTO, SiteUpdateDTO } from "../schemas";

@Injectable()
export class SiteService extends BaseMongoService<
  Site,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  @Inject() protected override readonly api: SiteAPI;
}
