import { Injectable } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../models";
import { ComicsApi } from "../enums";

@Injectable()
export class ApiComicSiteService extends BaseApiService<
  SiteEntity,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor() {
    super(ComicsApi.COMIC_SITE);
  }
}
