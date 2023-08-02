import { Injectable } from "@angular/core";
import { BaseApiService } from "@cjp-front/shared";
import { ComicDTO, ComicModel } from "../models";
import { ComicsApi } from "../enums";

@Injectable()
export class ApiComicService extends BaseApiService<
  ComicModel,
  ComicDTO,
  ComicDTO
> {
  protected override apiPath: string = ComicsApi.COMICS;
}
