import { Controller, Inject } from "@nestjs/common";

import { EventPattern } from "@nestjs/microservices";
import { QueueService } from "../core";
import { Comic } from "@cjp-back/comic";
import { ComicScrapingEvent } from "@cjp-back/comic-scraping/microservice";

@Controller()
export class ComicController {
  @Inject() private readonly queue: QueueService;

  @EventPattern(ComicScrapingEvent.ADD)
  async comicScraping(comic: Comic): Promise<void> {
    await this.queue.addComics([comic]);
  }
}
