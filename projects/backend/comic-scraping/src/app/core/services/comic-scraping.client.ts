import { BaseClientProxy } from "@cjp-back/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { COMIC_SCRAPING_MICROSERVICE } from "../tokens";
import { Comic } from "@cjp-back/comic";
import { ComicScrapingCommand } from "../enums";

@Injectable()
export class ComicScrapingClientProxy extends BaseClientProxy {
  constructor(
    @Inject(COMIC_SCRAPING_MICROSERVICE) protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  public async addComicScraping(comic: Comic): Promise<void> {
    await lastValueFrom(this.emit(ComicScrapingCommand.ADD, comic));
  }
}
