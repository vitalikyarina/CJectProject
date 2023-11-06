import { ChapterService, Comic, ComicService } from "@cjp-back/comic";
import { FSService } from "@cjp-back/shared";
import { ComicStatus } from "@cjp/comic";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProcessorHelperService {
  constructor(
    private readonly comicService: ComicService,
    private readonly comicChapterService: ChapterService,
    private readonly fsHelper: FSService,
  ) {}

  public checkScrapingStatus(comic: Comic): boolean {
    if (!comic) {
      return true;
    }
    if (comic.status === ComicStatus.COMPLETE) {
      return true;
    }
    if (comic.status === ComicStatus.DROPPED) {
      return true;
    }
    return false;
  }

  public async clearComicData(
    comic: Comic,
    comicFolder: string,
  ): Promise<Comic> {
    const chapters = comic.chapters;
    chapters.map(
      async (chapter) => await this.comicChapterService.deleteById(chapter._id),
    );

    const badComic = await this.comicService.updateOne(
      { _id: comic._id },
      { chapters: [] },
    );
    this.fsHelper.deleteFolder(comicFolder);

    return badComic;
  }
}
