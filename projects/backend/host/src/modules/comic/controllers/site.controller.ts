import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { ComicControllerName } from "../enums";
import { Site } from "@cjp-back/comic";
import { SiteClientProxy } from "@cjp-back/comic/microservice";

@ApiTags("Comic Sites")
@Controller(ComicControllerName.COMIC_SITES)
export class SiteController {
  constructor(private client: SiteClientProxy) {}

  @ApiOkResponse({
    type: Site,
    isArray: true,
  })
  @Get("")
  public getEntities(): Observable<Site[]> {
    return this.client.getAllSites();
  }
  // @ApiOkResponse({
  //   type: SiteModel,
  // })
  // @Get(":id")
  // public getEntityById(@Param("id") id: string): Observable<SiteModel> {
  //   return this.siteService.findById(id);
  // }
  // @ApiOkResponse({
  //   type: SiteModel,
  // })
  // @Post("")
  // public createEntity(@Body() newEntity: SiteCreateDTO): Observable<SiteModel> {
  //   return this.siteService.createOne(newEntity);
  // }
  // @ApiOkResponse({
  //   type: SiteModel,
  // })
  // @Put(":id")
  // public updateEntityById(
  //   @Param("id") id: string,
  //   @Body() updateData: SiteUpdateDTO,
  // ): Observable<SiteModel> {
  //   return this.siteService.updateOneById(id, updateData);
  // }
}
