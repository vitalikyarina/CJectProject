import { Controller, Inject } from "@nestjs/common";

import { IFindOptions } from "@cjp-back/shared";
import { MessagePattern } from "@nestjs/microservices";
import { ClientProxy } from "@cjp-back/comic-scraping/microservice";
import {
  Comic,
  ComicCreateWithResourcesDTO,
  ComicService,
  ComicUpdateWithResDTO,
} from "@cjp-back/comic";
import { ComicCommand } from "@cjp-back/comic/microservice";

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
    populate: [
      { path: "chapters" },
      { path: "resources", populate: [{ path: "site" }] },
    ],
  };

  @Inject()
  protected readonly scrapingProxy: ClientProxy;

  @Inject() private readonly comicService: ComicService;

  @MessagePattern(ComicCommand.GET_ALL)
  getEntities(): Promise<Comic[]> {
    return this.comicService.find({}, this.findOptions);
  }

  @MessagePattern(ComicCommand.CREATE)
  async createEntity(createData: ComicCreateWithResourcesDTO): Promise<Comic> {
    const comic = await this.comicService.createOneWithResources(createData);
    this.scrapingProxy.emitScrapingEvent(comic);
    return comic;
  }

  @MessagePattern(ComicCommand.UPDATE)
  async updateEntity(updateData: IUpdateData): Promise<Comic> {
    return this.comicService.updateOneByIdWithRes(
      updateData.id,
      updateData.data,
    );
  }
}
