import { Injectable, inject } from "@angular/core";
import { IBaseApiService } from "@cjp-front/shared";
import { Observable } from "rxjs";
import { ComicDTO, ComicEntity } from "../models";
import { ApiComicService } from "../api";

@Injectable()
export class ComicService
  implements IBaseApiService<ComicEntity, ComicDTO, ComicDTO>
{
  private readonly comicApiService = inject(ApiComicService);

  public getAll(): Observable<ComicEntity[]> {
    return this.comicApiService.getAll();
  }

  public getById(id: string): Observable<ComicEntity> {
    return this.comicApiService.getById(id);
  }

  public createOne(data: ComicDTO): Observable<ComicEntity> {
    return this.comicApiService.createOne(data);
  }

  public updateOneById(
    id: string,
    updateEntity: ComicDTO,
  ): Observable<ComicEntity> {
    return this.comicApiService.updateOneById(id, updateEntity);
  }
}
