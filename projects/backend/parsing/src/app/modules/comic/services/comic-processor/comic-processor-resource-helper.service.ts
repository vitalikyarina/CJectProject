import { Injectable } from "@nestjs/common";
import { Browser, ElementHandle, Page, firefox } from "playwright";
import {
  catchError,
  concat,
  defer,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
} from "rxjs";
import { ComicLoggerService } from "../comic-logger.service";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FSHelperService, VOID } from "@cjp-back/shared";
import { BrowserHelperService, downloadImage, final } from "@cjp-back/browser";
import {
  ChapterCreateDTO,
  ChapterService,
  ChapterWithResourceCreateDTO,
  ComicEntity,
  ComicService,
  ComicUpdateDTO,
  ResourceEntity,
  ResourceService,
  SiteEntity,
} from "@cjp-back/mongo/comic";
import { ResourceError } from "@cjp/shared/comic";
import fs from "fs";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

interface IComicChaptersParsing {
  newChapters: ChapterCreateDTO[];
  oldChapters: { id: string; number: number }[];
}

@Injectable()
export class ComicProcessorResourceHelperService {
  constructor(
    private readonly logger: ComicLoggerService,
    private readonly browserHelper: BrowserHelperService,
    private readonly comicResourceService: ResourceService,
    private readonly comicChapterService: ChapterService,
    private readonly fsHelper: FSHelperService,
    private readonly comicService: ComicService,
  ) {}

  public startParsingResource(
    comic: ComicEntity,
    comicDir: string,
  ): Observable<void> {
    const resources = comic.resources;
    const comicResources$ = resources.map((resource) => {
      return this.getDeferParseComicResource(resource, comicDir).pipe(
        switchMap((resourceChapters: Array<ChapterWithResourceCreateDTO>) => {
          return this.getComicAndCheckChapters(
            comic._id,
            resourceChapters,
            comicDir,
          );
        }),
      );
    });

    return concat(...comicResources$).pipe(
      toArray(),
      switchMap(() => VOID),
    );
  }

  protected getDeferParseComicResource(
    resource: ResourceEntity,
    comicDir: string,
  ): Observable<Array<ChapterWithResourceCreateDTO>> {
    return defer(() => {
      return this.getParseComicResource(resource, comicDir);
    });
  }

  protected getParseComicResource(
    resource: ResourceEntity,
    comicDir: string,
  ): Observable<Array<ChapterWithResourceCreateDTO>> {
    return this.parseComicResource(resource, comicDir).pipe(
      map((chaptersRaw: ChapterWithResourceCreateDTO[]) => {
        return chaptersRaw.map((chapterRaw) => {
          chapterRaw.resource = resource;
          return chapterRaw;
        });
      }),
    );
  }

  protected parseComicResource(
    comicResource: ResourceEntity,
    comicDir: string,
    step = 0,
  ): Observable<Array<ChapterWithResourceCreateDTO>> {
    const siteData = comicResource.siteData;

    this.logger.debug(
      `Parsing type - ${siteData.name} ${comicResource.type || "normal"}`,
    );

    const browser$ = this.browserHelper.getBrowser$(siteData.browserType);

    return browser$.pipe(
      final(),
      switchMap((browser) => {
        return this.parseComicResourceCreatePage(
          browser,
          comicResource,
          comicDir,
        ).pipe(
          catchError((e) => {
            console.log(e);

            if (step < 10)
              return this.parseComicResource(comicResource, comicDir, step + 1);
            return of([]);
          }),
          switchMap((chaptersRaw: Array<ChapterWithResourceCreateDTO>) => {
            return from(browser.close()).pipe(switchMap(() => of(chaptersRaw)));
          }),
        );
      }),
    );
  }

  protected parseComicResourceCreatePage(
    browser: Browser,
    comicResource: ResourceEntity,
    comicDir: string,
  ): Observable<Array<ChapterWithResourceCreateDTO>> {
    return from(browser.newPage()).pipe(
      switchMap((page: Page) => {
        return this.parseComicResourceLoadPage(
          page,
          comicResource,
          comicDir,
        ).pipe(
          switchMap((chaptersRaw: Array<ChapterWithResourceCreateDTO>) => {
            return from(page.close()).pipe(switchMap(() => of(chaptersRaw)));
          }),
        );
      }),
    );
  }

