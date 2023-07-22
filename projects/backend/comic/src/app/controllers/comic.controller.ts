import { Body, Controller, Param } from "@nestjs/common";

import { Observable, toArray } from "rxjs";
import { IFindOptions } from "@cjp-back/shared";
import { MessagePattern } from "@nestjs/microservices";
import {
  ComicCommand,
  ComicCreateWithResourcesDTO,
  ComicModel,
  ComicService,
  ComicUpdateDTO,
} from "../core";

@Controller()
export class ComicController {
  private readonly findOptions: IFindOptions = {
    sort: {
      latestUpdate: "desc",
    },
  };

  constructor(private readonly comicService: ComicService) {}

  @MessagePattern(ComicCommand.GET_ALL)
  getEntities(): Observable<ComicModel[]> {
    return this.comicService.find({}, this.findOptions).pipe(toArray());
  }

  @MessagePattern(ComicCommand.CREATE)
  createEntity(
    @Body() createData: ComicCreateWithResourcesDTO,
  ): Observable<ComicModel> {
    return this.comicService.createOneWithResources(createData);
  }

  updateEntity(
    @Param("id") id: string,
    @Body() updateData: ComicUpdateDTO,
  ): Observable<ComicModel> {
    return this.comicService.updateOneById(id, updateData);
  }
}
