import { Injectable } from "@angular/core";
import { IBaseApiService } from "@cjp-front/shared";
import { Observable } from "rxjs";
import { ComicCreateDTO, ComicEntity, ComicUpdateDTO } from "../core/models";
import { ApiComicService } from "../core/api";

@Injectable({
  providedIn: "root",
})
export class ComicService
  implements IBaseApiService<ComicEntity, ComicCreateDTO, ComicUpdateDTO>
{
  constructor(private readonly comicApiService: ApiComicService) {}

  public getAll(): Observable<ComicEntity[]> {
    return this.comicApiService.getAll();
  }

  public getById(id: string): Observable<ComicEntity> {
    return this.comicApiService.getById(id);
  }

  public createOne(data: ComicCreateDTO): Observable<ComicEntity> {
    return this.comicApiService.createOne(data);
  }

  public updateOneById(
    id: string,
    updateEntity: ComicUpdateDTO,
  ): Observable<ComicEntity> {
    return this.comicApiService.updateOneById(id, updateEntity);
  }
}