  protected parseComicResourceLoadPage(
    page: Page,
    comicResource: ResourceEntity,
    comicDir: string,
  ): Observable<Array<Partial<ChapterWithResourceCreateDTO>>> {
    return from(
      page.goto(comicResource.link, {
        timeout: 60000,
        waitUntil: "networkidle",
      }),
    ).pipe(
      switchMap(() => {
        if (page.url() !== comicResource.link) {
          return this.comicResourceService
            .updateOne(
              { _id: comicResource._id },
              { errorType: ResourceError.LINK },
            )
            .pipe(toArray());
        }
        const mainImageDir = `${comicDir}\\main\\${comicResource._id}.jpg`;
        const comicSite = comicResource.siteData;
        return from(
          this.tempDownload(
            page,
            comicSite.mainImagePath,
            mainImageDir,
            comicSite.browserType,
          ),
        ).pipe(
          switchMap(() => {
            return this.parseComicResourceChapters(page, comicResource);
          }),
        );
      }),
    );
  }

  protected async tempDownload(
    page: Page,
    elementPath: string,
    fileDir: string,
    browserType: string,
  ): Promise<void> {
    if (!fs.existsSync(fileDir)) {
      if (browserType === "firefox") {
        const elem = await page.$(elementPath);
        await elem.screenshot({ path: fileDir });
        return;
      }
      const a = page.$eval(elementPath, (elem: HTMLImageElement) => {
        const link = elem.src;
        fetch(link)
          .then((res) => res.blob())
          .then((blob) => {
            const a = document.createElement("a");

            a.href = URL.createObjectURL(blob);
            a.download = "image.jpg";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
      });
      const [download] = await Promise.all([
        page.waitForEvent("download"), // wait for download to start
        a,
      ]);
      await download.saveAs(fileDir);
    }
  }

  protected parseComicResourceChapters(
    page: Page,
    comicResource: ResourceEntity,
  ): Observable<Array<Partial<ChapterWithResourceCreateDTO>>> {
    const comicSite = comicResource.siteData;
    return from(page.$$(comicSite.chaptersPath)).pipe(
      switchMap((chapters: Array<ElementHandle<HTMLElement>>) => {
        chapters = chapters.reverse();
        const chaptersInfo$ = forkJoin(
          this.getChaptersElementData(chapters, comicSite),
        );

        return chaptersInfo$;
      }),
      switchMap(
        (
          data: {
            nameContainer: ElementHandle<HTMLElement>;
            dateContainer: ElementHandle<HTMLElement>;
          }[],
        ) => {
          const chaptersData$ = data.map((chapterRaw) => {
            const number$ = this.getChapterNumber(chapterRaw.nameContainer);
            const link$ = this.getChapterLink(
              chapterRaw.nameContainer,
              comicSite,
            );
            const date$ = this.getChapterDate(
              chapterRaw.dateContainer,
              comicSite.dateFormat,
            );

            return forkJoin({ number: number$, link: link$, date: date$ });
          });
          return forkJoin(chaptersData$).pipe(
            map((chapters) => chapters.filter((chp) => chp.number > -1)),
          );
        },
      ),
    );
  }

  protected getChaptersElementData(
    chapters: ElementHandle<HTMLElement>[],
    comicSite: SiteEntity,
  ): Observable<{
    nameContainer: ElementHandle<SVGElement | HTMLElement>;
    dateContainer: ElementHandle<SVGElement | HTMLElement>;
  }>[] {
    return chapters.map((chapter) => {
      const nameContainer = from(chapter.$(comicSite.chapterNamePath));
      const dateContainer = from(chapter.$(comicSite.chapterDatePath));
      return forkJoin({
        nameContainer,
        dateContainer,
      });
    });
  }

  protected getChapterNumber(
    element: ElementHandle<HTMLElement>,
  ): Observable<number> {
    return from(element.innerText()).pipe(
      map((chapterName: string) => {
        const numName = chapterName.match(/\d+(\.\d+)?/g);
        if (numName) {
          return +numName[0] || -1;
        }
        return -1;
      }),
    );
  }

  protected getChapterLink(
    element: ElementHandle<HTMLElement>,
    comicSite: SiteEntity,
  ): Observable<string> {
    return from(element.getAttribute("href")).pipe(
      map((rawLink) => {
        if (rawLink.indexOf("/") === 0) {
          rawLink = comicSite.baseLink + rawLink;
        }
        return rawLink;
      }),
    );
  }

  protected getChapterDate(
    element: ElementHandle<HTMLElement>,
    format: string,
  ): Observable<number> {
    const now = new Date();
    const nowDate = dayjs(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    )
      .utc(true)
      .toDate();

    return element
      ? from(element.innerText()).pipe(
          map((stringDate: string) => {
            if (stringDate.length < 6) {
              return +nowDate;
            }

            const date = dayjs(stringDate, format).utc(true).toDate();

            return +date || +nowDate;
          }),
        )
      : of(+nowDate);
  }

  protected getComicAndCheckChapters(
    id: string,
    chaptersData: ChapterWithResourceCreateDTO[],
    comicDir: string,
  ): Observable<void> {
    return this.comicService
      .findById(id)
      .pipe(
        switchMap((comic) =>
          this.checkAndUpdateChapters(comic, chaptersData, comicDir),
        ),
      );
  }

  protected checkAndUpdateChapters(
    comic: ComicEntity,
    chaptersData: ChapterWithResourceCreateDTO[],
    comicDir: string,
  ): Observable<void> {
    const chaptersCheckedData = this.checkChapters(comic, chaptersData);
    const chapters = comic.chapters;
    const lastUpdateDate = this.getMaxLastUpdateDateFromChapters(
      chaptersCheckedData.newChapters,
    );
    const updateChaptersIds: string[] = chapters.map((chp) => chp._id);

    const deleteOldChapters$ = chaptersCheckedData.oldChapters.map((oldChp) =>
      this.comicChapterService.deleteOne(oldChp.id).pipe(
        tap(() => {
          this.fsHelper.deleteDir(`${comicDir}\\${oldChp.number}`);
          const dltIndex = updateChaptersIds.findIndex(
            (delChpId) => delChpId === oldChp.id,
          );
          updateChaptersIds.splice(dltIndex, 1);
        }),
      ),
    );

    const deleteOldChaptersObs$: Observable<unknown> = deleteOldChapters$.length
      ? forkJoin(deleteOldChapters$)
      : VOID;

    const createNewChapters$ = chaptersCheckedData.newChapters.map((chp) => {
      return this.comicChapterService.createOne(chp);
    });

    const createNewChaptersObs$ = createNewChapters$.length
      ? forkJoin(createNewChapters$)
      : of(null);

    return deleteOldChaptersObs$.pipe(
      switchMap(() => createNewChaptersObs$),
      switchMap((createdChapters) => {
        if (createdChapters) {
          createdChapters.map((c) => updateChaptersIds.push(c._id));
          const comicUpdateDate: ComicUpdateDTO = {
            chapters: updateChaptersIds,
          };
          if (!comic.latestUpdate || lastUpdateDate > comic.latestUpdate) {
            comicUpdateDate.latestUpdate = lastUpdateDate;
          }
          return this.comicService
            .updateOne({ _id: comic._id }, comicUpdateDate)
            .pipe(switchMap(() => this.sortComicChapters(comic._id)));
        }

        return of(null);
      }),
      switchMap(() => VOID),
    );
  }

  protected checkChapters(
    comic: ComicEntity,
    chaptersData: ChapterWithResourceCreateDTO[],
  ): IComicChaptersParsing {
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
    chapter: ChapterWithResourceCreateDTO,
  ): ChapterCreateDTO {
    return {
      number: chapter.number,
      link: chapter.link,
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

  protected sortComicChapters(id: string): Observable<ComicEntity> {
    return this.comicService.findById(id).pipe(
      switchMap((comic) => {
        const chapters = comic.chapters;

        const sortChapters: string[] = chapters
          .sort((a, b) => a.number - b.number)
          .map((chp) => chp._id);
        return this.comicService.updateOne(
          { _id: comic._id },
          { chapters: sortChapters },
        );
      }),
    );
  }
}
