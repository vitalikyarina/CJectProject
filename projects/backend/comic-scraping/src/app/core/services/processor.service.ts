import { Injectable } from "@nestjs/common";
import { Logger } from "./logger.service";
import { ConfigService } from "@nestjs/config";
import {
  ComicProcessorChapterHelperService,
  ProcessorHelperService,
  ProcessorResourceHelperService,
} from "./comic-processor";
import { ComicModel, ComicService } from "@cjp-back/comic";
import { CScrapingEnvironment } from "../enums";
import { ComicStatus } from "@cjp/shared/comic";

@Injectable()
export class ProcessorService {
  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigService,
    private readonly comicChapterHelper: ComicProcessorChapterHelperService,
    private readonly resourceHelper: ProcessorResourceHelperService,
    private readonly comicHelper: ProcessorHelperService,
    private readonly comicService: ComicService,
  ) {}

  async startComicScraping(comicId: string): Promise<void> {
    const IMAGE_FOLDER = this.config.get(CScrapingEnvironment.IMAGE_FOLDER);
    const comic = await this.comicService.findById(comicId);

    this.logger.debug("Start parsing - " + comic.name);
    const COMIC_DIR = `${IMAGE_FOLDER}\\comics\\${comic._id}`;
    if (this.comicHelper.checkScrapingStatus(comic)) {
      if (comic.status === ComicStatus.DROPPED) {
        this.logger.debug("Deleting all comic chapters");
        await this.comicHelper.clearComicData(comic, COMIC_DIR);
      }

      return;
    }
    await this.startResourcesScraping(comic);
    // this.comicChapterHelper.startParsingChapters(
    //   comic._id,
    //   comicDir,
    // );

    this.logger.debug("End parsing - " + comic.name);
  }

  async startResourcesScraping(comic: ComicModel): Promise<void> {
    const resources = comic.resources;
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];

      this.logger.debug(
        `Parsing type - ${resource.site.name} ${resource.type || "normal"}`,
      );

      const chaptersByResource =
        await this.resourceHelper.getResourceScrapingData(resource, comic._id);
      console.log(chaptersByResource);

      // await this.resourceHelper.getComicAndCheckChapters(
      //   comic._id,
      //   chaptersByResource,
      //   COMIC_DIR,
      // );
    }
  }
}
