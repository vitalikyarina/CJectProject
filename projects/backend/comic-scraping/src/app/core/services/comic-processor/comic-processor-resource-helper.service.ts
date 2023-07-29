import { Injectable } from "@nestjs/common";
import { Browser, ElementHandle, Page } from "playwright";
import { Logger } from "../logger.service";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FSHelperService } from "@cjp-back/shared";
import { BrowserHelperService } from "@cjp-back/browser";
import { ResourceError } from "@cjp/shared/comic";
import { existsSync, unlinkSync } from "fs";
import {
  ChapterCreateDTO,
  ChapterService,
  ChapterScrapingDTO,
  ComicModel,
  ComicService,
  ComicUpdateDTO,
  ResourceModel,
  ResourceService,
} from "@cjp-back/comic";
import { ConfigService } from "@nestjs/config";
import { CScrapingEnvironment } from "../../enums";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

interface IScrapingData {
  postImage?: string;
  chapters: ChapterScrapingDTO[];
}

interface IScrapingChapters {
  newChapters: ChapterCreateDTO[];
  oldChapters: { id: string; number: number }[];
}

@Injectable()
export class ProcessorResourceHelperService {
  IMAGE_FOLDER: string;

  constructor(
    private readonly logger: Logger,
    private readonly browser: BrowserHelperService,
    private readonly resourceService: ResourceService,
    private readonly comicChapterService: ChapterService,
    private readonly fsHelper: FSHelperService,
    private readonly comicService: ComicService,
    private readonly config: ConfigService,
  ) {
    this.IMAGE_FOLDER = this.config.get(CScrapingEnvironment.IMAGE_FOLDER);
  }

  async getResourceScrapingData(
    resource: ResourceModel,
    comicId: string,
    step = 0,
  ): Promise<IScrapingData> {
    const browser = await this.browser.getBrowser();
    try {
      const scrapingData = await this.startResourceScraping(
        browser,
        resource,
        comicId,
      );

      return scrapingData;
    } catch (e) {
      this.logger.error(e);
      if (step < 10)
        return this.getResourceScrapingData(resource, comicId, step + 1);
      return {
        chapters: [],
      };
    } finally {
      await browser.close();
    }
  }

  protected async startResourceScraping(
    browser: Browser,
    resource: ResourceModel,
    comicId: string,
  ): Promise<IScrapingData> {
    const scrapingData: IScrapingData = {
      chapters: [],
    };
    const site = resource.site;
    const link = `${site.baseLink}${resource.path}`;

    const page = await browser.newPage();
    await page.goto(link, {
      timeout: 60000,
      waitUntil: "networkidle",
    });

    if (await this.isErroredLink(page, link, resource._id)) {
      return scrapingData;
    }

    const mainImage = await this.getResourceImage(page, resource, comicId);

    if (mainImage) {
      scrapingData.postImage = mainImage;
    }

    const chapters = await this.getResourceChapters(page, resource);
    scrapingData.chapters = chapters;

    await page.close();

    return scrapingData;
  }

  protected async getResourceImage(
    page: Page,
    resource: ResourceModel,
    comicId: string,
  ): Promise<string | undefined> {
    const mainImagePath = `${this.IMAGE_FOLDER}\\comics\\${comicId}\\post.jpg`;
    const mainImagePathWeb = `${this.IMAGE_FOLDER}\\comics\\${comicId}\\post.webp`;

    if (!existsSync(mainImagePathWeb)) {
      await this.browser.downloadImgFromPage(
        page,
        resource.site.mainImagePath,
        mainImagePath,
      );

      await this.fsHelper.sharpToWebP(mainImagePath, mainImagePathWeb);

      unlinkSync(mainImagePath);

      return `/comics/${comicId}/post.webp`;
    }
  }

  protected async getResourceChapters(
    page: Page,
    resource: ResourceModel,
  ): Promise<Array<ChapterScrapingDTO>> {
    const comicSite = resource.site;
    const chapterElems = (await page.$$(comicSite.chaptersPath)).reverse();

    const chapters = [];

    for (let i = 0; i < chapterElems.length; i++) {
      const chapter = chapterElems[i];
      const nameContainer = await chapter.$(comicSite.chapterNamePath);
      const dateContainer = await chapter.$(comicSite.chapterDatePath);

      const chp = {
        number: await this.getChapterNumber(nameContainer),
        path: await this.getChapterLink(nameContainer, resource),
        date: await this.getChapterDate(dateContainer, comicSite.dateFormat),
        resource: resource,
      };

      if (chp.number > -1) {
        chapters.push(chp);
      }
    }

    return chapters;
  }

  protected async isErroredLink(
    page: Page,
    link: string,
    id: string,
  ): Promise<boolean> {
    let pageUrl = page.url();

    if (pageUrl[pageUrl.length - 1] === "/") {
      pageUrl = pageUrl.slice(0, -1);
    }

    if (pageUrl !== link) {
      await this.resourceService.updateOne(
        { _id: id },
        { errorType: ResourceError.WRONG_LINK },
      );

      return true;
    }

    return false;
  }

