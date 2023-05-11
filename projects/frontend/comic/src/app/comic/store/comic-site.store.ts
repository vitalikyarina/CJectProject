import { Injectable } from "@angular/core";
import { BaseArrayStore } from "@cjp-front/shared";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../core/models";
import { ComicSiteService } from "../services";

@Injectable({
  providedIn: "platform",
})
export class SiteStore extends BaseArrayStore<
  SiteEntity,
  SiteCreateDTO,
  SiteUpdateDTO,
  "_id"
> {
  constructor(private service: ComicSiteService) {
    super({
      idKey: "_id",
      apiService: service,
    });
  }
}
