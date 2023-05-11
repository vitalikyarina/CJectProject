import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../models";
import { ComicsApi } from "../enums";

@Injectable({
  providedIn: "root",
})
export class ApiComicSiteService extends BaseApiService<
  SiteEntity,
  SiteCreateDTO,
  SiteUpdateDTO
> {
  constructor(private readonly injector: Injector) {
    super(injector, ComicsApi.COMIC_SITE);
  }
}
