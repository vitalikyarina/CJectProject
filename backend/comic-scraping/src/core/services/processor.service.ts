import { Inject, Injectable } from "@nestjs/common";
import { Logger } from "./logger.service";
import { ConfigService } from "@nestjs/config";
import {
  ComicProcessorChapterHelperService,
  ProcessorHelperService,
  ProcessorResourceHelperService,
} from "./comic-processor";
import { Comic, ComicService } from "@cjp-back/comic";
import { EnvironmentVars } from "../../modules/configuration/enums";
import { ComicStatus, ResourceType } from "@cjp/comic";

@Injectable()
export class ProcessorService {
  @Inject() private readonly logger: Logger;
  @Inject() private readonly resourceHelper: ProcessorResourceHelperService;

  IMAGE_FOLDER: string;

  constructor(
    protected readonly config: ConfigService,
    private readonly comicChapterHelper: ComicProcessorChapterHelperService,
    private readonly comicHelper: ProcessorHelperService,
    private readonly comicService: ComicService,
  ) {
    this.IMAGE_FOLDER = this.config.get(EnvironmentVars.IMAGE_FOLDER)!;
  }

  async startComicScraping(comicId: string): Promise<void> {
    const comic = await this.comicService.findById(comicId, {
      populate: [
        {
          path: "chapters",
          populate: [{ path: "resource", populate: [{ path: "site" }] }],
        },
        {
          path: "resources",
          populate: [
            {
              path: "site",
            },
          ],
        },
      ],
    });

    const COMIC_FOLDER = `${this.IMAGE_FOLDER}\\comics\\${comic._id}`;
    this.logger.debug("Start parsing - " + comic.name);
    if (this.comicHelper.checkScrapingStatus(comic)) {
      if (comic.status === ComicStatus.DROPPED) {
        this.logger.debug("Deleting all comic chapters");
        await this.comicHelper.clearComicData(comic, COMIC_FOLDER);
      }

      return;
    }
    await this.startResourcesScraping(comic);

    await this.startChaptersScraping(comic);

    this.logger.debug("End parsing - " + comic.name);
  }

  async startResourcesScraping(comic: Comic): Promise<void> {
    const resources = comic.resources;
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];

      this.logger.debug(
        `Parsing type - ${resource.site.name} ${
          ResourceType[resource.type] || "normal"
        }`,
      );

      await this.resourceHelper.getResourceScrapingData(resource, comic._id);
    }
  }

  async startChaptersScraping(comic: Comic): Promise<void> {
    const COMIC_FOLDER = `${this.IMAGE_FOLDER}\\comics\\${comic._id}`;
    await this.comicChapterHelper.startParsingChapters(comic._id, COMIC_FOLDER);
  }
}
