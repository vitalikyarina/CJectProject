import { Injectable } from "@nestjs/common";
import { ElementHandle } from "playwright";
import { from, Observable, switchMap } from "rxjs";
import { Logger } from "../logger.service";
import { CJPQueue, FPromise, FSHelperService, VOID } from "@cjp-back/shared";
import fs from "fs";
import { ResourceType } from "@cjp/shared/comic";
import { launchPlaywright } from "crawlee";
import {
  ChapterModel,
  ChapterService,
  ComicModel,
  ComicService,
} from "@cjp-back/comic";

interface IChapterImageData {
  complete: boolean;
  naturalHeight: number;
  naturalWidth: number;
}

@Injectable()
export class ComicProcessorChapterHelperService {
  // constructor(
  //   private readonly comicService: ComicService,
  //   private readonly comicChapterService: ChapterService,
  //   private readonly fsHelper: FSHelperService,
  //   private readonly logger: ComicLoggerService,
  // ) {}
  // public startParsingChapters(id: string, comicDir: string): Observable<void> {
  //   return this.comicService.findById(id).pipe(
  //     switchMap((comic: ComicModel) => {
  //       const chapters = comic.chapters;
  //       return from(this.load(chapters, comicDir));
  //     }),
  //     switchMap(() => VOID),
  //   );
  // }
  // protected async load(
  //   chapters: ChapterModel[],
  //   comicDir: string,
  // ): Promise<void> {
  //   const queue = new CJPQueue(5);
  //   chapters
  //     .filter((chp) => {
  //       return (
  //         !chp.isLoaded ||
  //         chp.isError ||
  //         !this.chapterHasAllImages(chp, `${comicDir}/${chp.number}`)
  //       );
  //     })
  //     .map((chp) => {
  //       queue.add(this.parseComicChapterFabric(chp, comicDir));
  //     });
  //   await queue.start();
  // }
  // protected chapterHasAllImages(chapter: ChapterEntity, path: string): boolean {
  //   const files: string[] = this.fsHelper.getFilesFromDir(path);
  //   return chapter.countPage === files.length;
  // }
  // protected parseComicChapterFabric(
  //   chapter: ChapterEntity,
  //   comicDir: string,
  // ): FPromise<void> {
  //   return () => this.parseComicChapter(chapter, comicDir);
  // }
  // protected async parseComicChapter(
  //   chapter: ChapterEntity,
  //   comicDir: string,
  //   step = 0,
  // ): Promise<void> {
  //   this.logger.debug(
  //     `Start parsing chapter ${chapter.number} ${
  //       ResourceType[chapter.resource.type]
  //     }`,
  //   );
  //   const comicSite = chapter.resource.siteData;
  //   const browser = await launchPlaywright({
  //     launchOptions: { args: ["--disable-web-security"] },
  //   });
  //   try {
  //     const page = await browser.newPage();
  //     const chapterPath = `${comicDir}/${chapter.number}`;
  //     this.fsHelper.createDirIfNot(chapterPath);
  //     await page.goto(chapter.link, {
  //       timeout: 60000,
  //       waitUntil: "networkidle",
  //     });
  //     if (comicSite.chapterLazyLoadPath) {
  //       await page.waitForSelector(comicSite.chapterLazyLoadPath);
  //       await page.$eval(
  //         comicSite.chapterLazyLoadPath,
  //         (btn: HTMLAnchorElement) => {
  //           btn.click();
  //         },
  //       );
  //       await page.waitForLoadState("networkidle");
  //     }
  //     await page.mouse.wheel(0, 15000);
  //     await page.waitForTimeout(5000);
  //     await page.waitForSelector(comicSite.chapterImagesPath);
  //     const elements = (await page.$$(
  //       comicSite.chapterImagesPath,
  //     )) as ElementHandle<HTMLImageElement>[];
  //     const chaptersData: IChapterImageData[] = [];
  //     for (let i = 0; i < elements.length; i++) {
  //       const element = elements[i];
  //       await element.evaluate((img) => {
  //         img.scrollIntoView();
  //       });
  //       const chapterData = await this.getChapterImagesData(element);
  //       chaptersData.push(chapterData);
  //     }
  //     const updateChapterData: ChapterUpdateDTO = {};
  //     const imagesLoadStatus = this.getImagesLoadStatus(chaptersData);
  //     const lastErrorEqualCurrent = this.getLastErrorEqualCurrent(
  //       chaptersData,
  //       chapter.errorPages,
  //     );
  //     if (imagesLoadStatus) {
  //       this.logger.debug("Can't load images");
  //       if (step < 10 && !lastErrorEqualCurrent) {
  //         throw new Error("Error");
  //       }
  //       updateChapterData.errorPages = {};
  //       for (let i = 0; i < chaptersData.length; i++) {
  //         if (
  //           !chaptersData[i].complete ||
  //           !chaptersData[i].naturalHeight ||
  //           !chaptersData[i].naturalWidth
  //         ) {
  //           updateChapterData.errorPages[i] = true;
  //         }
  //       }
  //     } else {
  //       updateChapterData.errorPages = null;
  //     }
  //     const imagesElements = await page.$$(comicSite.chapterImagesPath);
  //     updateChapterData.countPage = imagesElements.length;
  //     for (let i = 0; i < imagesElements.length; i++) {
  //       const element = imagesElements[i];
  //       if (!updateChapterData.errorPages || !updateChapterData.errorPages[i]) {
  //         const imsPath = `${chapterPath}/${i}.jpg`;
  //         if (!fs.existsSync(imsPath)) {
  //           await element.evaluate((elem: HTMLImageElement) => {
  //             const link = elem.src;
  //             fetch(link)
  //               .then((res) => res.blob())
  //               .then((blob) => {
  //                 const a = document.createElement("a");
  //                 a.href = URL.createObjectURL(blob);
  //                 a.download = "image.jpg";
  //                 document.body.appendChild(a);
  //                 a.click();
  //                 document.body.removeChild(a);
  //               });
  //           });
  //           const download = await page.waitForEvent("download");
  //           await download.saveAs(imsPath);
  //           await this.delay(100);
  //         }
  //       } else {
  //         this.logger.debug("No image № " + i);
  //       }
  //     }
  //     updateChapterData.isLoaded = true;
  //     await this.comicChapterService
  //       .updateOne({ _id: chapter._id }, updateChapterData)
  //       .toPromise();
  //     await page.close();
  //     await browser.close();
  //   } catch (e) {
  //     console.log(e);
  //     await browser.close();
  //     await this.parseComicChapter(chapter, comicDir, step + 1);
  //   }
  // }
  // protected delay(ms): Promise<void> {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  // protected async getChapterImagesData(
  //   elem: ElementHandle<HTMLImageElement>,
  //   step = 0,
  // ): Promise<IChapterImageData> {
  //   const data = await elem.evaluate((img) => {
  //     img.scrollIntoView();
  //     return {
  //       complete: img.complete,
  //       naturalHeight: img.naturalHeight,
  //       naturalWidth: img.naturalWidth,
  //     };
  //   });
  //   if (!data.complete && step < 10) {
  //     await elem.evaluate((img) => {
  //       img.scrollIntoView();
  //     });
  //     return await this.getChapterImagesData(elem, step + 1);
  //   }
  //   return data;
  // }
  // protected getImagesLoadStatus(chaptersData: IChapterImageData[]): boolean {
  //   return (
  //     !chaptersData.length ||
  //     chaptersData.some(
  //       (item) => !item.complete || !item.naturalHeight || !item.naturalWidth,
  //     )
  //   );
  // }
  // protected getLastErrorEqualCurrent(
  //   statusData: IChapterImageData[],
  //   errorPages: Record<number, boolean>,
  // ): boolean {
  //   return statusData
  //     .map((item, i) => i)
  //     .filter((i) => {
  //       return (
  //         !statusData[i].complete ||
  //         !statusData[i].naturalHeight ||
  //         !statusData[i].naturalWidth
  //       );
  //     })
  //     .every((i) => {
  //       return errorPages && errorPages[+i];
  //     });
  // }
}
