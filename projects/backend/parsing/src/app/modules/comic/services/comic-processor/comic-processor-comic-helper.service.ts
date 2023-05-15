import {
  ChapterService,
  ComicEntity,
  ComicService,
} from "@cjp-back/mongo/comic";
import { FSHelperService } from "@cjp-back/shared";
import { ComicStatus } from "@cjp/shared/comic";
import { Injectable } from "@nestjs/common";
import { Observable, forkJoin, switchMap, tap } from "rxjs";

@Injectable()
export class ComicProcessorComicHelperService {
  constructor(
    private readonly comicService: ComicService,
    private readonly comicChapterService: ChapterService,
    private readonly fsHelper: FSHelperService,
  ) {}

  public needStopParsing(comic: ComicEntity): boolean {
    if (!comic) {
      return true;
    }
    if (comic.status === ComicStatus.COMPLETE) {
      return true;
    }
    if (comic.status === ComicStatus.BAD) {
      return true;
    }
    return false;
  }

  public deleteAllComicChapters(
    comic: ComicEntity,
    comicDir: string,
  ): Observable<ComicEntity> {
    const chapters = comic.chapters;
    const chapters$ = chapters.map((chapter) =>
      this.comicChapterService.deleteOne(chapter._id),
    );
    return forkJoin(chapters$).pipe(
      switchMap(() => {
        return this.comicService.updateOne(
          { _id: comic._id },
          { chapters: [] },
        );
      }),
      tap(() => {
        this.fsHelper.deleteDir(comicDir);
      }),
    );
  }
}
