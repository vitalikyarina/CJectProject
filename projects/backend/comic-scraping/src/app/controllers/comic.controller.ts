import { Controller, Inject } from "@nestjs/common";

import { EventPattern } from "@nestjs/microservices";
import { ComicScrapingCommand, QueueService } from "../core";
import { Comic } from "@cjp-back/comic";

@Controller()
export class ComicController {
  @Inject() private readonly queue: QueueService;

  @EventPattern(ComicScrapingCommand.ADD)
  async addComicScraping(comic: Comic): Promise<void> {
    await this.queue.startComicsScraping([comic]);
  }
}
