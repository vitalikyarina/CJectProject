import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../core/models";
import { IBaseApiService } from "@cjp-front/shared";
import { ApiSiteService } from "../core/api";

@Injectable()
export class SiteService
  implements IBaseApiService<SiteEntity, SiteCreateDTO, SiteUpdateDTO>
{
  constructor(private readonly comicSiteApiService: ApiSiteService) {}

  public getAll(): Observable<SiteEntity[]> {
    return this.comicSiteApiService.getAll();
  }

  public getById(id: string): Observable<SiteEntity> {
    return this.comicSiteApiService.getById(id);
  }

  public createOne(data: SiteCreateDTO): Observable<SiteEntity> {
    return this.comicSiteApiService.createOne(data);
  }

  public updateOneById(
    id: string,
    updateEntity: SiteUpdateDTO,
  ): Observable<SiteEntity> {
    throw new Error("Method not implemented.");
  }
}
