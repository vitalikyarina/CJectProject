import { Body, Controller, Get, Post } from "@nestjs/common";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable, toArray } from "rxjs";
import { ComicControllerName } from "../../enums";
import {
  ComicCreateWithResourcesDTO,
  ComicEntity,
  ComicService,
} from "@cjp-back/mongo/comic";
import { IFindOptions } from "@cjp-back/shared";

@ApiTags("Comics")
@Controller(ComicControllerName.COMICS)
export class ComicController {
  private readonly findOptions: IFindOptions = {
    sort: {
      latestUpdate: "desc",
    },
  };

  constructor(private readonly comicService: ComicService) {}

  @ApiOkResponse({
    type: ComicEntity,
    isArray: true,
  })
  @Get("")
  public getEntities(): Observable<ComicEntity[]> {
    return this.comicService.find({}, this.findOptions).pipe(toArray());
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
