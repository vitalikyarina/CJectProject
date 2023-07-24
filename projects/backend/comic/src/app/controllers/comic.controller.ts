import { Body, Controller, Param } from "@nestjs/common";

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
  getEntities(): Promise<ComicModel[]> {
    return this.comicService.find({}, this.findOptions);
  }

  @MessagePattern(ComicCommand.CREATE)
  createEntity(
    @Body() createData: ComicCreateWithResourcesDTO,
  ): Promise<ComicModel> {
    return this.comicService.createOneWithResources(createData);
  }

  // updateEntity(
  //   @Param("id") id: string,
  //   @Body() updateData: ComicUpdateDTO,
  // ): Observable<ComicModel> {
  //   return this.comicService.updateOneById(id, updateData);
  // }
}
