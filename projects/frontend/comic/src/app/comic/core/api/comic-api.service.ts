import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { ComicCreateDTO, ComicEntity, ComicUpdateDTO } from "../models";
import { ComicsApi } from "../enums";

@Injectable({
  providedIn: "root",
})
export class ApiComicService extends BaseApiService<
  ComicEntity,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  constructor(private readonly injector: Injector) {
    super(injector, ComicsApi.COMICS);
  }
}
