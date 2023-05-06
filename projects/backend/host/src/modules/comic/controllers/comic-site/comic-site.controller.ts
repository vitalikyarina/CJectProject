import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable, toArray } from "rxjs";
import { ComicController } from "../../enums";
import {
  ComicSiteCreateDTO,
  ComicSiteEntity,
  ComicSiteService,
  ComicSiteUpdateDTO,
} from "@cjp-back/mongo/comic";

@ApiTags("Comic Sites")
@Controller(ComicController.COMIC_SITES)
export class ComicSiteController {
  constructor(private readonly comicSiteService: ComicSiteService) {}

  @ApiOkResponse({
    type: ComicSiteEntity,
    isArray: true,
  })
  @Get("")
  public getEntities(): Observable<ComicSiteEntity[]> {
    return this.comicSiteService.find({}).pipe(toArray());
  }

  @ApiOkResponse({
    type: ComicSiteEntity,
  })
  @Get(":id")
  public getEntityById(@Param("id") id: string): Observable<ComicSiteEntity> {
    return this.comicSiteService.findById(id);
  }

  @ApiOkResponse({
    type: ComicSiteEntity,
  })
  @Post("")
  public createEntity(
    @Body() newEntity: ComicSiteCreateDTO,
  ): Observable<ComicSiteEntity> {
    return this.comicSiteService.createOne(newEntity);
  }

  @ApiOkResponse({
    type: ComicSiteEntity,
  })
  @Put(":id")
  public updateEntityById(
    @Param("id") id: string,
    @Body() updateData: ComicSiteUpdateDTO,
  ): Observable<ComicSiteEntity> {
    return this.comicSiteService.updateOneById(id, updateData);
  }
}
