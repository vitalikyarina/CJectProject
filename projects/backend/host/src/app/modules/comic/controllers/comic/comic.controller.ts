import { Body, Controller, Get, Post } from "@nestjs/common";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable, toArray } from "rxjs";
import { ComicControllerName } from "../../enums";
import {
  ComicCreateWithResourcesDTO,
  ComicEntity,
  ComicService,
} from "@cjp-back/mongo/comic";

@ApiTags("Comics")
@Controller(ComicControllerName.COMIC)
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @ApiOkResponse({
    type: ComicEntity,
    isArray: true,
  })
  @Get("")
  public getEntities(): Observable<ComicEntity[]> {
    return this.comicService
      .find(
        {},
        {
          sort: {
            latestUpdate: "desc",
          },
        },
      )
      .pipe(toArray());
  }

  @ApiOkResponse({
    type: ComicEntity,
  })
  @Post("")
  public createEntity(
    @Body() newEntity: ComicCreateWithResourcesDTO,
  ): Observable<ComicEntity> {
    return this.comicService.createOneWithResources(newEntity);
  }
}
