import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { ComicLoggerService } from "./comic-logger.service";
import { Observable, from, switchMap } from "rxjs";
import { ComicQueues, ComicQueuesProcess } from "../core";
import { ComicEntity } from "@cjp-back/mongo/comic";

@Injectable()
export class ComicQueuesService {
  constructor(
    @InjectQueue(ComicQueues.COMIC) private comicQueue: Queue,
    private comicLogger: ComicLoggerService,
  ) {}

  public cleanQueue(): Observable<unknown> {
    return from(this.comicQueue.count()).pipe(
      switchMap((count) => {
        return from(this.comicQueue.clean(100, count, "wait"));
      }),
    );
  }

  public parseComics(comics: ComicEntity[]): void {
    this.comicLogger.debug("Start parsing comics...");
    this.comicLogger.debug(`Count of comics = ${comics.length}`);
    for (let i = 0; i < comics.length; i++) {
      this.comicQueue.add(ComicQueuesProcess.COMIC_PARSING, comics[i]);
    }
  }
}
