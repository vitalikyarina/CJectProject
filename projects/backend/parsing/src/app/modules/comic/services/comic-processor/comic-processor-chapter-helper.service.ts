import { Injectable } from "@nestjs/common";
import { Browser, ElementHandle, Page } from "playwright";
import {
  catchError,
  concat,
  defer,
  delay,
  forkJoin,
  from,
  Observable,
  of,
  switchMap,
  toArray,
} from "rxjs";
import { ComicLoggerService } from "../comic-logger.service";
import { BrowserHelperService, closeBrowser, final } from "@cjp-back/browser";
import {
  ChapterEntity,
  ChapterService,
  ChapterUpdateDTO,
  ComicEntity,
  ComicService,
  SiteEntity,
} from "@cjp-back/mongo/comic";
import { FSHelperService, VOID } from "@cjp-back/shared";

interface IComicChapterImageData {
  complete: boolean;
  naturalHeight: number;
  naturalWidth: number;
}

@Injectable()
export class ComicProcessorChapterHelperService {
  constructor(
    private readonly comicService: ComicService,
    private readonly comicChapterService: ChapterService,
    private readonly fsHelper: FSHelperService,
    private readonly logger: ComicLoggerService,
    private readonly browserHelper: BrowserHelperService,
  ) {}

  public startParsingChapters(id: string, comicDir: string): Observable<void> {
    return this.comicService.findById(id).pipe(
      switchMap((comic: ComicEntity) => {
        const chapters = comic.chapters;

        const loadChapters$ = chapters
          .filter((chp) => {
            return (
              !chp.isLoaded ||
              chp.isError ||
              !this.chapterHasAllImages(chp, `${comicDir}/${chp.number}`)
            );
          })
          .map((chp) => defer(() => this.parseComicChapter(chp, comicDir)));

        const returnLoadChapters$ = loadChapters$.length
          ? concat(...loadChapters$)
          : of(null);

        return returnLoadChapters$.pipe(toArray());
      }),
      switchMap(() => VOID),
    );
  }

  protected chapterHasAllImages(chapter: ChapterEntity, path: string): boolean {
    const files: string[] = this.fsHelper.getFilesFromDir(path);
    return chapter.countPage === files.length;
  }

  protected parseComicChapter(
    chapter: ChapterEntity,
    comicDir: string,
    step = 0,
  ): Observable<void> {
    this.logger.debug(
      `Start parsing chapter ${chapter.number} ${chapter.resource.type}`,
    );

    const comicSite = chapter.resource.siteData;

    const browser$ = this.browserHelper.getBrowser(comicSite.browserType);

    return browser$.pipe(
      switchMap((browser) => {
        return this.parseComicChapterCreatePage(
          browser,
          chapter,
          comicDir,
          step,
        ).pipe(
          final(),
          catchError((e) => {
            console.log(e);

            return from(browser.close()).pipe(
              switchMap(() =>
                this.parseComicChapter(chapter, comicDir, step + 1),
              ),
            );
          }),
          closeBrowser(browser),
        );
      }),
    );
  }

  protected parseComicChapterCreatePage(
    browser: Browser,
    chapter: ChapterEntity,
    comicDir: string,
    step: number,
  ): Observable<void> {
    console.log("parseComicChapterCreatePage");

    return from(browser.newPage()).pipe(
      switchMap((page: Page) => {
        return this.parseComicChapterLoadPage(
          page,
          chapter,
          comicDir,
          step,
        ).pipe(
          switchMap(() => {
            return from(page.close()).pipe(switchMap(() => VOID));
          }),
        );
      }),
    );
  }

  protected parseComicChapterLoadPage(
    page: Page,
    chapter: ChapterEntity,
    comicDir: string,
    step: number,
  ): Observable<void> {
    console.log("parseComicChapterLoadPage");

    const comicSite = chapter.resource.siteData;
    const chapterPath = `${comicDir}/${chapter.number}`;
    this.fsHelper.createDirIfNot(chapterPath);

    return from(
      page.goto(chapter.link, {
        timeout: 60000,
        waitUntil: "networkidle",
      }),
    ).pipe(
      switchMap(() => {
        if (comicSite.chapterLazyLoadPath) {
          return from(page.waitForSelector(comicSite.chapterLazyLoadPath)).pipe(
            switchMap(() =>
              from(
                page.$eval(
                  comicSite.chapterLazyLoadPath,
                  (btn: HTMLAnchorElement) => {
                    btn.click();
                  },
                ),
              ),
            ),
          );
        }
        return VOID;
      }),
      switchMap(() => {
        return page.waitForLoadState("networkidle");
      }),
      switchMap(() => {
        return page.waitForSelector(comicSite.chapterImagesPath);
      }),
      switchMap(() => {
        return page.waitForTimeout(5000);
      }),
      switchMap(() => {
        return this.getComicChaptersImageStatus(page, comicSite);
      }),
      switchMap((data) => {
        return this.parsingComicChaptersImage(
          page,
          data,
          chapter,
          chapterPath,
          step,
        );
      }),
      switchMap(() => VOID),
    );
  }

