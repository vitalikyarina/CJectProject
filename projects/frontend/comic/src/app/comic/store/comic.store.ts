import { Injectable } from "@angular/core";
import { BaseArrayStore } from "@cjp-front/shared";
import { ComicCreateDTO, ComicEntity, ComicUpdateDTO } from "../core/models";
import { ComicService } from "../services";

@Injectable({
  providedIn: "platform",
})
export class ComicStore extends BaseArrayStore<
  ComicEntity,
  ComicCreateDTO,
  ComicUpdateDTO,
  "_id"
> {
  constructor(protected service: ComicService) {
    super({
      idKey: "_id",
      apiService: service,
    });
  }
}
