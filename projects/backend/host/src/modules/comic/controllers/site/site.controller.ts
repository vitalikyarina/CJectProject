import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable, toArray } from "rxjs";
import { ComicControllerName } from "../../enums";
import {
  SiteClientProxy,
  SiteCreateDTO,
  SiteModel,
  SiteService,
  SiteUpdateDTO,
} from "@cjp-back/comic";

@ApiTags("Comic Sites")
@Controller(ComicControllerName.COMIC_SITES)
export class SiteController {
  constructor(private client: SiteClientProxy) {}

  @ApiOkResponse({
    type: SiteModel,
    isArray: true,
  })
  @Get("")
  public getEntities(): Observable<SiteModel[]> {
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
