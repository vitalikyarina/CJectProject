import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Site, SiteService } from "@cjp-back/comic";
import { SiteCommand } from "@cjp-back/comic/microservice";

@Controller()
export class SiteController {
  @Inject() private readonly siteService: SiteService;
  constructor() {}

  @MessagePattern(SiteCommand.GET_ALL)
  public getEntities(): Promise<Site[]> {
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
