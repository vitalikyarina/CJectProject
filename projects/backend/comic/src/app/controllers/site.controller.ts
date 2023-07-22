import { Controller } from "@nestjs/common";
import { SiteCommand, SiteModel, SiteService } from "../core";
import { MessagePattern } from "@nestjs/microservices";
import { Observable, toArray } from "rxjs";

@Controller()
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @MessagePattern(SiteCommand.GET_ALL)
  public getEntities(): Observable<SiteModel[]> {
    return this.siteService.find({}).pipe(toArray());
  }

  //   public getEntityById(@Param("id") id: string): Observable<SiteEntity> {
  //     return this.siteService.findById(id);
  //   }

  //   public createEntity(
  //     @Body() newEntity: SiteCreateDTO,
  //   ): Observable<SiteEntity> {
  //     return this.siteService.createOne(newEntity);
  //   }

  //   public updateEntityById(
  //     @Param("id") id: string,
  //     @Body() updateData: SiteUpdateDTO,
  //   ): Observable<SiteEntity> {
  //     return this.siteService.updateOneById(id, updateData);
  //   }
}
