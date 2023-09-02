import { BaseClientProxy } from "@cjp-back/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy as CProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { Comic } from "@cjp-back/comic";
import { COMIC_SCRAPING_MICROSERVICE } from "../tokens";
import { ComicScrapingEvent } from "../enums";

@Injectable()
export class ClientProxy extends BaseClientProxy {
  constructor(
    @Inject(COMIC_SCRAPING_MICROSERVICE) protected readonly client: CProxy,
  ) {
    super(client);
  }

  public async emitScrapingEvent(comic: Comic): Promise<void> {
    await lastValueFrom(this.emit(ComicScrapingEvent.ADD, comic));
  }
}
