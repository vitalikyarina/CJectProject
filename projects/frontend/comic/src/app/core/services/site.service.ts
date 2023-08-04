import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { SiteCreateDTO, SiteModel, SiteUpdateDTO } from "../models";
import { IBaseApiService } from "@cjp-front/shared";
import { ApiSiteService } from "../api";

@Injectable()
export class SiteService
  implements IBaseApiService<SiteModel, SiteCreateDTO, SiteUpdateDTO>
{
  private readonly comicSiteApiService = inject(ApiSiteService);

  public getAll(): Observable<SiteModel[]> {
    return this.comicSiteApiService.getAll().pipe();
  }

  public getById(id: string): Observable<SiteModel> {
    return this.comicSiteApiService.getById(id);
  }

  public createOne(data: SiteCreateDTO): Observable<SiteModel> {
    return this.comicSiteApiService.createOne(data);
  }

  public updateOneById(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateEntity: SiteUpdateDTO,
  ): Observable<SiteModel> {
    throw new Error("Method not implemented.");
  }
}
