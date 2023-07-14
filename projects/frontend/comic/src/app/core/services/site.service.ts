import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { SiteCreateDTO, SiteEntity, SiteUpdateDTO } from "../models";
import { IBaseApiService } from "@cjp-front/shared";
import { ApiSiteService } from "../api";

@Injectable()
export class SiteService
  implements IBaseApiService<SiteEntity, SiteCreateDTO, SiteUpdateDTO>
{
  private readonly comicSiteApiService = inject(ApiSiteService);

  public getAll(): Observable<SiteEntity[]> {
    return this.comicSiteApiService.getAll().pipe();
  }

  public getById(id: string): Observable<SiteEntity> {
    return this.comicSiteApiService.getById(id);
  }

  public createOne(data: SiteCreateDTO): Observable<SiteEntity> {
    return this.comicSiteApiService.createOne(data);
  }

  public updateOneById(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateEntity: SiteUpdateDTO,
  ): Observable<SiteEntity> {
    throw new Error("Method not implemented.");
  }
}
