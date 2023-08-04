import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { Logger } from "./logger.service";
import { ComicQueue, ComicQueuesProcess } from "../enums";
import { Comic } from "@cjp-back/comic";

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(ComicQueue.COMIC) private queue: Queue,
    private logger: Logger,
  ) {}

  public async cleanQueue(): Promise<void> {
    const count = await this.queue.count();
    await this.queue.clean(100, count, "wait");
  }

  public async startComicsScraping(comics: Comic[]): Promise<void> {
    this.logger.debug("Start parsing comics...");
    this.logger.debug(`Count of comics = ${comics.length}`);
    for (let i = 0; i < comics.length; i++) {
      await this.queue.add(ComicQueuesProcess.COMIC_PARSING, comics[i]._id);
    }
  }
}
