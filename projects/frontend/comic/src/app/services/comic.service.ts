import { Injectable } from "@angular/core";
import { IBaseApiService } from "@cjp-front/shared";
import { Observable } from "rxjs";
import { ComicDTO, ComicEntity } from "../core/models";
import { ApiComicService } from "../core/api";

@Injectable()
export class ComicService
  implements IBaseApiService<ComicEntity, ComicDTO, ComicDTO>
{
  constructor(private readonly comicApiService: ApiComicService) {}

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