  protected getComicChaptersImageStatus(
    page: Page,
    comicSite: SiteEntity,
  ): Observable<IComicChapterImageData[]> {
    console.log("getComicChaptersImageStatus");

    return from(page.$$(comicSite.chapterImagesPath)).pipe(
      switchMap((elements: ElementHandle<HTMLImageElement>[]) => {
        const data = elements.map((elem) => {
          return from(
            defer(() =>
              elem.evaluate((img) => {
                img.scrollIntoView();
              }),
            ),
          ).pipe(
            switchMap(() => {
              return this.getChapterImagesData(elem);
            }),
          );
        });

        return forkJoin(data);
      }),
    );
  }

  protected getChapterImagesData(
    elem: ElementHandle<HTMLImageElement>,
    step = 0,
  ): Observable<IComicChapterImageData> {
    return from(
      elem.evaluate((img) => {
        img.scrollIntoView();
        return {
          complete: img.complete,
          naturalHeight: img.naturalHeight,
          naturalWidth: img.naturalWidth,
        };
      }),
    ).pipe(
      switchMap((data) => {
        if (!data.complete && step < 10) {
          return of(
            elem.evaluate((img) => {
              img.scrollIntoView();
            }),
          ).pipe(
            delay(50),
            switchMap(() => {
              return this.getChapterImagesData(elem, step + 1);
            }),
          );
        }
        return of(data);
      }),
    );
  }

  protected parsingComicChaptersImage(
    page: Page,
    statusData: IComicChapterImageData[],
    chapter: ChapterEntity,
    chapterPath: string,
    step: number,
  ): Observable<void> {
    console.log("parsingComicChaptersImage");

    const comicSite = chapter.resource.siteData;
    const updateChapterData: ChapterUpdateDTO = {};

    const imagesStatus =
      !statusData.length ||
      statusData.some(
        (item) => !item.complete || !item.naturalHeight || !item.naturalWidth,
      );

    const lastErrorEqualCurrent = this.getLastErrorEqualCurrent(
      statusData,
      chapter.errorPages,
    );

    if (imagesStatus) {
      this.logger.debug("Can't load images");
      if (step < 10 && !lastErrorEqualCurrent) {
        throw new Error("Error");
      }

      updateChapterData.errorPages = {};
      for (let i = 0; i < statusData.length; i++) {
        if (
          !statusData[i].complete ||
          !statusData[i].naturalHeight ||
          !statusData[i].naturalWidth
        ) {
          updateChapterData.errorPages[i] = true;
        }
      }
    } else {
      updateChapterData.errorPages = null;
    }

    const imgElements = page.$$(comicSite.chapterImagesPath);

    const imgElements$ = from(imgElements).pipe(
      switchMap((elements) => {
        updateChapterData.countPage = elements.length;
        const downloadingImages$ = [];
        elements.map((elem, i) => {
          if (
            !updateChapterData.errorPages ||
            !updateChapterData.errorPages[i]
          ) {
            downloadingImages$.push(
              defer(() =>
                this.makeScreenshotFromElem(elem, `${chapterPath}/${i}.jpg`),
              ),
            );
          } else {
            this.logger.debug("No image № " + i);
          }
        });
        return concat(...downloadingImages$).pipe(toArray());
      }),
    );

    return imgElements$.pipe(
      switchMap(() => {
        updateChapterData.isLoaded = true;
        return this.comicChapterService.updateOne(
          { _id: chapter._id },
          updateChapterData,
        );
      }),
      switchMap(() => VOID),
    );
  }

  protected getLastErrorEqualCurrent(
    statusData: IComicChapterImageData[],
    errorPages: Record<number, boolean>,
  ): boolean {
    return statusData
      .map((item, i) => i)
      .filter((i) => {
        return (
          !statusData[i].complete ||
          !statusData[i].naturalHeight ||
          !statusData[i].naturalWidth
        );
      })
      .every((i) => {
        return errorPages && errorPages[+i];
      });
  }

  protected makeScreenshotFromElem(
    elem: ElementHandle,
    path: string,
  ): Observable<unknown> {
    return from(elem.screenshot({ path: path, quality: 90 })).pipe(
      catchError(() => {
        return this.makeScreenshotFromElem(elem, path);
      }),
    );
  }
}
