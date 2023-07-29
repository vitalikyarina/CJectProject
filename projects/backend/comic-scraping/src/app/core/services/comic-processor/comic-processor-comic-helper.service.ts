import { ChapterService, ComicModel, ComicService } from "@cjp-back/comic";
import { FSHelperService } from "@cjp-back/shared";
import { ComicStatus } from "@cjp/shared/comic";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProcessorHelperService {
  constructor(
    private readonly comicService: ComicService,
    private readonly comicChapterService: ChapterService,
    private readonly fsHelper: FSHelperService,
  ) {}

  public checkScrapingStatus(comic: ComicModel): boolean {
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
    comic: ComicModel,
    comicFolder: string,
  ): Promise<ComicModel> {
    const chapters = comic.chapters;
    chapters.map(
      async (chapter) => await this.comicChapterService.deleteOne(chapter._id),
    );

    const badComic = await this.comicService.updateOne(
      { _id: comic._id },
      { chapters: [] },
    );
    this.fsHelper.deleteFolder(comicFolder);

    return badComic;
  }
}
