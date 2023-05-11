import { Injectable } from "@nestjs/common";
import { defer, Observable, switchMap, take, tap } from "rxjs";
import { ComicLoggerService } from "./comic-logger.service";
import { ConfigService } from "@nestjs/config";
import {
  ComicProcessorChapterHelperService,
  ComicProcessorComicHelperService,
  ComicProcessorResourceHelperService,
} from "./comic-processor";
import { ComicEntity, ComicService } from "@cjp-back/mongo/comic";

@Injectable()
export class ComicProcessorHelperService {
  constructor(
    private readonly logger: ComicLoggerService,
    private readonly config: ConfigService,
    private readonly comicChapterHelper: ComicProcessorChapterHelperService,
    private readonly comicResourceHelper: ComicProcessorResourceHelperService,
    private readonly comicHelper: ComicProcessorComicHelperService,
    private readonly comicService: ComicService,
  ) {}

  public startParsingComic(comic: ComicEntity): Observable<unknown> {
    this.logger.debug("Start parsing - " + comic.name);

    const rootDir = this.config.get("IMAGE_PATH");
    return this.comicService.findById(comic._id).pipe(
      take(1),
      switchMap((foundComic) => {
        const comic = foundComic;
        const comicDir = `${rootDir}\\${comic._id}`;
        if (this.comicHelper.needStopParsing(comic)) {
          this.logger.debug("Deleting all comic chapters");
          return this.comicHelper.deleteAllComicChapters(comic, comicDir);
        }

        return this.getDeferStartParsingResource(comic, comicDir);
      }),
      tap(() => {
        this.logger.debug("End parsing - " + comic.name);
      }),
    );
  }

  protected getDeferStartParsingResource(
    comic: ComicEntity,
    comicDir: string,
  ): Observable<void> {
    return defer((): Observable<void> => {
      return this.getStartParsingResource(comic, comicDir);
    });
  }

  private getStartParsingResource(
    comic: ComicEntity,
    comicDir: string,
  ): Observable<void> {
    return this.comicResourceHelper.startParsingResource(comic, comicDir).pipe(
      switchMap(() => {
        return this.comicChapterHelper.startParsingChapters(
          comic._id,
          comicDir,
        );
      }),
    );
  }
}
