import { Injectable } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { ComicCreateDTO, ComicEntity, ComicUpdateDTO } from "../models";
import { ComicsApi } from "../enums";

@Injectable()
export class ApiComicService extends BaseApiService<
  ComicEntity,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  constructor() {
    super(ComicsApi.COMICS);
  }
}
