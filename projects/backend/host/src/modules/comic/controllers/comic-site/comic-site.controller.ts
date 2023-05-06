import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable, toArray } from "rxjs";
import { ComicController } from "../../enums";
import {
  SiteCreateDTO,
  SiteEntity,
  SiteService,
  SiteUpdateDTO,
} from "@cjp-back/mongo/comic";

@ApiTags("Comic Sites")
@Controller(ComicController.COMIC_SITES)
export class ComicSiteController {
  constructor(private readonly comicSiteService: SiteService) {}

  @ApiOkResponse({
    type: SiteEntity,
    isArray: true,
  })
  @Get("")
  public getEntities(): Observable<SiteEntity[]> {
    return this.comicSiteService.find({}).pipe(toArray());
  }

  @ApiOkResponse({
    type: SiteEntity,
  })
  @Get(":id")
  public getEntityById(@Param("id") id: string): Observable<SiteEntity> {
    return this.comicSiteService.findById(id);
  }

  @ApiOkResponse({
    type: SiteEntity,
  })
  @Post("")
  public createEntity(
    @Body() newEntity: SiteCreateDTO,
  ): Observable<SiteEntity> {
    return this.comicSiteService.createOne(newEntity);
  }

  @ApiOkResponse({
    type: SiteEntity,
  })
  @Put(":id")
  public updateEntityById(
    @Param("id") id: string,
    @Body() updateData: SiteUpdateDTO,
  ): Observable<SiteEntity> {
    return this.comicSiteService.updateOneById(id, updateData);
  }
}
