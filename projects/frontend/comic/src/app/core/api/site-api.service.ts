import { Injectable } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { SiteCreateDTO, SiteModel, SiteUpdateDTO } from "../models";
import { ComicsApi } from "../enums";

@Injectable()
export class ApiSiteService extends BaseApiService<
  SiteModel,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  protected override apiPath: string = ComicsApi.COMIC_SITE;
}
