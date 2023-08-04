import { Controller } from "@nestjs/common";

import { IFindOptions } from "@cjp-back/shared";
import { MessagePattern } from "@nestjs/microservices";
import {
  Comic,
  ComicCommand,
  ComicCreateWithResourcesDTO,
  ComicService,
  ComicUpdateWithResDTO,
} from "../core";

interface IUpdateData {
  id: string;
  data: ComicUpdateWithResDTO;
}

@Controller()
export class ComicController {
  private readonly findOptions: IFindOptions = {
    sort: {
      latestUpdate: "desc",
    },
  };

  constructor(private readonly comicService: ComicService) {}

  @MessagePattern(ComicCommand.GET_ALL)
  getEntities(): Promise<Comic[]> {
    return this.comicService.find({}, this.findOptions);
  }

  @MessagePattern(ComicCommand.CREATE)
  createEntity(createData: ComicCreateWithResourcesDTO): Promise<Comic> {
    return this.comicService.createOneWithResources(createData);
  }

  @MessagePattern(ComicCommand.UPDATE)
  async updateEntity(updateData: IUpdateData): Promise<Comic> {
    return this.comicService.updateOneByIdWithRes(
      updateData.id,
      updateData.data,
    );
  }
}
