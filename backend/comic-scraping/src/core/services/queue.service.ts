import { Inject, Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { Logger } from "./logger.service";
import { ComicQueue, ComicQueuesProcess } from "../enums";
import { Comic } from "@cjp-back/comic";

@Injectable()
export class QueueService {
  @Inject() private readonly logger: Logger;
  private readonly queue: Queue = new Queue(ComicQueue.COMIC);

  public async cleanQueue(): Promise<void> {
    await this.queue.drain();
  }

  public async addComics(comics: Comic[]): Promise<void> {
    this.logger.debug("Start parsing comics...");
    this.logger.debug(`Count of comics = ${comics.length}`);
    for (let i = 0; i < comics.length; i++) {
      await this.queue.add(ComicQueuesProcess.COMIC_PARSING, comics[i]._id);
    }
  }
}
