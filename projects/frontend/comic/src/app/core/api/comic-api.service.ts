import { Injectable } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { ComicDTO, ComicEntity } from "../models";
import { ComicsApi } from "../enums";

@Injectable()
export class ApiComicService extends BaseApiService<
  ComicEntity,
  ComicDTO,
  ComicDTO
> {
  protected override apiPath: string = ComicsApi.COMICS;
}