  protected async getChapterNumber(
    element: ElementHandle<HTMLElement | SVGElement>,
  ): Promise<number> {
    const chpName = await element.innerText();
    const chpNum = chpName.match(/\d+(\.\d+)?/g);
    if (chpNum) {
      return +chpNum[0] || -1;
    }
    return -1;
  }

  protected async getChapterLink(
    element: ElementHandle<HTMLElement | SVGElement>,
    resource: ResourceModel,
  ): Promise<string> {
    let link = await element.getAttribute("href");

    if (link[link.length - 1] === "/") {
      link = link.slice(0, -1);
    }

    const basePath = resource.site.baseLink + resource.path;

    return link.replace(basePath, "");
  }

  protected async getChapterDate(
    element: ElementHandle<HTMLElement | SVGElement>,
    format: string,
  ): Promise<number> {
    const now = new Date();
    const nowDate = dayjs(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    )
      .utc(true)
      .toDate();

    if (element) {
      const stringDate = await element.innerText();
      if (stringDate.length < 6) {
        return +nowDate;
      }

      const date = dayjs(stringDate, format).utc(true).toDate();

      return +date || +nowDate;
    }

    return +nowDate;
  }

  async getComicAndCheckChapters(
    id: string,
    chaptersData: ChapterScrapingDTO[],
    comicDir: string,
  ): Promise<void> {
    const comic = await this.comicService.findById(id);
    const chaptersCheckedData = this.checkChapters(comic, chaptersData);
    const chapters = comic.chapters;
    const lastUpdateDate = this.getMaxLastUpdateDateFromChapters(
      chaptersCheckedData.newChapters,
    );

    const updateChaptersIds: string[] = chapters.map((chp) => chp._id);

    for (let i = 0; i < chaptersCheckedData.oldChapters.length; i++) {
      const oldChp = chaptersCheckedData.oldChapters[i];
      await this.comicChapterService.deleteOne(oldChp.id);
      this.fsHelper.deleteFolder(`${comicDir}\\${oldChp.number}`);
      const dltIndex = updateChaptersIds.findIndex(
        (delChpId) => delChpId === oldChp.id,
      );
      updateChaptersIds.splice(dltIndex, 1);
    }

    for (let i = 0; i < chaptersCheckedData.newChapters.length; i++) {
      const chp = chaptersCheckedData.newChapters[i];
      const newChp = await this.comicChapterService.createOne(chp);
      updateChaptersIds.push(newChp._id);
    }

    const comicUpdateDate: ComicUpdateDTO = {
      chapters: updateChaptersIds,
      postImage: `assets/comics/${comic._id}/main.webp`,
    };

    if (!comic.latestUpdate || lastUpdateDate > comic.latestUpdate) {
      comicUpdateDate.latestUpdate = lastUpdateDate;
    }

    await this.comicService.updateOne({ _id: comic._id }, comicUpdateDate);

    await this.sortComicChapters(comic._id);

    console.log(chaptersCheckedData, lastUpdateDate);
  }

  protected checkChapters(
    comic: ComicModel,
    chaptersData: ChapterScrapingDTO[],
  ): IScrapingChapters {
    const chapters = comic.chapters;
    const newChapters: ChapterCreateDTO[] = [];
    const oldChapters: { id: string; number: number }[] = [];

    for (let i = 0; i < chaptersData.length; i++) {
      const chapter = chaptersData[i];

      const findChapterIndex = chapters.findIndex(
        (chp) => chp.number === chapter.number,
      );

      const findOldChapter = chapters[findChapterIndex];

      if (findChapterIndex === -1) {
        newChapters.push(this.getNeedProdForComicChapterCreate(chapter));
      } else {
        if (findOldChapter.resource.priority > chapter.resource.priority) {
          newChapters.push(this.getNeedProdForComicChapterCreate(chapter));
          oldChapters.push({
            id: findOldChapter._id,
            number: findOldChapter.number,
          });
        } else if (
          findOldChapter.resource.priority === chapter.resource.priority &&
          this.updatedRecently(chapter.date)
        ) {
          newChapters.push(this.getNeedProdForComicChapterCreate(chapter));
          oldChapters.push({
            id: findOldChapter._id,
            number: findOldChapter.number,
          });
        }
      }
    }

    return { newChapters, oldChapters };
  }

  protected getNeedProdForComicChapterCreate(
    chapter: ChapterScrapingDTO,
  ): ChapterCreateDTO {
    return {
      number: chapter.number,
      path: chapter.path,
      date: chapter.date,
      resource: chapter.resource._id,
    };
  }

  protected updatedRecently(date: number): boolean {
    const day = 1000 * 60 * 60 * 24;
    const leftDate = Date.now() - day;
    if (date > leftDate) return true;
    return false;
  }

  protected getMaxLastUpdateDateFromChapters(
    chapters: ChapterCreateDTO[],
  ): number {
    return chapters.length
      ? Math.max(...chapters.map((chp) => chp.date))
      : null;
  }

  protected async sortComicChapters(id: string): Promise<ComicModel> {
    const finedComic = await this.comicService.findById(id);
    const chapters = finedComic.chapters;
    const sortChapters: string[] = chapters
      .sort((a, b) => a.number - b.number)
      .map((chp) => chp._id);
    return this.comicService.updateOne(
      { _id: finedComic._id },
      { chapters: sortChapters },
    );
  }
}
