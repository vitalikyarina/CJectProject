import { Injectable, inject } from "@angular/core";
import { IBaseApiService } from "@cjp-front/shared";
import { Observable } from "rxjs";
import { ComicDTO, ComicModel } from "../models";
import { ApiComicService } from "../api";

@Injectable()
export class ComicService
  implements IBaseApiService<ComicModel, ComicDTO, ComicDTO>
{
  private readonly comicApiService = inject(ApiComicService);

  public getAll(): Observable<ComicModel[]> {
    return this.comicApiService.getAll();
  }

  public getById(id: string): Observable<ComicModel> {
    return this.comicApiService.getById(id);
  }

  public createOne(data: ComicDTO): Observable<ComicModel> {
    return this.comicApiService.createOne(data);
  }

  public updateOneById(
    id: string,
    updateEntity: ComicDTO,
  ): Observable<ComicModel> {
    return this.comicApiService.updateOneById(id, updateEntity);
  }
}
