import { Controller } from "@nestjs/common";
import { SiteCommand, SiteModel, SiteService } from "../core";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @MessagePattern(SiteCommand.GET_ALL)
  public getEntities(): Promise<SiteModel[]> {
    return this.siteService.find({});
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
